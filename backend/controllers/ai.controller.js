import { geminiModel } from "../config/gemini.js";
import { logUsage } from "../middleware/auth.middleware.js";
import { 
  ROADMAP_KEYWORDS, 
  CONVERT_KEYWORDS, 
  DEBUG_KEYWORDS, 
  INTERVIEW_KEYWORDS,
  INTERVIEW_LEVEL_PROMPTS,
  isTechnologyQuery 
} from "../constants/keywords.js";

// System instruction for standard chat
const CHAT_SYSTEM_INSTRUCTION = 
  "You are a kind, patient AI mentor. Always reply in a warm, gentle, and supportive tone. " +
  "When someone asks you a query, answer it straightforwardly. Keep responses short, clear, and to the point. " +
  "First priority is code, followed by a small explanation unless specifically asked for more details.";

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
  // 🎯 Navigation to Interview feature
  if (INTERVIEW_KEYWORDS.some((kw) => lower.includes(kw))) {
    return res.status(200).json({ reply: "navigate::/interview" });
  }

  if (!isTechnologyQuery(message)) {
    return res.status(200).json({
      reply: "I can help only with technology-related questions.",
    });
  }

  try {
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
      systemInstruction: CHAT_SYSTEM_INSTRUCTION,
    });

    const text = result.response.text();
    if (req.user?.id) await logUsage(req.user.id, "chat");
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
    if (req.user?.id) await logUsage(req.user.id, "debug");
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
    if (req.user?.id) await logUsage(req.user.id, "convert");
    res.json({ convertedCode });
  } catch (err) {
    console.error("Convert error:", err);
    res.status(500).json({ error: "Conversion failed." });
  }
};

// 🎯 NEW: Start AI Interview
export const startInterview = async (req, res) => {
  try {
    const { topic, level } = req.body;
    if (!topic || !level) {
      return res.status(400).json({ error: "Topic and level are required" });
    }

    const levelGuidance = INTERVIEW_LEVEL_PROMPTS[level] || INTERVIEW_LEVEL_PROMPTS.Junior;

    const prompt = `
      You are an expert technical interviewer conducting a mock interview for a ${level}-level candidate in ${topic}.
      Level Instructions: ${levelGuidance}
      
      Task: Ask ONLY Question #1 to start the interview. 
      Do not include greetings, pleasantries, or extra introduction. Just directly output Question 1.
    `;

    const result = await geminiModel.generateContent(prompt);
    const firstQuestion = result.response.text();

    if (req.user?.id) await logUsage(req.user.id, "interview");

    return res.status(200).json({
      success: true,
      data: {
        topic,
        level,
        question: firstQuestion,
      },
    });
  } catch (error) {
    console.error("Start interview error:", error);
    return res.status(500).json({ error: "Failed to start interview" });
  }
};

// 🎯 NEW: Process User Answer & Next Question
export const submitAnswer = async (req, res) => {
  try {
    const { topic, level, questionHistory, userAnswer } = req.body;
    if (!topic || !level || !userAnswer) {
      return res.status(400).json({ error: "Topic, level, and userAnswer are required" });
    }

    const prompt = `
      You are an expert technical interviewer for a ${level} candidate in ${topic}.
      
      Previous Q&A History: ${JSON.stringify(questionHistory || [])}
      Latest Candidate Answer: "${userAnswer}"

      Tasks:
      1. Analyze the candidate's answer and give brief feedback (Score 1-5, missing points).
      2. Ask the NEXT technical question matching ${level} difficulty level.

      Return ONLY a JSON response strictly matching this format (no markdown formatting outside):
      {
        "score": 4,
        "feedback": "Brief critique of user answer...",
        "nextQuestion": "The next interview question..."
      }
    `;

    const result = await geminiModel.generateContent(prompt);
    let rawText = result.response.text();

    const jsonString = rawText.replace(/```json|```/g, "").trim();
    const responseData = JSON.parse(jsonString);

    if (req.user?.id) await logUsage(req.user.id, "interview");

    return res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Submit answer error:", error);
    return res.status(500).json({ error: "Failed to evaluate answer" });
  }
};

// 🎯 NEW: Generate Final Interview Report
export const generateReport = async (req, res) => {
  try {
    const { topic, level, fullConversation } = req.body;
    if (!topic || !level || !fullConversation) {
      return res.status(400).json({ error: "Missing required conversation data" });
    }

    const prompt = `
      Evaluate this completed technical interview for a ${level} level developer in ${topic}.
      Conversation History: ${JSON.stringify(fullConversation)}

      Return ONLY a JSON response strictly matching this format:
      {
        "overallScore": "8/10",
        "technicalAccuracy": "Feedback on accuracy...",
        "strengths": ["Strength 1", "Strength 2"],
        "areasOfImprovement": ["Improvement 1", "Improvement 2"],
        "finalVerdict": "Hire / Weak Hire / Reject with brief summary"
      }
    `;

    const result = await geminiModel.generateContent(prompt);
    let rawText = result.response.text();

    const jsonString = rawText.replace(/```json|```/g, "").trim();
    const reportData = JSON.parse(jsonString);

    if (req.user?.id) await logUsage(req.user.id, "interview_report");

    return res.status(200).json({
      success: true,
      data: reportData,
    });
  } catch (error) {
    console.error("Generate report error:", error);
    return res.status(500).json({ error: "Failed to generate report" });
  }
};