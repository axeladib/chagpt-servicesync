import express from "express";
const router = express.Router();
import createChat from "../controllers/chatgptController.js"

router.post("/chat", createChat);
export default router;
