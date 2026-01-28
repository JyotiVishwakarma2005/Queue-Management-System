import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userName: String,
  
  message: String,
  createdAt: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ["current", "next"],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
