import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Registration from "./pages/Registration";
import ScrollToTop from "./components/ScrollToTop";

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
