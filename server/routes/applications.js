import express from "express";
import Application from "../models/Application.js";
const router = express.Router();

// GET /api/applications?page=1&limit=10&status=applied&q=google
router.get("/", async (req,res)=>{
  const page  = Number(req.query.page)||1;
  const limit = Number(req.query.limit)||10;
  const { status, q } = req.query;

  const filter = {};
  if (status && status !== "all") filter.status = status;
  if (q) filter.company = { $regex: q, $options: "i" };

  const [items, total] = await Promise.all([
    Application.find(filter).sort({ createdAt:-1 })
      .skip((page-1)*limit).limit(limit),
    Application.countDocuments(filter)
  ]);

  res.json({ items, total, page, pages: Math.ceil(total/limit) });
});

// POST create
router.post("/", async (req,res)=>{
  const app = await Application.create(req.body);
  res.status(201).json(app);
});

// PATCH update
router.patch("/:id", async (req,res)=>{
  const app = await Application.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(app);
});

// DELETE
router.delete("/:id", async (req,res)=>{
  await Application.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
