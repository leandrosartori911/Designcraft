import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(helmet({
    contentSecurityPolicy: false,
  }));

  app.use(cookieParser());
  app.use(express.json());

  app.use((req, res, next) => {
    if (!req.cookies.sessionId) {
      const sessionId = Math.random().toString(36).substring(2, 15);
      res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    next();
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "secure", session: req.cookies.sessionId ? "active" : "created" });
  });

  app.post("/api/gemini", async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      res.status(500).json({ error: "GEMINI_API_KEY not configured on server." });
      return;
    }

    const { endpoint, ...body } = req.body;
    const geminiUrl = endpoint || "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    try {
      const response = await fetch(`${geminiUrl}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      res.status(response.status).json(data);
    } catch (err) {
      console.error("Gemini proxy error:", err);
      res.status(500).json({ error: "Failed to reach Gemini API." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Secure server running on http://localhost:${PORT}`);
  });
}

startServer();