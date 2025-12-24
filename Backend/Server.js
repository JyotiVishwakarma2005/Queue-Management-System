import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tokenRoutes from "./Routes/TokenRoutes.js";
import UserLoginRoutes from "./Routes/UserLoginRoutes.js"
import adminSettingsRoutes from "./Routes/AdminSettingsRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/collegeQueueDb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/tokens", tokenRoutes);
app.use("/api/UserLogin", UserLoginRoutes);  
app.use("/api/admin/settings", adminSettingsRoutes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(5000, () => console.log("Server running on port 5000"));

