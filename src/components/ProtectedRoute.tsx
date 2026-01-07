import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();


  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  // If user is not logged in, kick them to Login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If logged in, show the protected page (the children)
  return children;
};

export default ProtectedRoute;