import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AppLogo, APP_CONFIG } from '../../utils/constants.jsx';
import { PasswordInput } from '../ui/PasswordInput';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client',
    phone: '',
    specialization: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <AppLogo size="large" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Join {APP_CONFIG.name}
          </h2>
          <p className="text-gray-600">{APP_CONFIG.tagline}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                I am a
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white/50"
              >
                <option value="client">🧑‍💼 Client seeking nutrition guidance</option>
                <option value="dietician">👩‍⚕️ Registered Dietician</option>
              </select>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white/50"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white/50"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white/50"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>

            {formData.role === 'dietician' && (
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <label htmlFor="specialization" className="block text-sm font-medium text-emerald-800 mb-1">
                  🎓 Area of Specialization
                </label>
                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 bg-white/70"
                  placeholder="e.g., Sports Nutrition, Clinical Nutrition, Weight Management"
                  value={formData.specialization}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            )}

            <PasswordInput
              id="password"
              name="password"
              label="Password"
              placeholder="Create a secure password"
              required
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              helperText="Must include uppercase, lowercase, number, and special character"
            />

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02]"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating your account...
                </div>
              ) : (
                `Join ${APP_CONFIG.name} 🚀`
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already part of {APP_CONFIG.name}?{' '}
              <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};