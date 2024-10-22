"use client"; 
import { useAuth } from '@/Contexts/AuthContext.jsx';
import React from 'react';

function Page() {
  const { setBgColor, setColor, color, bgColor } = useAuth();

  const themes = [
    {
      bgColor: 'bg-white',
      textColor: 'text-gray-800',
      name: 'Light Theme',
    },
    {
      bgColor: 'bg-gray-800',
      textColor: 'text-gray-100',
      name: 'Dark Theme',
    },
    {
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
      name: 'Ocean Breeze',
    },
    {
      bgColor: 'bg-green-500',
      textColor: 'text-white',
      name: 'Forest Vibes',
    },
    {
      bgColor: 'bg-purple-500',
      textColor: 'text-white',
      name: 'Royal Purple',
    },
    {
      bgColor: 'bg-yellow-500',
      textColor: 'text-gray-800',
      name: 'Sunny Day',
    },
  ];
  
  const handleThemeChange = (theme) => {
    console.log("Changing theme to:", theme);
    setBgColor(theme.bgColor);
    setColor(theme.textColor);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 text-black`}>
      <div className="max-w-md w-full rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Theme</h1>
        <div className="grid grid-cols-1 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeChange(theme)}
              className={`p-4 rounded-lg border-2 border-transparent hover:border-gray-300 transition duration-300 ease-in-out ${theme.bgColor} ${theme.textColor}`}
            >
              <span className="text-lg font-semibold">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-gray-500">Select a theme to customize your appearance.</p>
    </div>
  );
}

export default Page;
