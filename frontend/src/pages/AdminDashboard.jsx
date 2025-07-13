import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStudents } from '../api/userAPI';
import { getAttendanceReport } from '../api/attendanceAPI';
import dayjs from 'dayjs';
import { useAuth } from '../components/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ students: 0, classes: 0, attendance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError('');
      try {
        // Fetch all students
        const studentsRes = await getAllStudents();
        const students = studentsRes.data;
        const totalStudents = students.length;
        const uniqueClasses = new Set(students.map(s => s.class)).size;

        // Fetch today's attendance
        const today = dayjs().format('YYYY-MM-DD');
        const attendanceRes = await getAttendanceReport({ from: today, to: today });
        // attendanceRes.data is an array of attendance records for today
        let present = 0, total = 0;
        attendanceRes.data.forEach(record => {
          record.records.forEach(r => {
            total++;
            if (r.status === 'present') present++;
          });
        });
        const attendancePercent = total > 0 ? Math.round((present / total) * 100) : 0;

        setStats({ students: totalStudents, classes: uniqueClasses, attendance: attendancePercent });
      } catch (err) {
        setError('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-2 sm:p-4 md:p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{user.name}</span>!
          </h1>
          <p className="text-base sm:text-lg text-gray-600">Manage your attendance system efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{loading ? '-' : stats.students}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Today's Attendance</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{loading ? '-' : stats.attendance + '%'}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{loading ? '-' : stats.classes}</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          <Link to="/admin/students" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">Student Management</h3>
              <p className="text-gray-600 text-center text-xs sm:text-base">Add, edit, and manage student information</p>
            </div>
          </Link>

          <Link to="/admin/attendance" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">Mark Attendance</h3>
              <p className="text-gray-600 text-center text-xs sm:text-base">Record daily attendance for all classes</p>
            </div>
          </Link>

          <Link to="/admin/reports" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">Attendance Reports</h3>
              <p className="text-gray-600 text-center text-xs sm:text-base">Generate detailed reports and analytics</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 