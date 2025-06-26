import express, { Request, Response, Router } from 'express';
import {
  createOrGetConversation,
  getUserConversations,
  getConversationById,
  deleteUserFromConversation,
} from '../controllers/conversationController.ts';

const router: Router = express.Router();

// POST /api/conversations - Create or get existing conversation
router.post('/', (req: Request, res: Response) => createOrGetConversation(req, res));

// GET /api/conversations/:userId - Get all conversations for a user
router.get('/:userId', (req: Request, res: Response) => getUserConversations(req, res));

// GET /api/conversations/detail/:conversationId - Get conversation by ID
router.get('/detail/:conversationId', (req: Request, res: Response) => getConversationById(req, res));

router.delete('/:id/user/:userId', (req: Request, res: Response) => deleteUserFromConversation(req, res));

export default router;
