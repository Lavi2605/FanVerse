import { Request, Response } from 'express';
import { query } from '../src/config/database';

// Helper to order user IDs
function orderUserIds(userId1: number, userId2: number): { user1_id: number; user2_id: number } {
  return userId1 < userId2
    ? { user1_id: userId1, user2_id: userId2 }
    : { user1_id: userId2, user2_id: userId1 };
}

// Create or get existing conversation
export async function createOrGetConversation(req: Request, res: Response): Promise<void> {
  try {
    let user1_id: number, user2_id: number;

    if (Array.isArray(req.body.participants) && req.body.participants.length === 2) {
      [user1_id, user2_id] = req.body.participants;
    } else {
      ({ user1_id, user2_id } = req.body);
    }

    if (!user1_id || !user2_id) {
      res.status(400).json({
        success: false,
        error: 'Both user1_id and user2_id are required',
      });
      return;
    }

    if (user1_id === user2_id) {
      res.status(400).json({
        success: false,
        error: 'Cannot create conversation with yourself',
      });
      return;
    }

    const usersCheck = await query(
      'SELECT id FROM users WHERE id IN ($1, $2) AND is_active = true',
      [user1_id, user2_id]
    );

    if (usersCheck.rows.length !== 2) {
      res.status(404).json({
        success: false,
        error: 'One or both users not found or inactive',
      });
      return;
    }

    const { user1_id: orderedUser1, user2_id: orderedUser2 } = orderUserIds(user1_id, user2_id);

    let conversation = await query(
      'SELECT * FROM conversations WHERE user1_id = $1 AND user2_id = $2',
      [orderedUser1, orderedUser2]
    );

    if (conversation.rows.length === 0) {
      conversation = await query(
        `INSERT INTO conversations (user1_id, user2_id) 
         VALUES ($1, $2) 
         RETURNING *`,
        [orderedUser1, orderedUser2]
      );
    }

    const conversationWithUsers = await query(
      `
      SELECT 
        c.*,
        u1.first_name as user1_first_name,
        u1.last_name as user1_last_name,
        u1.avatar_url as user1_avatar_url,
        u2.first_name as user2_first_name,
        u2.last_name as user2_last_name,
        u2.avatar_url as user2_avatar_url
      FROM conversations c
      JOIN users u1 ON c.user1_id = u1.id
      JOIN users u2 ON c.user2_id = u2.id
      WHERE c.id = $1
    `,
      [conversation.rows[0].id]
    );

    res.json({
      success: true,
      data: {
        conversation: {
          ...conversationWithUsers.rows[0],
          participants: [orderedUser1, orderedUser2],
        },
        isNew: conversation.rows.length === 1,
      },
    });
  } catch (error) {
    console.error('❌ Error in createOrGetConversation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create or retrieve conversation',
    });
  }
}

// Get all conversations for a user
export async function getUserConversations(req: Request, res: Response): Promise<void> {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      res.status(400).json({
        success: false,
        error: 'Invalid user ID',
      });
      return;
    }

    const conversations = await query(
      `
      SELECT 
        c.id,
        c.user1_id,
        c.user2_id,
        c.created_at,
        c.updated_at,

        CASE 
          WHEN c.user1_id = $1 THEN u2.id
          ELSE u1.id
        END AS other_user_id,

        CONCAT(
          CASE 
            WHEN c.user1_id = $1 THEN COALESCE(u2.first_name, '') 
            ELSE COALESCE(u1.first_name, '') 
          END,
          ' ',
          CASE 
            WHEN c.user1_id = $1 THEN COALESCE(u2.last_name, '') 
            ELSE COALESCE(u1.last_name, '') 
          END
        ) AS other_user_name,

        CASE 
          WHEN c.user1_id = $1 THEN COALESCE(u2.avatar_url, '') 
          ELSE COALESCE(u1.avatar_url, '') 
        END AS other_user_avatar,

        lm.content AS last_message,
        lm.created_at AS last_message_timestamp

      FROM conversations c
      JOIN users u1 ON c.user1_id = u1.id
      JOIN users u2 ON c.user2_id = u2.id

      LEFT JOIN LATERAL (
        SELECT m.content, m.created_at
        FROM messages m
        WHERE m.conversation_id = c.id
        ORDER BY m.created_at DESC
        LIMIT 1
      ) lm ON true

      WHERE c.user1_id = $1 OR c.user2_id = $1
      ORDER BY COALESCE(lm.created_at, c.created_at) DESC
    `,
      [userId]
    );

    res.json({
      success: true,
      data: conversations.rows,
    });
  } catch (error) {
    console.error('🔥 Error in getUserConversations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve conversations',
    });
  }
}

export async function deleteUserFromConversation(req: Request, res: Response): Promise<void> {
  try {
    const conversationId = parseInt(req.params.id, 10);
    const userId = parseInt(req.params.userId, 10);

    const convo = await query(
      `SELECT user1_id, user2_id FROM conversations WHERE id = $1`,
      [conversationId]
    );

    if (convo.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Conversation not found' });
      return;
    }

    const { user1_id, user2_id } = convo.rows[0];

    let fieldToUpdate = '';
    if (userId === user1_id) fieldToUpdate = 'user1_deleted';
    else if (userId === user2_id) fieldToUpdate = 'user2_deleted';
    else {
      res.status(403).json({ success: false, error: 'User not part of this conversation' });
      return;
    }

    await query(
      `UPDATE conversations SET ${fieldToUpdate} = true WHERE id = $1`,
      [conversationId]
    );

    // Check if both users have deleted the conversation
    const checkDelete = await query(
      `SELECT user1_deleted, user2_deleted FROM conversations WHERE id = $1`,
      [conversationId]
    );
    if (checkDelete.rows.length > 0) {
      const { user1_deleted, user2_deleted } = checkDelete.rows[0];
      if (user1_deleted && user2_deleted) {
        // Permanently delete the conversation (messages will be deleted via ON DELETE CASCADE)
        await query('DELETE FROM conversations WHERE id = $1', [conversationId]);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error in deleteUserFromConversation:', error);
    res.status(500).json({ success: false, error: 'Failed to delete user from conversation' });
  }
}

// Get conversation by ID
export async function getConversationById(req: Request, res: Response): Promise<void> {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      res.status(400).json({
        success: false,
        error: 'Conversation ID is required',
      });
      return;
    }

    const conversation = await query(
      `
      SELECT 
        c.*,
        u1.id as user1_id,
        u1.first_name as user1_first_name,
        u1.last_name as user1_last_name,
        u1.avatar_url as user1_avatar_url,
        u2.id as user2_id,
        u2.first_name as user2_first_name,
        u2.last_name as user2_last_name,
        u2.avatar_url as user2_avatar_url
      FROM conversations c
      JOIN users u1 ON c.user1_id = u1.id
      JOIN users u2 ON c.user2_id = u2.id
      WHERE c.id = $1
    `,
      [conversationId]
    );

    if (conversation.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Conversation not found',
      });
      return;
    }

    res.json({
      success: true,
      data: conversation.rows[0],
    });
  } catch (error) {
    console.error('Error in getConversationById:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve conversation',
    });
  }
}
