import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userName: String,
  serviceName: String,
  tokenNumber: Number,          // store numeric only
  displayToken: String,         // formatted token
   status: {
    type: String,
    enum: ["pending", "serving", "completed", "cancelled"],
    default: "pending"
  },
  time: { type: Date, default: Date.now },
  servedAt: {
  type: Date,
  default: null,
},
completedAt: {
  type: Date,
  default: null,
},

});

// Dynamic model by service name
export const getTokenModel = (service) => {
  return mongoose.models[service] || mongoose.model(service, tokenSchema);
};


