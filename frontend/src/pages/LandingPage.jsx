import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden p-2 sm:p-4 md:p-6">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-2 sm:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
           
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-2 sm:px-4 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Content */}
          <div className="mb-16 animate-fade-in">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-8 leading-tight">
              Smart Attendance
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Management System
              </span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-12">
              Streamline attendance tracking for schools and colleges with our modern, 
              user-friendly platform designed for administrators and students.
            </p>
          </div>

          {/* Portal Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto animate-slide-up">
            {/* Admin Section */}
            <div className="card-glass hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group p-4 sm:p-8">
              <div className="flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mx-auto mb-4 sm:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-6">Administrator Portal</h2>
              <p className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-lg leading-relaxed">Manage students, track attendance, and generate comprehensive reports with our powerful admin tools.</p>
              <div className="space-y-2 sm:space-y-4">
                <Link 
                  to="/admin-login" 
                  className="btn-primary block w-full text-center text-xs sm:text-base"
                >
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Admin Login</span>
                  </div>
                </Link>
                <Link 
                  to="/admin-register" 
                  className="btn-secondary block w-full text-center text-xs sm:text-base"
                >
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Admin Register</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Student Section */}
            <div className="card-glass hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group p-4 sm:p-8">
              <div className="flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl mx-auto mb-4 sm:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-6">Student Portal</h2>
              <p className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-lg leading-relaxed">View your attendance records, track performance, and stay updated with your academic progress.</p>
              <div className="space-y-2 sm:space-y-4">
                <Link 
                  to="/student-login" 
                  className="btn-primary block w-full text-center text-xs sm:text-base"
                >
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Student Login</span>
                  </div>
                </Link>
                <Link 
                  to="/student-register" 
                  className="btn-secondary block w-full text-center text-xs sm:text-base"
                >
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Student Register</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-10 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto animate-slide-up">
            <div className="text-center group">
              <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Easy Tracking</h3>
              <p className="text-gray-600 text-xs sm:text-base">Simple and intuitive attendance marking with real-time updates</p>
            </div>
            <div className="text-center group">
              <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Smart Reports</h3>
              <p className="text-gray-600 text-xs sm:text-base">Comprehensive analytics and insights with detailed performance metrics</p>
            </div>
            <div className="text-center group">
              <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Secure Access</h3>
              <p className="text-gray-600 text-xs sm:text-base">Role-based authentication system with advanced security features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 