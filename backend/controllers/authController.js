import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password, role, class: className, rollNumber, adminCode, staffId } = req.body;
    if (role === 'admin') {
      if (!name || !email || !password || !adminCode || !staffId) {
        return res.status(400).json({ message: 'All fields are required for admin registration' });
      }
      // Ensure adminCode and staffId are unique among admins
      const existingEmail = await User.findOne({ email });
      if (existingEmail) return res.status(400).json({ message: 'Email already exists' });
      const existingCode = await User.findOne({ role: 'admin', adminCode });
      if (existingCode) return res.status(400).json({ message: 'Admin code already exists' });
      const existingStaffId = await User.findOne({ role: 'admin', staffId });
      if (existingStaffId) return res.status(400).json({ message: 'Staff ID already exists' });
      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashed, role, adminCode, staffId });
      await user.save();
      return res.status(201).json({ message: 'Admin registered' });
    }
    // Student registration
    if (role === 'student') {
      if (!name || !email || !password || !className || !rollNumber || !adminCode) {
        return res.status(400).json({ message: 'All fields are required for student registration' });
      }
      const admin = await User.findOne({ role: 'admin', adminCode });
      if (!admin) return res.status(400).json({ message: 'Invalid admin code' });
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Email already exists' });
      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashed, role, class: className, rollNumber, createdBy: admin._id });
      await user.save();
      return res.status(201).json({ message: 'Student registered' });
    }
    return res.status(400).json({ message: 'Invalid role' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const studentRegister = async (req, res) => {
  try {
    const { name, email, password, class: className, rollNumber, adminCode } = req.body;
    if (!name || !email || !password || !className || !rollNumber || !adminCode) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const admin = await User.findOne({ role: 'admin', adminCode });
    if (!admin) return res.status(400).json({ message: 'Invalid admin code' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      name, email, password: hashed, role: 'student', class: className, rollNumber, createdBy: admin._id
    });
    await user.save();
    res.status(201).json({ message: 'Student registered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, class: user.class, rollNumber: user.rollNumber } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 