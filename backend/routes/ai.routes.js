import express from "express";
import { checkRateLimit } from "../middleware/auth.middleware.js";
import { 
  handleChat, 
  handleDebugCode, 
  handleConvertCode,
  startInterview,
  submitAnswer,
  generateReport
} from "../controllers/ai.controller.js";

const router = express.Router();

// Existing AI Feature Routes
router.post("/chat", checkRateLimit, handleChat);
router.post("/debug-code", checkRateLimit, handleDebugCode);
router.post("/convert-code", checkRateLimit, handleConvertCode);

// 🎙️ NEW: AI Mock Interviewer Routes
router.post("/interview/start", checkRateLimit, startInterview);
router.post("/interview/answer", checkRateLimit, submitAnswer);
router.post("/interview/report", checkRateLimit, generateReport);

export default router;