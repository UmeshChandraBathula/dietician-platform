import React from 'react';

// Global App Configuration
export const APP_CONFIG = {
  name: "Nume",
  tagline: "Your Nutrition Journey Starts Here",
  description: "Connecting clients with professional dieticians for personalized nutrition guidance",
  colors: {
    primary: "emerald",
    secondary: "slate"
  },
  contact: {
    email: "hello@nume.app",
    phone: "+1 (555) 123-4567"
  }
};

// Logo Component with cool styling
export const AppLogo = ({ size = "default", className = "" }) => {
  const sizes = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl",
    hero: "text-6xl"
  };

  return (
    <div className={`font-bold ${sizes[size]} ${className}`}>
      <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
        Nu
      </span>
      <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
        me
      </span>
      <span className="text-gray-600 text-sm ml-1 font-normal">✨</span>
    </div>
  );
};

// App Name Component (for places where you just need text)
export const AppName = ({ className = "" }) => {
  return (
    <span className={`font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent ${className}`}>
      {APP_CONFIG.name}
    </span>
  );
};
