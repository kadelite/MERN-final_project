import { useState } from 'react';
import { login } from '../api/authAPI';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';

export default function LoginPage({ mode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login: setAuth } = useAuth();

  // If mode is not passed as prop, try to infer from location
  const effectiveMode = mode || (location.pathname.includes('admin') ? 'admin' : location.pathname.includes('student') ? 'student' : undefined);
  const title = effectiveMode === 'admin' ? 'Admin Login' : effectiveMode === 'student' ? 'Student Login' : 'Login';
  const registerLink = effectiveMode === 'admin' ? '/admin-register' : effectiveMode === 'student' ? '/student-register' : '/register';
  const gradientColors = effectiveMode === 'admin' ? 'from-indigo-600 to-purple-600' : effectiveMode === 'student' ? 'from-blue-600 to-cyan-600' : 'from-indigo-600 to-purple-600';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });
      setAuth(res.data.user, res.data.token);
      toast.success('Login successful');
      navigate(res.data.user.role === 'admin' ? '/admin' : '/student');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="card-glass">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 bg-gradient-to-br ${gradientColors} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 text-lg">Welcome back! Please sign in to your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
              <input 
                type="email" 
                className="input-field" 
                placeholder="Enter your email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="Enter your password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button 
              type="submit" 
              className={`w-full bg-gradient-to-r ${gradientColors} text-white py-4 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg`} 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-gray-600 text-lg">Don't have an account? </span>
            <Link to={registerLink} className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors text-lg">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 