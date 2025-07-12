import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">Welcome to AttendanceApp</h1>
        <p className="mb-8 text-gray-600">Please choose your portal:</p>
        <div className="flex flex-col gap-4">
          <Link to="/admin-login" className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Admin Login</Link>
          <Link to="/admin-register" className="bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition">Admin Register</Link>
          <Link to="/student-login" className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Student Login</Link>
          <Link to="/student-register" className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">Student Register</Link>
        </div>
      </div>
    </div>
  );
} 