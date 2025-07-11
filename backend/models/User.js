import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student'], required: true },
  class: { type: String, required: true },
  rollNumber: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('User', userSchema); 