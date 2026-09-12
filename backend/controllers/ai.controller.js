import { geminiModel } from "../config/gemini.js";
import { logUsage } from "../middleware/auth.middleware.js";
import { 
  ROADMAP_KEYWORDS, 
  CONVERT_KEYWORDS, 
  DEBUG_KEYWORDS, 
  isTechnologyQuery 
} from "../constants/keywords.js";

export const handleChat = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  const lower = message.toLowerCase();

  // Navigation redirects
  if (lower.includes("roadmap") && ROADMAP_KEYWORDS.some((kw) => lower.includes(kw))) {
    return res.status(200).json({ reply: "navigate::/roadmap" });
  }
  if (CONVERT_KEYWORDS.some((kw) => lower.includes(kw))) {
    return res.status(200).json({ reply: "navigate::/code-convertor" });
  }
  if (DEBUG_KEYWORDS.some((kw) => lower.includes(kw))) {
    return res.status(200).json({ reply: "navigate::/code-debugger" });
  }

  if (!isTechnologyQuery(message)) {
    return res.status(200).json({
      reply: "I can help only with technology-related questions.",
    });
  }

  try {
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    const text = result.response.text();
    await logUsage(req.user.id, "chat");
    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const handleDebugCode = async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Code is required" });

  const prompt = `You are an expert code debugger & developer. Identify bugs and give corrected version.\n\n${code}\n\nRespond with: 1. Bug Explanation, 2. Fixed Code`;

  try {
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const debugOutput = result.response.text();
    await logUsage(req.user.id, "debug");
    res.json({ result: debugOutput });
  } catch (err) {
    console.error("Debug error:", err);
    res.status(500).json({ error: "AI Debugging Failed" });
  }
};

export const handleConvertCode = async (req, res) => {
  const { sourceCode, fromLang, toLang } = req.body;
  if (!sourceCode || !fromLang || !toLang) {
    return res.status(400).json({ error: "sourceCode, fromLang, and toLang are required" });
  }

  const prompt = `Convert the following ${fromLang} code to ${toLang}:\n\n\`\`\`${fromLang}\n${sourceCode}\n\`\`\``;

  try {
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const convertedCode = result.response.text();
    await logUsage(req.user.id, "convert");
    res.json({ convertedCode });
  } catch (err) {
    console.error("Convert error:", err);
    res.status(500).json({ error: "Conversion failed." });
  }
};