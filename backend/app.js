import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";

import aiRoutes from "./routes/ai.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Security & Performance Middlewares
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());
app.use(express.json());

// System Health Route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Feature API Routes
app.use("/api", aiRoutes);
app.use("/api", userRoutes);

app.listen(port, "0.0.0.0", () => console.log(`NEXTUS Server running on port ${port}`));

export default app;