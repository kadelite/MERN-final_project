import { useState } from 'react';
import { register, login as loginAPI } from '../api/authAPI';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student', class: '', rollNumber: '', gender: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, login: setAuth } = useAuth();

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form, token);
      // Auto-login after registration
      const res = await loginAPI({ email: form.email, password: form.password });
      setAuth(res.data.user, res.data.token);
      toast.success('Registration and login successful!');
      navigate(res.data.user.role === 'admin' ? '/admin' : '/student');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register Student</h2>
        <input name="name" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="class" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Class (e.g. 10A)" value={form.class} onChange={handleChange} required />
        <select name="gender" className="w-full mb-6 px-4 py-2 border rounded" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
} 