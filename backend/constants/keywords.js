export const PLAN_LIMITS = { free: 3, silver: 10, gold: 50 };

export const ROADMAP_KEYWORDS = ["dsa", "dbms", "ml", "mern", "java", "python", "cloud", "cn", "lld", "sd", "devops"];
export const CONVERT_KEYWORDS = ["convert", "translate", "change language", "switch to", "change from"];
export const DEBUG_KEYWORDS = ["debug", "error", "fix", "issue", "problem"];

export const TECHNOLOGY_KEYWORDS = [
  "technology", "tech", "it", "computer", "software", "hardware", "internet", "ai", "ml",
  "machine learning", "data science", "programming", "coding", "code", "developer",
  "development", "debug", "bug", "algorithm", "dsa", "dbms", "sql", "api", "backend",
  "frontend", "full stack", "web development", "system design", "cloud", "devops", "os",
  "cn", "oop", "java", "javascript", "typescript", "python", "react", "node", "express",
  "mongodb", "github", "cybersecurity", "network", "database"
];

export const ALLOWED_SHORT_MESSAGES = ["hi", "hello", "hey", "help", "start"];

export const isTechnologyQuery = (message) => {
  const lower = message.toLowerCase().trim();
  if (!lower) return false;
  if (ALLOWED_SHORT_MESSAGES.includes(lower)) return true;
  return TECHNOLOGY_KEYWORDS.some((keyword) => lower.includes(keyword));
};