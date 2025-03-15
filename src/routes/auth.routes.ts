import express from 'express';
import registerUser from '../controllers/auth.controller';
import loginUser from '../controllers/auth.controller';

const router = express.Router();

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

export default router;