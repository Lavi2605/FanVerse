import express from 'express';
import {
  getConversationMessages,
  sendMessage,
  editMessage,
  deleteMessage
} from '../controllers/messageController.ts';

const router = express.Router();

// GET /api/messages/:conversationId - Get all messages in a conversation
router.get('/:conversationId', getConversationMessages);

// POST /api/messages - Send a new message
router.post('/', sendMessage);

// PUT /api/messages/:messageId - Edit a message
router.put('/:messageId', editMessage);

// DELETE /api/messages/:messageId - Delete a message
router.delete('/:messageId', deleteMessage);

export default router;