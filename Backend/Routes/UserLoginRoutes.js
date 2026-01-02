import express from "express";
import UserLogin from "../Models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "your_secret_key";
// CHECK USER EXISTS
router.post("/check-user", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserLogin.findOne({ email });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN or AUTO-SIGNUP
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await UserLogin.findOne({ email });

    // First-time user → SIGN UP
   if (!user) {
  user = new UserLogin({ username, email, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  return res.status(200).json({
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}


    // Existing user → LOGIN
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }
 const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
   res.json({
  token,
  user: {
    _id: user._id,
    username: user.username,
    email: user.email,
  },
});
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
