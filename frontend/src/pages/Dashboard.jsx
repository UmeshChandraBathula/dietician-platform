import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AppLogo, APP_CONFIG } from "../utils/constants.jsx";

export const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <AppLogo size="default" />
              <div className="hidden md:block">
                <span className="text-sm text-gray-500">{APP_CONFIG.tagline}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-emerald-600 capitalize font-medium">
                    {user?.role === 'dietician' ? '👩‍⚕️ Dietician' : '🧑‍💼 Client'}
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition duration-200 transform hover:scale-105 shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {/* Welcome Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 border border-emerald-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {user?.role === 'dietician' ? '👩‍⚕️ Dietician Dashboard' : '🧑‍💼 Client Dashboard'}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Welcome back, <span className="font-semibold text-emerald-600">{user?.name}</span>! 🎉
            </p>
            <p className="text-gray-500">Ready to continue your nutrition journey with {APP_CONFIG.name}?</p>
          </div>
        </div>

        {/* Stats/Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-emerald-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Account Status</h3>
                <p className="text-2xl font-bold text-emerald-600">Active ✅</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-emerald-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Your Role</h3>
                <p className="text-2xl font-bold text-teal-600 capitalize">{user?.role}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 text-xl">
                  {user?.role === 'dietician' ? '👩‍⚕️' : '🧑‍💼'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-emerald-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Member Since</h3>
                <p className="text-2xl font-bold text-cyan-600">Today 🆕</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                <span className="text-cyan-600 text-xl">📅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Account Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <h3 className="font-semibold text-emerald-800 mb-2">Personal Details</h3>
                <p className="text-emerald-700"><strong>Name:</strong> {user?.name}</p>
                <p className="text-emerald-700"><strong>Email:</strong> {user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-teal-50 p-4 rounded-xl border border-teal-200">
                <h3 className="font-semibold text-teal-800 mb-2">🎯 Next Steps</h3>
                <ul className="text-teal-700 space-y-1 text-sm">
                  {user?.role === 'dietician' ? (
                    <>
                      <li>• Set up your professional profile</li>
                      <li>• Add client management tools</li>
                      <li>• Create meal planning templates</li>
                      <li>• Schedule consultation hours</li>
                    </>
                  ) : (
                    <>
                      <li>• Complete your health assessment</li>
                      <li>• Connect with a dietician</li>
                      <li>• Set your nutrition goals</li>
                      <li>• View personalized meal plans</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Powered by <AppLogo size="small" className="inline" /> - {APP_CONFIG.description}
          </p>
        </div>
      </main>
    </div>
  );
};