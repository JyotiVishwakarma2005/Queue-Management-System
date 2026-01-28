import express from "express";
import { getTokenModel } from "../Models/Token.js";
import ServiceStatus from "../Models/ServiceStatus.js";
import { getIO } from "../socketB.js"
import  notifyQueueUsers  from "../services/NotificationService.js";
import Activity from "../Models/Activity.js";
// import Complaint from "../Models/Complaint.js";
// import Feedback from "../Models/Feedback.js";
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
// router.post("/generate", async (req, res) => {
//   const { userId, userName, serviceName } = req.body;

//   if (!userId || !userName || !serviceName) {
//     return res.status(400).json({ error: "Service name is required" });
//   }

//   try {
//     // Check if service is open
//     const status = await ServiceStatus.findOne({ serviceName });

//     if (!status || !status.isOpen) {
//       return res
//         .status(403)
//         .json({ error: "Token generation is currently disabled by admin" });
//     }

//     const TokenModel = getTokenModel(serviceName);

//     const lastToken = await TokenModel.findOne().sort({ tokenNumber: -1 });
//     const newTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;

//     const prefix = servicePrefixes[serviceName];
//     const displayToken = `${prefix}-${newTokenNumber
//       .toString()
//       .padStart(3, "0")}`;

//     const newToken = new TokenModel({
//       userId,
//       userName,
//       serviceName,
//       tokenNumber: newTokenNumber,
//       displayToken,
//     });

//     await newToken.save();

//     res.json({ message: "Token Generated", token: newToken });
//   } catch (err) {
//     console.error("Generate token error:", err);
//     res.status(500).json({ error: "Failed to generate token" });
//   }
// });


router.post("/generate", async (req, res) => {
  const { userId, userName, serviceName } = req.body;

  if (!userId || !userName || !serviceName) {
    return res.status(400).json({ error: "Service name is required" });
  }

  try {
    // 🔐 Check if service is open
    const status = await ServiceStatus.findOne({ serviceName });

    if (!status || !status.isOpen) {
      return res
        .status(403)
        .json({ error: "Token generation is currently disabled by admin" });
    }

    const TokenModel = getTokenModel(serviceName);

    // 🕛 START & END OF TODAY
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // 🔍 FIND LAST TOKEN OF TODAY ONLY
    const lastTokenToday = await TokenModel.findOne({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ tokenNumber: -1 });

    // 🔢 DAILY RESET LOGIC
    const newTokenNumber = lastTokenToday
      ? lastTokenToday.tokenNumber + 1
      : 1;

    const prefix = servicePrefixes[serviceName];
    const displayToken = `${prefix}-${newTokenNumber
      .toString()
      .padStart(3, "0")}`;

    const newToken = new TokenModel({
      userId,
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
    await notifyQueueUsers(service, io);
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

    if (!token)
      return res.status(404).json({ message: "Token not found" });

    // update timestamps based on status
    const now = new Date();
    switch (status) {
      case "serving":
        if (!token.servedAt) token.servedAt = now;
        break;
      case "completed":
        token.completedAt = now;
        break;
      case "cancelled":
        token.cancelledAt = now;
        break;
    }

    token.status = status;
    await token.save();

    const io = getIO();

    // Emit only if userId exists
    if (token.userId) {
      console.log(
        "🔔 Emitting token_updated to userId:",
        token.userId.toString(),
        "status:",
        status
      );

      io.to(token.userId.toString()).emit("token_updated", {
        tokenNumber: token.tokenNumber,
        service,
        status,
        message:
          status === "completed"
            ? "✅ Your token is completed"
            : status === "cancelled"
            ? "❌ Your token was cancelled by admin"
            : "🔄 Your token is now being served",
        createdAt: now,
      });
    } else {
      console.log("❌ token.userId is missing, cannot emit notification");
    }

    res.json(token);
  } catch (err) {
    console.log("❌ Error updating token:", err);
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

router.put("/admin/token/:id/complete", async (req, res) => {
  const { service } = req.body;

  const TokenModel = getTokenModel(service);

  const completedToken = await TokenModel.findByIdAndUpdate(
    req.params.id,
    { status: "completed" },
    { new: true }
  );

  // 🔔 VERY IMPORTANT
  await notifyQueueUsers(service, req.io);

  res.json({
    success: true,
    message: "Token completed",
    completedToken,
  });
});

const services = [
  "Admission",
  "Library",
  "Canteen",
  "FeesPayment",
  "RailwayConcession",
  "RailwayConsession"
];

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let allTokens = [];

    for (const service of services) {
      try {
        const TokenModel = getTokenModel(service);
        const tokens = await TokenModel.find({ userId });
        allTokens = allTokens.concat(tokens);
      } catch {
        // ignore invalid service
      }
    }

    // sort newest first
    allTokens.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json(allTokens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/complaint", async (req, res) => {
//   const complaint = await Complaint.create(req.body);
//   res.json(complaint);
// });

// router.get("/complaints", async (req, res) => {
//   const complaints = await Complaint.find().populate("userId", "name");
//   res.json(complaints);
// });

// router.put("/complaint/:id", async (req, res) => {
//   await Complaint.findByIdAndUpdate(req.params.id, { status: "resolved" });
//   res.json({ message: "Complaint resolved" });
// });
// router.post("/feedback", async (req, res) => {
//   const feedback = await Feedback.create(req.body);
//   res.json(feedback);
// });

// router.get("/feedback", async (req, res) => {
//   const feedbacks = await Feedback.find().populate("userId", "name");
//   res.json(feedbacks);
// });

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
