import express from "express";
import { checkRateLimit } from "../middleware/auth.middleware.js";
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  handleMockUpgrade 
} from "../controllers/user.controller.js";

const router = express.Router();

// Auth Endpoints (No rate limit required for Auth)
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// Protected Endpoints
router.get("/user/profile", checkRateLimit, getUserProfile);
router.post("/mock-upgrade", checkRateLimit, handleMockUpgrade);

export default router;