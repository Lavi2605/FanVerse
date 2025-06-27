import { Request, Response } from 'express';
import { query } from '../src/config/database';

// Add or update a reaction
export async function reactToMessage(req: Request, res: Response) {
  const { messageId } = req.params;
  const { userId, emoji } = req.body;

  if (!userId || !emoji) {
    return res.status(400).json({ success: false, error: 'userId and emoji are required' });
  }

  try {
    const result = await query(
      `
      INSERT INTO message_reactions (message_id, user_id, emoji)
      VALUES ($1, $2, $3)
      ON CONFLICT (message_id, user_id)
      DO UPDATE SET emoji = EXCLUDED.emoji, created_at = CURRENT_TIMESTAMP
      RETURNING *;
      `,
      [messageId, userId, emoji]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('❌ Error adding reaction:', err);
    res.status(500).json({ success: false, error: 'Failed to react to message' });
  }
}

// Remove a reaction
export async function removeReaction(req: Request, res: Response) {
  const { messageId, userId } = req.params;

  try {
    await query(
      `DELETE FROM message_reactions WHERE message_id = $1 AND user_id = $2`,
      [messageId, userId]
    );

    res.json({ success: true, message: 'Reaction removed' });
  } catch (err) {
    console.error('❌ Error removing reaction:', err);
    res.status(500).json({ success: false, error: 'Failed to remove reaction' });
  }
}

// Get all reactions for a message
export async function getMessageReactions(req: Request, res: Response) {
  const { messageId } = req.params;

  try {
    const result = await query(
      `
      SELECT r.*, u.first_name, u.last_name, u.avatar_url
      FROM message_reactions r
      JOIN users u ON r.user_id = u.id
      WHERE r.message_id = $1
      `,
      [messageId]
    );

    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('❌ Error fetching reactions:', err);
    res.status(500).json({ success: false, error: 'Failed to get reactions' });
  }
}
