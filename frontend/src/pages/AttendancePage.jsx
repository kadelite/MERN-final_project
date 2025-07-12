import { useState, useEffect } from 'react';
import { markAttendance } from '../api/attendanceAPI';
import { getAdminClasses, getAllStudents } from '../api/userAPI';
import { toast } from 'react-toastify';

export default function AttendancePage() {
  const [className, setClassName] = useState('');
  const [classOptions, setClassOptions] = useState([]);
  const [date, setDate] = useState('');
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Automatically refresh class list on mount and when window regains focus
  useEffect(() => {
    const refreshClasses = () => getAdminClasses().then(setClassOptions);
    refreshClasses();
    window.addEventListener('focus', refreshClasses);
    return () => window.removeEventListener('focus', refreshClasses);
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents('', className);
      setStudents(res.data);
      setRecords(res.data.map(s => ({ studentId: s._id, status: 'present' })));
    } catch {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setRecords(recs => recs.map(r => r.studentId === studentId ? { ...r, status } : r));
  };

  const saveAttendance = async () => {
    try {
      await markAttendance({ class: className, date, records });
      toast.success('Attendance saved');
    } catch {
      toast.error('Failed to save attendance');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">
        <h1 className="text-2xl font-bold text-indigo-800 mb-6">Mark Attendance</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={className}
            onChange={e => setClassName(e.target.value)}
          >
            <option value="">Select Class</option>
            {classOptions.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          <input
            type="date"
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition w-full md:w-auto" onClick={loadStudents} disabled={loading}>
            {loading ? 'Loading...' : 'Load Students'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Roll No</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={student._id}>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.rollNumber}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      className="px-2 py-1 border rounded"
                      value={records[idx]?.status || 'present'}
                      onChange={e => handleStatusChange(student._id, e.target.value)}
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {students.length > 0 && (
          <div className="flex justify-end mt-6">
            <button className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 transition" onClick={saveAttendance}>
              Save Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 