import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Coffee, Apple, Heart, Sun, Utensils, Clock, Star } from "lucide-react";

const BreakfastMenu = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Weekly menu data - will be replaced with dashboard data later
  const weeklyMenu = [
    {
      day: t("breakfast.sunday"),
      meal: t("breakfast.sunday_meal"),
      icon: Utensils,
      color: "from-red-400 to-red-500",
    },
    {
      day: t("breakfast.monday"),
      meal: t("breakfast.monday_meal"),
      icon: Coffee,
      color: "from-blue-400 to-blue-500",
    },
    {
      day: t("breakfast.tuesday"),
      meal: t("breakfast.tuesday_meal"),
      icon: Star,
      color: "from-orange to-orange/80",
    },
    {
      day: t("breakfast.wednesday"),
      meal: t("breakfast.wednesday_meal"),
      icon: Sun,
      color: "from-green-one to-green-two",
    },
    {
      day: t("breakfast.thursday"),
      meal: t("breakfast.thursday_meal"),
      icon: Apple,
      color: "from-brown-two to-brown-one",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brown-one/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-one/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div
            className={`inline-flex items-center gap-2 bg-green-one/10 px-4 py-2 rounded-full mb-4 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Apple className="w-4 h-4 text-green-one" />
            <span
              className={`text-green-one text-sm font-semibold ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("breakfast.tag")}
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isRTL ? "font-cairo" : ""
            }`}
          >
            <span className="text-text">{t("breakfast.title")}</span>
            <br />
            <span className="text-green-one">
              {t("breakfast.title_highlight")}
            </span>
          </h2>
          <p
            className={`text-text/70 text-sm sm:text-base max-w-2xl mx-auto ${
              isRTL ? "font-cairo" : ""
            }`}
          >
            {t("breakfast.subtitle")}
          </p>
        </motion.div>

        {/* Weekly Menu Grid - Scrollable on Mobile */}
        <div className="overflow-x-auto overflow-y-hidden -mx-4 sm:mx-0">
          <div className="min-w-[600px] sm:min-w-full px-4 sm:px-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Menu Header */}
              <div
                className={`grid grid-cols-5 gap-2 sm:gap-4 bg-orange p-3 sm:p-4 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {weeklyMenu.map((item, index) => (
                  <div key={index} className="text-center">
                    <div>
                      <span
                        className={`text-white font-bold text-xs sm:text-sm md:text-base ${
                          isRTL ? "font-cairo" : ""
                        }`}
                      >
                        {item.day}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Menu Body */}
              <div
                className={`grid grid-cols-5 gap-2 sm:gap-4 p-4 sm:p-6 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {weeklyMenu.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="text-center group"
                  >
                    <div className="relative">
                      <div
                        className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-1 bg-gradient-to-r ${item.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />
                      <p
                        className={`text-text/80 text-[11px] sm:text-sm leading-relaxed mt-2 sm:mt-3 group-hover:text-text transition-colors duration-300 ${
                          isRTL ? "font-cairo" : ""
                        }`}
                      >
                        {item.meal}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Healthy Note Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-green-one/10 to-orange/10 rounded-2xl p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-one/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-one" />
              </div>
              <div className={`${isRTL ? "text-right" : "text-left"}`}>
                <h3
                  className={`font-bold text-text text-sm sm:text-lg mb-1 ${
                    isRTL ? "font-cairo" : ""
                  }`}
                >
                  {t("breakfast.note_title")}
                </h3>
                <p
                  className={`text-text/60 text-xs sm:text-sm ${
                    isRTL ? "font-cairo" : ""
                  }`}
                >
                  {t("breakfast.note_text")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-green-one/20 rounded-full flex items-center justify-center border-2 border-white">
                  <Apple className="w-4 h-4 text-green-one" />
                </div>
                <div className="w-8 h-8 bg-orange/20 rounded-full flex items-center justify-center border-2 border-white">
                  <Coffee className="w-4 h-4 text-orange" />
                </div>
              </div>
              <span
                className={`text-text/70 text-xs sm:text-sm font-medium ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("breakfast.fresh")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BreakfastMenu;
