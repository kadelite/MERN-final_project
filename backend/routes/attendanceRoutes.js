import express from 'express';
import { markAttendance, updateAttendance, getAttendanceReport, getStudentAttendance } from '../controllers/attendanceController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

// Admin only
router.post('/mark', authMiddleware, roleMiddleware('admin'), markAttendance);
router.put('/update/:date', authMiddleware, roleMiddleware('admin'), updateAttendance);
router.get('/report', authMiddleware, roleMiddleware('admin'), getAttendanceReport);

// Student or admin can view student attendance
router.get('/student/:id', authMiddleware, getStudentAttendance);

export default router; 