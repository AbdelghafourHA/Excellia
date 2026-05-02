import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Utensils, ShoppingBag, LogOut } from "lucide-react";
import { Toaster } from "react-hot-toast";
import useAuth from "../stores/auth.store";
import Login from "../pages/Login.jsx";
import ImagesTab from "../components/ImagesTab";
import MenuTab from "../components/MenuTab";
import OrdersTab from "../components/OrdersTab";

const Dashboard = () => {
  const navigate = useNavigate();
  const { checkAuth, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("images");

  const tabs = [
    { id: "images", label: "Gallery Images", icon: Image },
    { id: "menu", label: "Weekly Menu", icon: Utensils },
    { id: "orders", label: "Registration Orders", icon: ShoppingBag },
  ];

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    initAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-one border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const handleLogout = async () => {
    const { logout } = useAuth.getState();
    await logout();
    navigate("/hadashboard");
  };

  const { user } = useAuth.getState();

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white"
    >
      <Toaster position="top-center" />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-text">Admin Dashboard</h1>
              <p className="text-text/60 text-sm">
                Welcome back, {user?.email || "Admin"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-text/70 hover:bg-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container-custom">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-green-one border-b-2 border-green-one"
                      : "text-text/60 hover:text-text"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        {activeTab === "images" && <ImagesTab />}
        {activeTab === "menu" && <MenuTab />}
        {activeTab === "orders" && <OrdersTab />}
      </div>
    </div>
  );
};

export default Dashboard;
