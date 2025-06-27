import express from 'express';
import {
  reactToMessage,
  removeReaction,
  getMessageReactions,
} from '../controllers/reactionController';

const router = express.Router();

router.post('/messages/:messageId/reactions', reactToMessage);         // Add or update
router.delete('/messages/:messageId/reactions/:userId', removeReaction); // Delete
router.get('/messages/:messageId/reactions', getMessageReactions);     // Get all reactions

export default router;
