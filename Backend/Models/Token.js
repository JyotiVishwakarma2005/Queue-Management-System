import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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

export const getTokenModel = (service) => {
  const serviceMap = {
    Admission: "admissions",
     RailwayConcession: "railwayconcessions",
  RailwayConsession: "railwayconcessions",
    Library: "libraries",
    Canteen: "canteens",
    FeesPayment: "feespayments",
  };

  const collectionName = serviceMap[service];

  if (!collectionName) {
    throw new Error(`Invalid service: ${service}`);
  }

  const modelName = `${collectionName}_model`;

  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }

  return mongoose.model(modelName, tokenSchema, collectionName);
};
