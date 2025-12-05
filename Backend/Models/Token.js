import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userName: String,
  serviceName: String,
  tokenNumber: Number,          // store numeric only
  displayToken: String,         // formatted token
  time: { type: Date, default: Date.now }
});

// Dynamic model by service name
export const getTokenModel = (service) => {
  return mongoose.models[service] || mongoose.model(service, tokenSchema);
};