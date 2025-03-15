import express from 'express';
import { updateUserProfile, getUserDetails } from '../services/userService';

const router = express.Router();

// Update User Profile
router.put('/profile', async (req, res) => {
  try {
    const { fullName, position,} = req.body;
    const userId = req.body.user.id; // Dapatkan ID pengguna dari token

    const result = await updateUserProfile(userId, fullName, position);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

// Get User Details
router.get('/profile', async (req, res) => {
  try {
    const userId = req.body.user.id; // Dapatkan ID pengguna dari token
    const userDetails = await getUserDetails(userId);
    res.json(userDetails);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;