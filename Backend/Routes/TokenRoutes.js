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

/* ============================================================
   ⭐ NEW ROUTE FOR ADMIN PANEL
   GET /api/tokens          → returns ALL tokens from ALL services
   ============================================================ */
router.get("/", async (req, res) => {
  try {
    const allServices = Object.keys(servicePrefixes);
    let allTokens = [];

    for (const service of allServices) {
      const TokenModel = getTokenModel(service);
      const tokens = await TokenModel.find().sort({ createdAt: -1 });
      allTokens = [...allTokens, ...tokens];
    }

    res.json(allTokens);
  } catch (err) {
    console.error("Error loading all tokens:", err);
    res.status(500).json({ error: "Failed to load all tokens" });
  }
});

/* ============================================================
   GENERATE TOKEN
   ============================================================ */
router.post("/generate", async (req, res) => {
  const { userName, serviceName } = req.body;

  if (!serviceName)
    return res.status(400).json({ error: "Service name is required" });

  try {
    const TokenModel = getTokenModel(serviceName);

    const lastToken = await TokenModel.findOne().sort({ tokenNumber: -1 });
    const newTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;

    const prefix = servicePrefixes[serviceName];
    const displayToken = `${prefix}-${newTokenNumber
      .toString()
      .padStart(3, "0")}`;

    const newToken = new TokenModel({
      userName,
      serviceName,
      tokenNumber: newTokenNumber,
      displayToken,
    });

    await newToken.save();

    res.json({ message: "Token Generated", token: newToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

/* ============================================================
   LIST TOKENS BY SERVICE
   Example: /api/tokens/list/Admission
   ============================================================ */
router.get("/list/:service", async (req, res) => {
  const { service } = req.params;

  try {
    const TokenModel = getTokenModel(service);

    const queue = await TokenModel
      .find({ status: "pending" })   // 🚀 Only show new tokens
      .sort({ createdAt: 1 });

    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch queue" });
  }
});

/* ============================================================
   FIXED QUEUE ROUTE
   ============================================================ */
router.get("/queue/:service", async (req, res) => {
  try {
    const { service } = req.params;

    const TokenModel = getTokenModel(service);
    const tokens = await TokenModel.find({
      status: { $in: ["pending", "serving"] },
    }).sort({ createdAt: 1 });

    res.json(tokens);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching queue" });
  }
});

/* ============================================================
   CANCEL TOKEN
   ============================================================ */
router.put("/cancel/:service/:tokenNumber", async (req, res) => {
  try {
    const { service, tokenNumber } = req.params;

    const TokenModel = getTokenModel(service);
    if (!TokenModel)
      return res.status(400).json({ message: "Invalid service" });

    const token = await TokenModel.findOne({ tokenNumber });
    if (!token)
      return res.status(404).json({ message: "Token not found" });

    token.status = "cancelled";
    await token.save();

    res.json(token);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to cancel token", error: err.message });
  }
  
});

router.put("/:service/status/:tokenNumber", async (req, res) => {
  const { service, tokenNumber } = req.params;
  const { status } = req.body;

  try {
    const TokenModel = getTokenModel(service);
    const token = await TokenModel.findOne({ tokenNumber });

    if (!token) return res.status(404).json({ message: "Token not found" });

    token.status = status;  
    await token.save();

    res.json(token);

  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err });
  }
});



export default router;
