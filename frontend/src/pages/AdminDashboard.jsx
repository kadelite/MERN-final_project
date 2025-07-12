import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col items-center p-6">
      <div className="absolute top-6 left-6">
        <Link to="/" className="text-indigo-700 font-bold text-xl hover:underline">🏠 HOME</Link>
      </div>
      <h1 className="text-3xl font-bold text-indigo-800 mt-8 mb-2">Admin Dashboard</h1>
      <div className="mb-8 text-center">
        <div className="text-lg text-gray-700 font-semibold">Welcome, {user.name}!</div>
        <div className="text-sm text-gray-500">Email: {user.email}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <Link to="/admin/students" className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center hover:shadow-2xl transition">
          <span className="text-4xl mb-2">👩‍🎓</span>
          <span className="text-lg font-semibold text-indigo-700">Student Management</span>
        </Link>
        <Link to="/admin/attendance" className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center hover:shadow-2xl transition">
          <span className="text-4xl mb-2">🗓️</span>
          <span className="text-lg font-semibold text-indigo-700">Mark Attendance</span>
        </Link>
        <Link to="/admin/reports" className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center hover:shadow-2xl transition">
          <span className="text-4xl mb-2">📊</span>
          <span className="text-lg font-semibold text-indigo-700">Attendance Reports</span>
        </Link>
      </div>
    </div>
  );
} 