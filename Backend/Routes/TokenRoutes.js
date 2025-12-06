import express from "express";
import { getTokenModel } from "../Models/Token.js";

const router = express.Router();

const servicePrefixes = {
  Admission: "Ad",
  RailwayConsession: "Rc",
  Library: "L",
  Canteen: "C",
  FeesPayment: "Fp",
};

router.post("/generate", async (req, res) => {
  const { userName, serviceName } = req.body;

  if (!serviceName) return res.status(400).json({ error: "Service name is required" });

  try {
    const TokenModel = getTokenModel(serviceName);

    // Get last numeric token
    const lastToken = await TokenModel.findOne().sort({ tokenNumber: -1 });
    const newTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;

    const prefix = servicePrefixes[serviceName];
    const displayToken = `${prefix}-${newTokenNumber.toString().padStart(3, '0')}`;

    const newToken = new TokenModel({
      userName,
      serviceName,
      tokenNumber: newTokenNumber, // ✔ Store numeric value
      displayToken                 // ✔ Store formatted token
    });

    await newToken.save();

    res.json({ message: "Token Generated", token: newToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

router.get("/list/:service", async (req, res) => {
  const { service } = req.params;
  try {
    const TokenModel = getTokenModel(service);
    const queue = await TokenModel.find().sort({ time: 1 });
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch queue" });
  }
});

router.get("/queue/:service", async (req, res) => {
  try {
    const { service } = req.params;
    const tokens = await Token.find({ service, status: { $in: ["pending", "serving"] } })
      .sort({ createdAt: 1 });

    res.json(tokens);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching queue" });
  }
});

// router.put("/cancel/:serviceName/:id", async (req, res) => {
//   const { serviceName, id } = req.params;

//   try {
//     const Token = getTokenModel(serviceName);
//     const token = await Token.findByIdAndUpdate(
//       id,
//       { status: "cancelled" },
//       { new: true }
//     );

//     return res.json({ success: true, message: "Token Cancelled", token });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// });

router.put("/cancel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const service = req.body.serviceName;

    const TokenModel = getTokenModel(service);
    const updated = await TokenModel.findByIdAndUpdate(
      id,
      { status: "Canceled" },
      { new: true }
    );

    res.json({ message: "Token canceled", token: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
