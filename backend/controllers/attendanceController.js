import Attendance from '../models/Attendance.js';
import User from '../models/User.js';
import dayjs from 'dayjs';

export const markAttendance = async (req, res) => {
  try {
    const { date, class: className, records } = req.body;
    if (!date || !className || !records) return res.status(400).json({ message: 'Missing fields' });
    // Only allow marking attendance for students owned by this admin
    const allowedStudents = await User.find({ role: 'student', createdBy: req.user.id }).select('_id');
    const allowedIds = allowedStudents.map(s => s._id.toString());
    const filteredRecords = records.filter(r => allowedIds.includes(r.studentId));
    let att = await Attendance.findOne({ date: dayjs(date).startOf('day').toDate(), class: className });
    if (!att) {
      att = new Attendance({ date: dayjs(date).startOf('day').toDate(), class: className, records: filteredRecords });
    } else {
      // Update or add records
      filteredRecords.forEach(r => {
        const idx = att.records.findIndex(rec => rec.studentId.toString() === r.studentId);
        if (idx > -1) att.records[idx].status = r.status;
        else att.records.push(r);
      });
    }
    await att.save();
    res.json({ message: 'Attendance marked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { date } = req.params;
    const { records } = req.body;
    // Only allow updating attendance for students owned by this admin
    const allowedStudents = await User.find({ role: 'student', createdBy: req.user.id }).select('_id');
    const allowedIds = allowedStudents.map(s => s._id.toString());
    const filteredRecords = records.filter(r => allowedIds.includes(r.studentId));
    const att = await Attendance.findOne({ date: dayjs(date).startOf('day').toDate() });
    if (!att) return res.status(404).json({ message: 'Attendance not found' });
    att.records = filteredRecords;
    await att.save();
    res.json({ message: 'Attendance updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAttendanceReport = async (req, res) => {
  try {
    const { class: className, from, to, studentId } = req.query;
    let query = {};
    if (className) query.class = className;
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = dayjs(from).startOf('day').toDate();
      if (to) query.date.$lte = dayjs(to).endOf('day').toDate();
    }
    // Only show attendance for students owned by this admin
    const allowedStudents = await User.find({ role: 'student', createdBy: req.user.id }).select('_id');
    const allowedIds = allowedStudents.map(s => s._id.toString());
    let records = await Attendance.find(query).populate('records.studentId', 'name email class rollNumber createdBy');
    // Filter out records for students not owned by this admin
    records = records.map(r => ({
      ...r.toObject(),
      records: r.records.filter(rec => rec.studentId && allowedIds.includes(rec.studentId._id.toString()))
    }));
    if (studentId) {
      records = records.map(r => ({
        ...r,
        records: r.records.filter(rec => rec.studentId && rec.studentId._id.toString() === studentId)
      }));
    }
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    // Only allow if the student is owned by this admin or the student is self
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'Student not found' });
    if (user.role === 'student' && user.createdBy && req.user.role === 'admin' && user.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const records = await Attendance.find({ 'records.studentId': id }).populate('records.studentId', 'name email class rollNumber');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 