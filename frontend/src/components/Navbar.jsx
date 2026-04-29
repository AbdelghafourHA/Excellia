import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import LangSwitch from "./LangSwitch.jsx";
import logo from "../assets/Logo01.png";

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);

  const navLinks = [
    { path: "/", name: t("nav.home") },
    { path: "/about", name: t("nav.about") },
    { path: "/registration", name: t("nav.registration") },
  ];

  const socialLinks = [
    {
      icon: <FontAwesomeIcon icon={faFacebook} />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <FontAwesomeIcon icon={faInstagram} />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Mail size={18} />,
      href: "mailto:info@excellia.com",
      label: "Email",
    },
  ];

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      color: "#dec099",
      transition: { type: "spring", stiffness: 400 },
    },
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-green-one shadow-lg py-2"
            : "bg-gradient-to-r from-green-one to-green-two py-4"
        }`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-12 sm:w-16"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-white font-cormorant text-lg sm:text-xl font-bold hidden sm:block"
              >
                EXCELLIA
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    to={link.path}
                    className={`relative text-white font-pt-sans font-semibold text-lg transition-colors ${
                      location.pathname === link.path ? "text-brown-one" : ""
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="activeLink"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brown-one rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Side: Language Switcher & Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              <LangSwitch />

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white focus:outline-none relative z-50"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-gradient-to-b from-white to-gray-50 shadow-2xl z-40 md:hidden"
            >
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-10 h-10 object-contain"
                  />
                  <span className="font-cormorant text-xl font-bold text-green-one">
                    EXCELLIA
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col p-6 gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 px-4 text-lg font-semibold transition-all duration-300 border-l-4 ${
                        location.pathname === link.path
                          ? "border-green-one text-green-one bg-green-one/5"
                          : "border-transparent text-gray-700 hover:border-green-one/50 hover:text-green-one hover:bg-green-one/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Menu Footer with Social Links */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
                <div className="text-center mb-4">
                  <p className="text-xs text-gray-500">{t("nav.follow_us")}</p>
                </div>
                <div className="flex justify-center gap-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-500 hover:text-green-one transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <p className="text-[10px] text-gray-400">
                    © 2024 EXCELLIA. {t("nav.all_rights")}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
