import express from "express";
import Complaint from "../Models/Complaint.js";

const router = express.Router();

/* ================= USER: CREATE COMPLAINT ================= */
router.post("/", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debug: check incoming data

    const { userId, userName, serviceName, complaintText } = req.body;

    // Check all fields
    if (!userId || !userName || !serviceName || !complaintText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new complaint
    const complaint = new Complaint({
      userId,
      userName,
      serviceName,
      complaintText,
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    console.error("Complaint error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/* ================= ADMIN: VIEW ALL COMPLAINTS ================= */
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Fetch complaints error:", error);
    res.status(500).json({ message: "Failed to fetch complaints", error: error.message });
  }
});

// ================= ADMIN: RESOLVE COMPLAINT =================
// ================= ADMIN: RESOLVE COMPLAINT =================
router.patch("/resolve/:id", async (req, res) => {
  try {
    const complaintId = req.params.id;

    // Find complaint by ID
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Update status to resolved
    complaint.status = "resolved";
    await complaint.save();

    res.json({ message: "Complaint resolved", complaint });
  } catch (error) {
    console.error("Resolve complaint error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



export default router;
