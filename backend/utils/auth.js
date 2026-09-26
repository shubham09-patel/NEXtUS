import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Password Hash karne ke liye
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Password Compare karne ke liye login time par
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// JWT Token generate karne ke liye (7 Days Validity)
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};