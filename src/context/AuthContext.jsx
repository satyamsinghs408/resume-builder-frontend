import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check if user is already logged in (on page refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 2. Login Function
  const login = async (email, password) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password }, config);
      
      // Save to LocalStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return true; // Login success
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  // 3. Register Function
  const register = async (name, email, password) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password }, config);
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return true;
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  // 4. Logout Function
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};