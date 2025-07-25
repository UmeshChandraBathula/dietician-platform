import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLogo, APP_CONFIG } from '../../utils/constants.jsx';
import { authAPI } from '../../services/api';

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authAPI.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-2xl">📧</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-4">
              We've sent a password reset link to
            </p>
            <p className="font-semibold text-emerald-600 mb-6">{email}</p>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-6">
              <p className="text-blue-800 text-sm">
                📱 Check your email inbox and click the reset link to change your password. 
                The link will expire in 10 minutes for security.
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-3">
            <Link
              to="/login"
              className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition duration-200 font-medium"
            >
              Back to Login
            </Link>
            <button
              onClick={() => setSuccess(false)}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Try different email address
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <AppLogo size="large" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-600">
            No worries! Enter your email and we'll send you a reset link
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              {error}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white/50"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !email}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02]"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Reset Link...
              </div>
            ) : (
              '📧 Send Reset Link'
            )}
          </button>
        </div>

        <div className="text-center space-y-2">
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            ← Back to Login
          </Link>
          <div className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-600 hover:text-emerald-500 font-medium">
              Sign up for {APP_CONFIG.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};