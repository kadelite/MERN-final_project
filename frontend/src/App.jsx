import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import StudentsPage from './pages/StudentsPage';
import AttendancePage from './pages/AttendancePage';
import ReportsPage from './pages/ReportsPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute role="admin"><StudentsPage /></ProtectedRoute>} />
        <Route path="/admin/attendance" element={<ProtectedRoute role="admin"><AttendancePage /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute role="admin"><ReportsPage /></ProtectedRoute>} />
        <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
} 