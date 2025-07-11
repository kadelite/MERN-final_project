import express from 'express';
import { getAllStudents, getStudent, updateStudent, deleteStudent } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware, roleMiddleware('admin'));

router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router; 