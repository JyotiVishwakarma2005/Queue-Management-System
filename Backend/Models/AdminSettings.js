import mongoose from "mongoose";

const AdminSettingsSchema = new mongoose.Schema({
  profile: {
    name: String,
    email: String,
    password: String,
  },
  notifications: {
    emailTokens: { type: Boolean, default: false },
    smsUrgent: { type: Boolean, default: false },
    dailySummary: { type: Boolean, default: false },
  }
});

export default mongoose.model("AdminSettings", AdminSettingsSchema);
