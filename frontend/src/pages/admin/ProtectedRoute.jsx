import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Ambil role dari localStorage atau state management

  // Jika tidak ada token atau role tidak cocok, arahkan ke halaman lain
  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>; // Jika valid, render child component
};

export default ProtectedRoute;
