import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student'], required: true },
  class: { type: String, required: function() { return this.role === 'student'; } },
  rollNumber: { type: Number, required: function() { return this.role === 'student'; } },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  adminCode: { type: String, required: function() { return this.role === 'admin'; }, unique: false },
  staffId: { type: String, required: function() { return this.role === 'admin'; }, unique: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema); 