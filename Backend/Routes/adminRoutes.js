import express from "express";
import { getTokenModel } from "../Models/Token.js";
import Activity from "../Models/Activity.js";
const router = express.Router();

router.get("/dashboard-stats", async (req, res) => {
  try {
  const services = [
  "Admission",
  "RailwayConcession",
  "Library",
  "Canteen",
  "FeesPayment",
];

    let total = 0,
      pending = 0,
      processing = 0,
      completed = 0;

    for (const service of services) {
      const TokenModel = getTokenModel(service);

      total += await TokenModel.countDocuments();
      pending += await TokenModel.countDocuments({ status: "pending" });
      processing += await TokenModel.countDocuments({ status: "serving" });
      completed += await TokenModel.countDocuments({ status: "completed" });
    }

    res.json({ total, pending, processing, completed });
  } catch (err) {
    res.status(500).json({ message: "Dashboard stats error" });
  }
});
router.get("/recent-activity", async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(6);

    const formatted = activities.map((item) => ({
      message: item.message,
      time: formatTime(item.createdAt),
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

function formatTime(date) {
  const diff = Math.floor((Date.now() - date) / 60000);
  if (diff < 1) return "Just now";
  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
  return `${Math.floor(diff / 1440)} days ago`;
}


export default router;
