import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { AppLogo, APP_CONFIG } from '../../utils/constants.jsx';
import { authAPI } from '../../services/api';
import { PasswordInput } from '../ui/PasswordInput';

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (resetToken) {
      setToken(resetToken);
    } else {
      setError('Invalid or missing reset token');
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (!token) {
      setError('Invalid reset token');
      setLoading(false);
      return;
    }

    try {
      await authAPI.resetPassword(token, formData.password);
      setSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-2xl">✅</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Password Reset Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Your password has been successfully updated.
            </p>
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 mb-6">
              <p className="text-green-800 text-sm">
                🎉 You can now login with your new password. 
                You'll be redirected to the login page automatically.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition duration-200 font-medium"
            >
              Continue to Login →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <AppLogo size="large" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Set New Password
          </h2>
          <p className="text-gray-600">
            Choose a strong password for your {APP_CONFIG.name} account
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
          <PasswordInput
            id="password"
            name="password"
            label="New Password"
            placeholder="Enter your new password"
            required
            value={formData.password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            helperText="Must be at least 8 characters with uppercase, lowercase, number, and special character"
            className="focus:ring-purple-500 focus:border-purple-500"
          />

          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="focus:ring-purple-500 focus:border-purple-500"
          />

          <button
            onClick={handleSubmit}
            disabled={loading || !token || !formData.password || !formData.confirmPassword}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02]"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating Password...
              </div>
            ) : (
              '🔒 Update Password'
            )}
          </button>
        </div>

        <div className="text-center">
          <Link
            to="/login"
            className="text-purple-600 hover:text-purple-500 text-sm font-medium"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};