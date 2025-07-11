import Attendance from '../models/Attendance.js';
import User from '../models/User.js';
import dayjs from 'dayjs';

export const markAttendance = async (req, res) => {
  try {
    const { date, class: className, records } = req.body;
    if (!date || !className || !records) return res.status(400).json({ message: 'Missing fields' });
    let att = await Attendance.findOne({ date: dayjs(date).startOf('day').toDate(), class: className });
    if (!att) {
      att = new Attendance({ date: dayjs(date).startOf('day').toDate(), class: className, records });
    } else {
      // Update or add records
      records.forEach(r => {
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
    const att = await Attendance.findOne({ date: dayjs(date).startOf('day').toDate() });
    if (!att) return res.status(404).json({ message: 'Attendance not found' });
    att.records = records;
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
    let records = await Attendance.find(query).populate('records.studentId', 'name email class rollNumber');
    if (studentId) {
      // Filter for a single student
      records = records.map(r => ({ ...r.toObject(), records: r.records.filter(rec => rec.studentId && rec.studentId._id.toString() === studentId) }));
    }
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const records = await Attendance.find({ 'records.studentId': id }).populate('records.studentId', 'name email class rollNumber');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 