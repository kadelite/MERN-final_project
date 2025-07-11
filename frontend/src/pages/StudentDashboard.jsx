import { useEffect, useState } from 'react';
import { getStudentAttendance } from '../api/attendanceAPI';

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [summary, setSummary] = useState({ percentage: 0, present: 0, absent: 0, total: 0 });

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const res = await getStudentAttendance(user.id);
        const records = res.data.flatMap(r => r.records.filter(rec => rec.studentId === user.id));
        const total = records.length;
        const present = records.filter(r => r.status === 'present').length;
        const absent = records.filter(r => r.status === 'absent').length;
        const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;
        setSummary({ percentage, present, absent, total });
      } catch {}
    }
    if (user.id) fetchAttendance();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-indigo-800 mt-8 mb-6">Welcome, {user.name}!</h1>
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="w-full mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-indigo-700">Attendance Percentage</span>
            <span className="text-sm font-semibold text-indigo-700">{summary.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-indigo-500 h-4 rounded-full transition-all"
              style={{ width: `${summary.percentage}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-green-600">{summary.present}</span>
            <span className="text-sm text-gray-600">Days Present</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-red-500">{summary.absent}</span>
            <span className="text-sm text-gray-600">Days Absent</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-indigo-700">{summary.total}</span>
            <span className="text-sm text-gray-600">Total Days</span>
          </div>
        </div>
      </div>
    </div>
  );
} 