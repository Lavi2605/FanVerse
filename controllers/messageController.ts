import { Request, Response } from 'express';
import { query } from '../src/config/database';

// Get all messages in a conversation
export async function getConversationMessages(req: Request, res: Response): Promise<void> {
  try {
    const { conversationId } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    if (!conversationId) {
      res.status(400).json({
        success: false,
        error: 'Conversation ID is required'
      });
      return;
    }

    // Check if conversation exists
    const conversationCheck = await query(
      'SELECT id FROM conversations WHERE id = $1',
      [conversationId]
    );

    if (conversationCheck.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Conversation not found'
      });
      return;
    }

    // Get messages
    const messages = await query(
      `
      SELECT 
        m.id,
        m.conversation_id AS "conversationId",
        m.sender_id AS "senderId",
        CONCAT(u.first_name, ' ', u.last_name) AS "senderName",
        m.content,
        m.created_at AS "timestamp",
        u.avatar_url AS "senderAvatar"
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.conversation_id = $1
      ORDER BY m.created_at ASC
      LIMIT $2 OFFSET $3
    `,
      [conversationId, limit, offset]
    );

    const countResult = await query(
      'SELECT COUNT(*) as total FROM messages WHERE conversation_id = $1',
      [conversationId]
    );

    const total = parseInt(countResult.rows[0].total);

    res.json({
      success: true,
      data: {
        messages: messages.rows,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      }
    });

  } catch (error) {
    console.error('❌ Error in getConversationMessages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve messages'
    });
  }
}

// Send a new message
export async function sendMessage(req: Request, res: Response): Promise<void> {
  try {
    const { conversation_id, sender_id, content, message_type = 'text' } = req.body;

    if (!conversation_id || !sender_id || !content) {
      res.status(400).json({
        success: false,
        error: 'Conversation ID, sender ID, and content are required'
      });
      return;
    }

    if (content.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Message content cannot be empty'
      });
      return;
    }

    if (content.length > 5000) {
      res.status(400).json({
        success: false,
        error: 'Message content is too long (max 5000 characters)'
      });
      return;
    }

    // Validate conversation and sender
    const conversationCheck = await query(
      `
      SELECT c.*, 
             CASE WHEN c.user1_id = $2 OR c.user2_id = $2 THEN true ELSE false END as is_participant
      FROM conversations c
      WHERE c.id = $1
    `,
      [conversation_id, sender_id]
    );

    if (conversationCheck.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Conversation not found'
      });
      return;
    }

    if (!conversationCheck.rows[0].is_participant) {
      res.status(403).json({
        success: false,
        error: 'You are not a participant in this conversation'
      });
      return;
    }

    const senderCheck = await query(
      'SELECT first_name, last_name FROM users WHERE id = $1 AND is_active = true',
      [sender_id]
    );

    if (senderCheck.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Sender not found or inactive'
      });
      return;
    }

    const sender = senderCheck.rows[0];
    const senderName = `${sender.first_name} ${sender.last_name}`;

    const inserted = await query(
      `
      INSERT INTO messages (conversation_id, sender_id, content, message_type)
      VALUES ($1, $2, $3, $4)
      RETURNING id, conversation_id, sender_id, content, created_at
    `,
      [conversation_id, sender_id, content.trim(), message_type]
    );

    const message = inserted.rows[0];

    await query(
      'UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [conversation_id]
    );

    res.status(201).json({
      id: message.id,
      conversationId: message.conversation_id,
      senderId: message.sender_id,
      senderName,
      content: message.content,
      timestamp: message.created_at,
    });

  } catch (error) {
    console.error('❌ Error in sendMessage:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message'
    });
  }
}

// Edit a message
export async function editMessage(req: Request, res: Response): Promise<void> {
  try {
    const { messageId } = req.params;
    const { content, sender_id } = req.body;

    if (!content || !sender_id) {
      res.status(400).json({
        success: false,
        error: 'Content and sender ID are required'
      });
      return;
    }

    if (content.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Message content cannot be empty'
      });
      return;
    }

    const messageCheck = await query(
      'SELECT * FROM messages WHERE id = $1 AND sender_id = $2',
      [messageId, sender_id]
    );

    if (messageCheck.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Message not found or you do not have permission to edit it'
      });
      return;
    }

    await query(
      `
      UPDATE messages
      SET content = $1, is_edited = true, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND sender_id = $3
      RETURNING *
    `,
      [content.trim(), messageId, sender_id]
    );

    const updated = await query(
      `
      SELECT 
        m.*,
        u.first_name as sender_first_name,
        u.last_name as sender_last_name,
        u.avatar_url as sender_avatar_url
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.id = $1
    `,
      [messageId]
    );

    res.json({
      success: true,
      data: updated.rows[0],
    });

  } catch (error) {
    console.error('Error in editMessage:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to edit message'
    });
  }
}

// Delete a message
export async function deleteMessage(req: Request, res: Response): Promise<void> {
  try {
    const { messageId } = req.params;
    const { sender_id } = req.body;

    if (!sender_id) {
      res.status(400).json({
        success: false,
        error: 'Sender ID is required'
      });
      return;
    }

    const messageCheck = await query(
      'SELECT * FROM messages WHERE id = $1 AND sender_id = $2',
      [messageId, sender_id]
    );

    if (messageCheck.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Message not found or you do not have permission to delete it'
      });
      return;
    }

    await query('DELETE FROM messages WHERE id = $1', [messageId]);

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Error in deleteMessage:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete message'
    });
  }
}
