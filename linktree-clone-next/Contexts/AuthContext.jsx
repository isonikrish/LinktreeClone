"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie } from '@/lib/utils/cookie'; // Adjust path as needed
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [selectedLinktree, setSelectedLinktree] = useState(null);
    const [linktree, setLinktree] = useState(null);
  
    useEffect(() => {
        const token = getCookie('userToken'); // Check for the token
        if (token) {
            setIsAuthenticated(true); // Set authenticated state
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/me');

                if (response.status === 200) {
                    setUser(response.data.User); // Set the user data
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setIsAuthenticated(false); // Optional: set auth false on error
            }
        };

        fetchUser(); // Call the function after token check
    }, [isAuthenticated]); // Add isAuthenticated as dependency

    useEffect(() => {
        if (user?.linktrees?.length) {
            setSelectedLinktree(user.linktrees[0]);  // Set the default linktree
        }
    }, [user]);

    useEffect(() => {
        fetchLinktree(); // Fetch linktree whenever selectedLinktree or isToggled changes
    }, [selectedLinktree]); 

    async function fetchLinktree() {
        if (selectedLinktree?._id) {
            try {
                const response = await axios.get(`/api/linktree?id=${selectedLinktree._id}`);
                setLinktree(response.data);
            } catch (error) {
                console.error('Error fetching linktree:', error);
            }
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser, selectedLinktree, setSelectedLinktree, linktree, fetchLinktree }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
