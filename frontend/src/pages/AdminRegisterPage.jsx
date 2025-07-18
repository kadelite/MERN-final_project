import { useState } from 'react';
import { adminRegister, login as loginAPI } from '../api/authAPI';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';

export default function AdminRegisterPage() {
  const [form, setForm] = useState({ name: '', staffId: '', email: '', password: '', adminCode: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminRegister({ ...form, role: 'admin' });
      // Auto-login after registration
      const res = await loginAPI({ email: form.email, password: form.password });
      setAuth(res.data.user, res.data.token);
      toast.success('Registration and login successful!');
      navigate('/admin');
    } catch (err) {
      console.log('Registration/Login Error:', err, err.response);
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Register Form */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="card-glass">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Admin Registration</h2>
            <p className="text-gray-600 text-lg">Create your administrator account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
              <input 
                id="name"
                name="name"
                autoComplete="name"
                className="input-field" 
                placeholder="Enter your full name" 
                value={form.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div>
              <label htmlFor="staffId" className="block text-sm font-semibold text-gray-700 mb-3">Staff ID</label>
              <input 
                id="staffId"
                name="staffId"
                autoComplete="off"
                className="input-field" 
                placeholder="Enter your staff ID" 
                value={form.staffId} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
              <input 
                id="email"
                name="email"
                type="email" 
                autoComplete="email"
                className="input-field" 
                placeholder="Enter your email" 
                value={form.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
              <input 
                id="password"
                name="password"
                type="password" 
                autoComplete="new-password"
                className="input-field" 
                placeholder="Create a password" 
                value={form.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div>
              <label htmlFor="adminCode" className="block text-sm font-semibold text-gray-700 mb-3">Admin Code</label>
              <input 
                id="adminCode"
                name="adminCode"
                autoComplete="off"
                className="input-field" 
                placeholder="Create an admin code" 
                value={form.adminCode} 
                onChange={handleChange} 
                required 
              />
              <p className="text-xs text-gray-500 mt-2">This code will be used by students to register under you.</p>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-gray-600 text-lg">Already have an account? </span>
            <Link to="/admin-login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors text-lg">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 