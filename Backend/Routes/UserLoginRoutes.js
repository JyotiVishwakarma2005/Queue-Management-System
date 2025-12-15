import express from "express";
import UserLogin from "../Models/User.js";

const router = express.Router();

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

      return res.status(201).json({
        message: "User created & logged in",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    }

    // Existing user → LOGIN
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
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
