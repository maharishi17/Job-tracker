import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import appsRouter from "./routes/applications.js";
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.get("/", (_,res)=>res.send("API OK"));
app.use("/api/applications", appsRouter);

mongoose.connect(process.env.MONGO_URI).then(()=>{
  app.listen(process.env.PORT, ()=>console.log("Server http://localhost:"+process.env.PORT));
}).catch(e=>console.error("Mongo error:", e.message));
