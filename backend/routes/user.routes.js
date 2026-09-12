import express from "express";
import { checkRateLimit } from "../middleware/auth.middleware.js";
import { handleMockUpgrade } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/mock-upgrade", checkRateLimit, handleMockUpgrade);

export default router;