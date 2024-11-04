import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { tempUser } from "src/Utils/Helpers";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("authToken") || tempUser;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
