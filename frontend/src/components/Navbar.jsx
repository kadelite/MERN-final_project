import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-4 py-2 flex justify-between items-center">
      <Link to={user.role === 'admin' ? '/admin' : user.role === 'student' ? '/student' : '/'} className="text-xl font-bold text-indigo-700">AttendanceApp</Link>
      <div className="flex gap-4 items-center">
        {user.role === 'admin' && (
          <>
            <Link to="/admin" className="hover:underline">Dashboard</Link>
            <Link to="/admin/students" className="hover:underline">Students</Link>
            <Link to="/admin/attendance" className="hover:underline">Attendance</Link>
            <Link to="/admin/reports" className="hover:underline">Reports</Link>
          </>
        )}
        {user.role === 'student' && (
          <Link to="/student" className="hover:underline">Dashboard</Link>
        )}
        {!user.role && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
        {user.role && (
          <button onClick={handleLogout} className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
        )}
      </div>
    </nav>
  );
} 