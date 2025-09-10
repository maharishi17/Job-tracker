import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import appsRouter from "./routes/applications.js";

dotenv.config();

const app = express();

// --- Allowed origins (read from env or use safe fallbacks) ---
const allow =
  (process.env.ALLOW_ORIGIN
    ? process.env.ALLOW_ORIGIN.split(",").map(s => s.trim()).filter(Boolean)
    : []
  ).concat([
    // hard fallback so it works even if env is missing/mistyped
    "https://daily-job-updater.netlify.app",
    "http://localhost:5173",
  ]);

// Deduplicate
const allowSet = Array.from(new Set(allow));

app.use(
  cors({
    origin: allowSet, // cors will accept array of exact origins
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);
// Preflight
app.options("*", cors({ origin: allowSet }));

app.use(express.json());

// Health
app.get("/", (_req, res) => res.send("API OK"));

// Routes
app.use("/api/applications", appsRouter);

// Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log("Server http://localhost:" + port));
  })
  .catch(e => console.error("Mongo error:", e.message));
