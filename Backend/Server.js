import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import tokenRoutes from "./Routes/TokenRoutes.js";
import UserLoginRoutes from "./Routes/UserLoginRoutes.js";
import adminSettingsRoutes from "./Routes/AdminSettingsRoutes.js";
import adminAuthRoutes from "./Routes/adminAuthRoutes.js";
import { setIO } from "./socketB.js"; 
import adminRoutes from "./Routes/adminRoutes.js"
import complaintRoutes from "./Routes/ComplaintsRoute.js";
import feedbackRoutes from "./Routes/FeedbackRoutes.js"

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/collegeQueueDb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Socket.IO setup (NAMED export)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","http://localhost:5174"],
    methods: ["GET", "POST"]
  }
});
setIO(io); 
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log("User joined room:", userId);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Routes
app.use("/api/tokens", tokenRoutes);
app.use("/api/UserLogin", UserLoginRoutes);  
app.use("/api/admin/settings", adminSettingsRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/feedback", feedbackRoutes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

server.listen(5000, () => console.log("Server running on port 5000"));
export default io;
