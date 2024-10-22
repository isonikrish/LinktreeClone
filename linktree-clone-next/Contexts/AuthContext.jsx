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
    const [bgColor, setBgColor] = useState(() => {
        // Get initial bgColor from local storage or default to "white"
        return localStorage.getItem('bgColor') || "white";
    });
    const [color, setColor] = useState(() => {
        // Get initial color from local storage or default to "black"
        return localStorage.getItem('color') || "black";
    });

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

    // Effect to store bgColor and color in local storage whenever they change
    useEffect(() => {
        localStorage.setItem('bgColor', bgColor);
    }, [bgColor]);

    useEffect(() => {
        localStorage.setItem('color', color);
    }, [color]);

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            user, 
            setUser, 
            selectedLinktree, 
            setSelectedLinktree, 
            linktree, 
            fetchLinktree,
            setBgColor,
            bgColor,
            color,
            setColor
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
