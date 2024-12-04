// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("role");
    return storedRole ? JSON.parse(storedRole) : null;
  });

  // console.log(user)
  // console.log(role)
  const navigate = useNavigate();

  // Fetch session or cookie to update user state if authenticated
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/auth/protected');
        if (data.user) {
          setUser(data.user);
          setRole(data.user.role);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("role", JSON.stringify(data.user.role));
        }
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setRole(userData.role);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", JSON.stringify(userData.role));
  };

  const logout = async () => {
    try {
      const response = await axios.post('/auth/logout');
      toast.success(response.data.message || "Logged out successfully");
      setUser(null);
      setRole(null);
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      navigate('/');
    } catch (error) {
      toast.error("Error during logout. Please try again.");
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
