import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
import { PLAN_LIMITS } from "../constants/keywords.js";

export const checkRateLimit = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    
    // Custom JWT Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from PostgreSQL via Prisma
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = user;

    // Start of Today (UTC midnight)
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    // Count usage logs from PostgreSQL
    const todayUsageCount = await prisma.usageLog.count({
      where: {
        userId: user.id,
        createdAt: { gte: startOfToday },
      },
    });

    const plan = user.planName || "free";
    const currentLimit = PLAN_LIMITS[plan] ?? 10;

    if (todayUsageCount >= currentLimit) {
      const nextPlan = plan === "free" ? "Silver" : plan === "silver" ? "Gold" : null;
      const upgradeMsg = nextPlan
        ? `Upgrade to ${nextPlan} for more daily requests.`
        : "You've reached your maximum daily limit.";

      return res.status(429).json({
        error: "Daily limit reached",
        message: `You've reached your daily limit of ${currentLimit} AI requests. ${upgradeMsg}`,
      });
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

export const logUsage = async (userId, feature) => {
  try {
    await prisma.usageLog.create({
      data: {
        userId: userId,
        featureName: feature,
      },
    });
  } catch (err) {
    console.error("Failed to log usage to PostgreSQL:", err);
  }
};