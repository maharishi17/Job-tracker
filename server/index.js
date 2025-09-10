import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import appsRouter from "./routes/applications.js";

dotenv.config();

const app = express();

/** Allowed origins: from env + safe fallbacks */
const allowFromEnv = process.env.ALLOW_ORIGIN
  ? process.env.ALLOW_ORIGIN.split(",").map(s => s.trim()).filter(Boolean)
  : [];
const allow = Array.from(new Set([
  ...allowFromEnv,
  "https://daily-job-updater.netlify.app",
  "http://localhost:5173",
]));

// CORS (works on Express v5; no app.options('*', ...) needed)
const corsOptions = {
  origin(origin, cb) {
    // allow server-to-server (no Origin) and known frontends
    if (!origin || allow.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS: " + origin));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (_, res) => res.send("API OK"));
app.use("/api/applications", appsRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log("Server http://localhost:" + port));
  })
  .catch(e => console.error("Mongo error:", e.message));
