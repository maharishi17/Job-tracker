

import axios from "axios";

// Prefer env var; otherwise fall back to your Render URL in production
const base =
  import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim().length
    ? import.meta.env.VITE_API_URL
    : "https://job-tracker-ws2v.onrender.com";

export const api = axios.create({
  baseURL: `${base}/api`
});
