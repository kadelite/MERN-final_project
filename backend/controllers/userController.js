import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getAllStudents = async (req, res) => {
  try {
    const { search, class: className, gender } = req.query;
    let query = { role: 'student', createdBy: req.user.id };
    if (search) {
      if (!isNaN(Number(search))) {
        // If search is a number, search only by rollNumber (unique)
        query.rollNumber = Number(search);
      } else {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { class: { $regex: search, $options: 'i' } },
          { gender: { $regex: search, $options: 'i' } }
        ];
      }
    }
    if (className) {
      query.class = className;
    }
    if (gender) {
      query.gender = gender;
    }
    const students = await User.find(query).select('-password');
    res.json(students);
  } catch (err) {
    console.error('UserController error:', err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, createdBy: req.user.id, role: 'student' }).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error('UserController error:', err);
    res.status(500).json({ message: err.message, stack: err.stack });
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
    console.error('UserController error:', err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await User.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id, role: 'student' });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error('UserController error:', err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
}; 