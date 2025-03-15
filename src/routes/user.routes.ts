import express from 'express';
import updateUserProfile from '../controllers/user.controller';
import getUserDetails from '../controllers/user.controller';

const router = express.Router();

// Update User Profile
router.put('/profile/:userId', updateUserProfile);

// Get User Details
router.get('/profile/:userId', getUserDetails);

export default router;