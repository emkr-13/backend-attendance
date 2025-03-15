import express from "express";
import { registerUser, loginUser } from "../services/authService";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { username, password, fullName } = req.body;
    const result = await registerUser(username, password, fullName);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { token,refreshToken} = await loginUser(username, password);
    res.status(200).json({ token,refreshToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;
