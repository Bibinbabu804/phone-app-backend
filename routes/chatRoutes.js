import express from 'express';
import { sendMessage, getMessages } from '../controllers/chatController.js';

const router = express.Router();

// Send a new message
router.post('/send', sendMessage);

// Get all chat messages
router.get('/', getMessages);

export default router;
