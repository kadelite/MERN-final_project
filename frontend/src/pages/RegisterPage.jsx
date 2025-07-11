import { useState } from 'react';
import { register } from '../api/authAPI';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student', class: '', rollNumber: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await register(form, token);
      toast.success('User registered');
      navigate('/admin/students');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register User</h2>
        <input name="name" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" className="w-full mb-4 px-4 py-2 border rounded" value={form.role} onChange={handleChange} required>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <input name="class" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Class (e.g. 10A)" value={form.class} onChange={handleChange} required />
        <input name="rollNumber" type="number" className="w-full mb-6 px-4 py-2 border rounded" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} required />
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