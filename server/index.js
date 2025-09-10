import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import appsRouter from "./routes/applications.js";

dotenv.config();

const app = express();

// --- CORS: allow list from env (comma-separated) ---
const allow = process.env.ALLOW_ORIGIN
  ? process.env.ALLOW_ORIGIN.split(",").map(s => s.trim()).filter(Boolean)
  : ["http://localhost:5173"]; // fallback for local dev

const corsOptions = {
  origin: (origin, cb) => {
    // allow server-to-server / curl (no Origin) and allowed sites
    if (!origin || allow.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS: " + origin));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight

app.use(express.json());

// Health check
app.get("/", (_, res) => res.send("API OK"));

// API routes
app.use("/api/applications", appsRouter);

// --- Mongo + Server start ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () =>
      console.log("Server http://localhost:" + port)
    );
  })
  .catch(e => console.error("Mongo error:", e.message));
