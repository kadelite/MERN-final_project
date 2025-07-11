import express from 'express';
import { register, login } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

// Only admin can register new users
router.post('/register', authMiddleware, roleMiddleware('admin'), register);
router.post('/login', login);

export default router; 