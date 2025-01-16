// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = getRoleFromToken(token);

  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
