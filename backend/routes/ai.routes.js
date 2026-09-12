import express from "express";
import { checkRateLimit } from "../middleware/auth.middleware.js";
import { handleChat, handleDebugCode, handleConvertCode } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/chat", checkRateLimit, handleChat);
router.post("/debug-code", checkRateLimit, handleDebugCode);
router.post("/convert-code", checkRateLimit, handleConvertCode);

export default router;