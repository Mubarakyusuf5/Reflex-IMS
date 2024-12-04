import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user, role } = useAuth();

  // console.log("User:", user); // Debugging output
  // console.log("Role:", role); 

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect if user does not have the required role
    return <Navigate to={-1} />;
  }
  

  // If authenticated and authorized, render the element
  return element;
};

export default ProtectedRoute;
