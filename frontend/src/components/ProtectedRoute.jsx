import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../stores/auth.store";

const ProtectedRoute = () => {
  const { checkAuth, isAuthenticated, loading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsChecking(false);
    };
    verifyAuth();
  }, []);

  if (isChecking || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-one border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/hadashboard" replace />;
};

export default ProtectedRoute;
