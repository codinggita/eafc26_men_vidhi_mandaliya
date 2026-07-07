import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (token && user) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;
