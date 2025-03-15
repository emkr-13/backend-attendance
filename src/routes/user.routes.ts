import express from 'express';
import updateUserProfile from '../controllers/user.controller';
import getUserDetails from '../controllers/user.controller';

const router = express.Router();

// Update User Profile
router.put('/profile/', updateUserProfile);

// Get User Details
router.get('/profile/', getUserDetails);

export default router;