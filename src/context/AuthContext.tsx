import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { User, AuthContextType } from '../types';

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Check if user is already logged in (on page refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 2. Login Function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post<User>('http://localhost:5000/api/users/login', { email, password }, config);
      
      // Save to LocalStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return true; // Login success
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  // 3. Register Function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post<User>('http://localhost:5000/api/users/register', { name, email, password }, config);
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return true;
    } catch (error: any) {
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

