import { prisma } from "../config/db.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";

// 1. User Registration (Signup)
export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered with this email" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
    });

    const token = generateToken(user.id);

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        planName: user.planName,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ error: "Internal server error during registration" });
  }
};

// 2. User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        planName: user.planName,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal server error during login" });
  }
};

// 3. Get Current User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        planName: true,
        createdAt: true,
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ error: "Failed to retrieve user profile" });
  }
};

// 4. Mock Upgrade Plan (PostgreSQL)
export const handleMockUpgrade = async (req, res) => {
  try {
    const { plan } = req.body;
    if (!["silver", "gold"].includes(plan?.toLowerCase())) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { planName: plan.toLowerCase() },
    });

    res.json({
      message: `Welcome to ${plan.charAt(0).toUpperCase() + plan.slice(1)}! 🚀`,
      planName: updatedUser.planName,
    });
  } catch (err) {
    console.error("Upgrade error:", err);
    res.status(500).json({ error: "Upgrade failed", details: err.message });
  }
};