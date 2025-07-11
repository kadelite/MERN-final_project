import { useState } from 'react';
import { login } from '../api/authAPI';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input type="email" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" className="w-full mb-6 px-4 py-2 border rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
        </div>
      </form>
    </div>
  );
} 