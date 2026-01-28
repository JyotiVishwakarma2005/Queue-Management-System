import mongoose from "mongoose";

const serviceStatusSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      unique: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceStatus", serviceStatusSchema);
