import express from "express";
import { getTokenModel } from "../Models/Token.js";
import ServiceStatus from "../Models/ServiceStatus.js";
import { getIO } from "../socketB.js"

const router = express.Router();

const servicePrefixes = {
  Admission: "Ad",
  RailwayConsession: "Rc",
  Library: "L",
  Canteen: "C",
  FeesPayment: "Fp",
};

router.get("/service/:serviceName/access", async (req, res) => {
  try {
    const status = await ServiceStatus.findOne({
      serviceName: req.params.serviceName,
    });

    res.json(status || { isOpen: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

  if (!serviceName) {
    return res.status(400).json({ error: "Service name is required" });
  }

  try {
    // Check if service is open
    const status = await ServiceStatus.findOne({ serviceName });

    if (!status || !status.isOpen) {
      return res
        .status(403)
        .json({ error: "Token generation is currently disabled by admin" });
    }

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
    console.error("Generate token error:", err);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

const SERVICE_MAP = {
  admission: "Admission",
  railwayconsession: "RailwayConsession",
  library: "Library",
  canteen: "Canteen",
  feespayment: "FeesPayment",
};

router.get("/list/:service", async (req, res) => {
  try {
    const key = req.params.service.toLowerCase();
    const serviceName = SERVICE_MAP[key];

    if (!serviceName) {
      return res.status(400).json({ error: "Invalid service name" });
    }

    const TokenModel = getTokenModel(serviceName);

    const queue = await TokenModel.find({
      status: { $ne: "completed" },
    }).sort({ createdAt: 1 });

    res.json(queue);
  } catch (err) {
    console.error(err);
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
    if (!token) return res.status(404).json({ message: "Token not found" });

    token.status = "cancelled";
    await token.save();

    const io = getIO();
    io.to(token.userName).emit("token_updated", token);

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

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    // 🔹 WHEN ADMIN STARTS SERVICE
    if (status === "serving" && !token.servedAt) {
      token.servedAt = new Date();
    }

    // 🔹 WHEN ADMIN COMPLETES SERVICE
    if (status === "completed") {
      token.completedAt = new Date();
    }

    token.status = status;
    await token.save();

    // 🔔 Emit WebSocket event AFTER saving
    const io = getIO();
  console.log("Emitting to room:", token.userName, "status:", token.status);
io.to(token.userName).emit("token_updated", token);

    res.json(token);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update token status",
      error: err.message,
    });
  }
});

router.put("/service/:serviceName/access", async (req, res) => {
  const { serviceName } = req.params;
  const { isOpen } = req.body;

  try {
    const status = await ServiceStatus.findOneAndUpdate(
      { serviceName },
      { isOpen },
      { upsert: true, new: true }
    );

    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/completed", async (req, res) => {
  try {
    const services = Object.keys(servicePrefixes);
    let completedTokens = [];

    for (const service of services) {
      const TokenModel = getTokenModel(service);
      const tokens = await TokenModel.find({ status: "completed" });

      completedTokens.push(
        ...tokens.map((t) => ({
          ...t.toObject(),
          serviceName: service,
        }))
      );
    }

    res.json(completedTokens);
  } catch (err) {
    res.status(500).json({ message: "Error fetching completed tokens" });
  }
});

// GET /api/tokens/user/:serviceName/:userName
router.get("/user/:serviceName/:userName", async (req, res) => {
  try {
    const { serviceName, userName } = req.params;
    const TokenModel = getTokenModel(serviceName);

    const token = await TokenModel.findOne({
      userName,
      status: { $in: ["pending", "serving"] }, // only active tokens
    });

    res.json(token); // token or null
  } catch (err) {
    res.status(500).json({ message: "Error fetching active token" });
  }
});

export default router;
