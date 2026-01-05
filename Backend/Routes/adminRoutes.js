import express from "express";
import { getTokenModel } from "../Models/Token.js";

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

export default router;
