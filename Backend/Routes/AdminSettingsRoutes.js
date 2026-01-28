import express from "express";
import { getSettings, updateSettings } from "../Controllers/AdminSettingsController.js";
import adminAuth from "../Middleware/adminAuth.js";
const router = express.Router();

router.get("/", adminAuth, getSettings);
router.post("/", adminAuth, updateSettings);

export default router;
