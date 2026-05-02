import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Shield, Sparkles, Eye, EyeOff } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import useAuth from "../stores/auth.store";
import logo from "../assets/Logo01.png";

const Login = () => {
  const navigate = useNavigate();
  const { checkAuth, login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    initAuth();
  }, []);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/hadashboard");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-one via-green-two to-green-one flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsLoggingIn(true);
    const success = await login(email, password);
    setIsLoggingIn(false);

    if (success) {
      navigate("/hadashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-one via-green-two to-green-one flex items-center justify-center p-4">
      <Toaster position="top-center" />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brown-one/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange/10 rounded-full blur-3xl animate-bounce" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-ping" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with Logo */}
          <div className="bg-gradient-to-r from-green-one to-green-two p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-white/80 text-sm mt-1">
              Access the dashboard to manage your website
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-5">
                <label className="block text-text font-semibold mb-2 text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@excellia.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-5">
                <label className="block text-text font-semibold mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Demo Credentials Hint */}
              <div className="mb-5 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-text/60 text-xs text-center">
                  Demo Credentials:
                </p>
                <p className="text-text/60 text-xs text-center mt-1">
                  Email: admin@excellia.com
                </p>
                <p className="text-text/60 text-xs text-center">
                  Password: admin123
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-orange text-white py-2.5 rounded-lg font-semibold hover:scale-105 transition-all hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Login to Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-text/40 text-xs">
                Protected area for administrators only
              </p>
              <div className="flex items-center justify-center gap-1 mt-3">
                <Sparkles className="w-3 h-3 text-green-one" />
                <p className="text-text/30 text-[10px]">
                  EXCELLIA Kindergarten Management System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
