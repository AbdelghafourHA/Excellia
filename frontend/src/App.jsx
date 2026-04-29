import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import About from "./pages/About.jsx";
import Registration from "./pages/Registration.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const App = () => {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/hadashboard" element={<h1>Dashboard</h1>} />
      </Routes>
    </div>
  );
};

export default App;
