import { useState } from 'react';
import { login } from '../api/authAPI';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage({ mode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // If mode is not passed as prop, try to infer from location
  const effectiveMode = mode || (location.pathname.includes('admin') ? 'admin' : location.pathname.includes('student') ? 'student' : undefined);
  const title = effectiveMode === 'admin' ? 'Admin Login' : effectiveMode === 'student' ? 'Student Login' : 'Login';
  const registerLink = effectiveMode === 'admin' ? '/admin-register' : effectiveMode === 'student' ? '/student-register' : '/register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Login successful');
      navigate(res.data.user.role === 'admin' ? '/admin' : '/student');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="absolute top-6 left-6">
        <Link to="/" className="text-indigo-700 font-bold text-xl hover:underline">🏠 HOME</Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        <input type="email" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" className="w-full mb-6 px-4 py-2 border rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <Link to={registerLink} className="text-indigo-600 hover:underline">Register</Link>
        </div>
      </form>
    </div>
  );
} 