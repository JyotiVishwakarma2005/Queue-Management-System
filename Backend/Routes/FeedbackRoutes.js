import express from "express";
import Feedback from "../Models/Feedback.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const feedback = await Feedback.create(req.body);
  res.status(201).json(feedback);
});

router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find().populate("userId", "name");
  res.json(feedbacks);
});

export default router;
