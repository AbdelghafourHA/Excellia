import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Image,
  Utensils,
  ShoppingBag,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: "images",
      label: "Gallery Images",
      icon: Image,
      description: "Manage your gallery photos",
    },
    {
      id: "menu",
      label: "Weekly Menu",
      icon: Utensils,
      description: "Edit breakfast menu",
    },
    {
      id: "orders",
      label: "Registrations",
      icon: ShoppingBag,
      description: "View and manage registrations",
    },
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
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-one border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text/60 text-sm">Loading dashboard...</p>
        </div>
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
    <div dir="ltr" className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-green-one">EXCELLIA</h2>
            <p className="text-text/40 text-xs">Admin Panel</p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-text/60" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-green-one text-white shadow-lg shadow-green-one/20"
                    : "text-text/70 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <p
                    className={`font-medium ${
                      isActive ? "text-white" : "text-text"
                    }`}
                  >
                    {tab.label}
                  </p>
                  <p
                    className={`text-xs ${
                      isActive ? "text-white/70" : "text-text/40"
                    }`}
                  >
                    {tab.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <div>
              <p className="font-medium">Logout</p>
              <p className="text-xs text-text/40">Sign out of your account</p>
            </div>
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-text/60" />
              </button>

              {/* Logo */}
              <div className="hidden lg:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-one to-green-two rounded-lg flex items-center justify-center">
                    <LayoutDashboard className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-text">Dashboard</h1>
                    <p className="text-text/40 text-xs">Control Panel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-text">
                  {user?.email || "Admin"}
                </p>
                <p className="text-xs text-text/40">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-one to-green-two rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                {user?.email?.charAt(0).toUpperCase() || "A"}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 bg-white border-r border-gray-100 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <div className="p-4 space-y-2">
            {/* Stats Overview */}
            <div className="mb-6 p-4 bg-gradient-to-br from-green-one/5 to-green-two/5 rounded-xl">
              <p className="text-text/60 text-xs mb-1">Today's Summary</p>
              <p className="text-2xl font-bold text-text">
                {new Date().toLocaleDateString()}
              </p>
              <div className="mt-3 flex gap-3">
                <div>
                  <p className="text-xs text-text/40">Pending</p>
                  <p className="text-lg font-semibold text-yellow-600">—</p>
                </div>
                <div>
                  <p className="text-xs text-text/40">Approved</p>
                  <p className="text-lg font-semibold text-green-600">—</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <p className="text-xs font-semibold text-text/40 px-4 mb-2">
              MAIN MENU
            </p>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-green-one to-green-two text-white shadow-md"
                      : "text-text/70 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{tab.label}</p>
                    <p
                      className={`text-xs ${
                        isActive ? "text-white/70" : "text-text/40"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <div className="flex-1 text-left">
                <p className="font-medium">Logout</p>
                <p className="text-xs text-text/40">End your session</p>
              </div>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h2>
            <p className="text-text/60 text-sm mt-1">
              {tabs.find((tab) => tab.id === activeTab)?.description}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {activeTab === "images" && <ImagesTab />}
            {activeTab === "menu" && <MenuTab />}
            {activeTab === "orders" && <OrdersTab />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
