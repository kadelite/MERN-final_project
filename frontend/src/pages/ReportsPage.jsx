import { useState, useEffect } from 'react';
import { getAttendanceReport } from '../api/attendanceAPI';
import { getAdminClasses } from '../api/userAPI';
import { toast } from 'react-toastify';

export default function ReportsPage() {
  const [className, setClassName] = useState('');
  const [classOptions, setClassOptions] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAdminClasses().then(setClassOptions);
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const params = {};
      if (className) params.class = className;
      if (from) params.from = from;
      if (to) params.to = to;
      const res = await getAttendanceReport(params);
      setRecords(res.data);
    } catch {
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    let csv = 'Name,Email,Class,RollNo,Date,Status\n';
    records.forEach(r => {
      r.records.forEach(rec => {
        if (rec.studentId) {
          csv += `${rec.studentId.name},${rec.studentId.email},${rec.studentId.class},${rec.studentId.rollNumber},${r.date?.slice(0,10)},${rec.status}\n`;
        }
      });
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'attendance.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 mt-4 sm:mt-8">
        <h1 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-4 sm:mb-6">Attendance Reports</h1>
        <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
          <select
            className="w-full md:w-1/4 px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
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
            className="w-full md:w-1/4 px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
          <input
            type="date"
            className="w-full md:w-1/4 px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition w-full md:w-auto text-sm sm:text-base" onClick={loadReports} disabled={loading}>
            {loading ? 'Loading...' : 'Load Reports'}
          </button>
          <button className="bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition w-full md:w-auto text-sm sm:text-base" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Name</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Email</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Class</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Roll No</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Date</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-4">No records found.</td></tr>
              ) : records.map((r, idx) => (
                r.records.map((rec, j) => rec.studentId && (
                  <tr key={idx + '-' + j}>
                    <td className="py-2 px-4 border-b">{rec.studentId.name}</td>
                    <td className="py-2 px-4 border-b">{rec.studentId.email}</td>
                    <td className="py-2 px-4 border-b">{rec.studentId.class}</td>
                    <td className="py-2 px-4 border-b">{rec.studentId.rollNumber}</td>
                    <td className="py-2 px-4 border-b">{r.date?.slice(0,10)}</td>
                    <td className="py-2 px-4 border-b">{rec.status}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 