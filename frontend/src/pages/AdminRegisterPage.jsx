import { useState } from 'react';
import { adminRegister } from '../api/authAPI';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminRegisterPage() {
  const [form, setForm] = useState({ name: '', staffId: '', email: '', password: '', adminCode: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminRegister({ ...form, role: 'admin' });
      toast.success('Admin registered! You can now log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="absolute top-6 left-6">
        <Link to="/" className="text-indigo-700 font-bold text-xl hover:underline">🏠 HOME</Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Registration</h2>
        <input name="name" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="staffId" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Staff ID" value={form.staffId} onChange={handleChange} required />
        <input name="email" type="email" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="adminCode" className="w-full mb-6 px-4 py-2 border rounded" placeholder="Admin Code (students will use this)" value={form.adminCode} onChange={handleChange} required />
        <div className="mb-4 text-xs text-gray-500 text-left">This admin code will be used by your students to register under you.</div>
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition" disabled={loading}>
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