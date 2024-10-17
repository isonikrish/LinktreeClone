"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie } from '@/lib/utils/cookie'; // Adjust path as needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie('userToken'); // Check for the token
    if (token) {
      setIsAuthenticated(true); // Set authenticated state
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
