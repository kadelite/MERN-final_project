import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getAllStudents = async (req, res) => {
  try {
    const { search, class: className } = req.query;
    let query = { role: 'student', createdBy: req.user.id };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { rollNumber: search }
      ];
    }
    if (className) {
      query.class = className;
    }
    const students = await User.find(query).select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, createdBy: req.user.id, role: 'student' }).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { name, email, password, class: className, rollNumber } = req.body;
    const update = { name, email, class: className, rollNumber };
    if (password) {
      update.password = await bcrypt.hash(password, 10);
    }
    const student = await User.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id, role: 'student' },
      update,
      { new: true }
    ).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await User.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id, role: 'student' });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 