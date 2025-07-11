import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-lg text-gray-700">Sorry, the page you are looking for does not exist.</p>
      <Link to="/login" className="text-indigo-600 hover:underline text-lg">Go to Login</Link>
    </div>
  );
} 