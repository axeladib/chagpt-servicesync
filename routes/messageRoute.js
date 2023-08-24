import express from 'express';
const router = express.Router();
// import { createMessage, replyMessage } from '../controllers/messageController';
import replyMessage from "../controllers/messageController.js"

// TODO: Send message from server to client
// router.post("/send-message", createMessage);

// TODO: Reply to the incoming message from the client
router.post("/reply", replyMessage);

export default router;