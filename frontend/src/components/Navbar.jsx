import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="relative z-20 bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to={user?.role === 'admin' ? '/admin' : user?.role === 'student' ? '/student' : '/'} 
          className="flex items-center space-x-2 group"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
            AttendanceApp
          </span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {user?.role === 'admin' && (
            <>
              <Link to="/admin" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Dashboard</Link>
              <Link to="/admin/students" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Students</Link>
              <Link to="/admin/attendance" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Attendance</Link>
              <Link to="/admin/reports" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Reports</Link>
            </>
          )}
          {user?.role === 'student' && (
            <Link to="/student" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Dashboard</Link>
          )}
          {!user?.role && (
            <>
              <Link to="/admin-login" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Admin Login</Link>
              <Link to="/student-login" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Student Login</Link>
            </>
          )}
          {user?.role && (
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
} 