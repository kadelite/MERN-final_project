import mongoose from 'mongoose';

const attendanceRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['present', 'absent'], required: true },
});

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  class: { type: String, required: true },
  records: [attendanceRecordSchema],
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema); 