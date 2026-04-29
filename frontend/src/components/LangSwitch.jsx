import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Languages, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LangSwitch = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: "EN", fullName: "English", flag: "🇬🇧" },
    { code: "ar", name: "AR", fullName: "العربية", flag: "🇸🇦" },
    { code: "fr", name: "FR", fullName: "Français", flag: "🇫🇷" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-2 py-1 rounded-full transition-all duration-300 border border-white/20"
      >
        <Languages className="w-3 h-3 text-white" />
        <span className="text-white font-semibold text-[11px] sm:text-sm">
          {currentLanguage?.name}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full -right-5 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden min-w-[120px] sm:min-w-[160px] z-50"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                whileHover={{ backgroundColor: "#f3f4f6" }}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full px-2 sm:px-4 py-1.5 sm:py-3 flex items-center justify-between gap-2 text-left transition-colors ${
                  i18n.language === lang.code
                    ? "bg-green-one/10 text-green-one"
                    : "text-text"
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <span className="text-sm sm:text-xl">{lang.flag}</span>
                  <div>
                    <span
                      className={`text-xs sm:text-base font-medium block ${
                        lang.code === "ar" ? "font-cairo" : ""
                      }`}
                    >
                      {lang.fullName}
                    </span>
                  </div>
                </div>
                {i18n.language === lang.code && (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-one" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LangSwitch;
