import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import About from "./pages/About.jsx";
import Registration from "./pages/Registration.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";

import useAuth from "./stores/auth.store.js";

const App = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname === "/hadashboard";

  return (
    <div>
      <ScrollToTop />
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/hadashboard"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
      </Routes>
    </div>
  );
};

export default App;
