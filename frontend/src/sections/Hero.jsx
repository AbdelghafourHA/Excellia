import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Sparkles,
  BookOpen,
  Star,
  Users,
  Trophy,
  GraduationCap,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-one via-green-two to-green-one overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brown-one/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange/10 rounded-full blur-3xl animate-bounce" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-ping" />
      </div>

      <div className="container-custom relative z-10 min-h-screen flex items-center py-30 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center justify-center lg:justify-between">
            {/* Left Side - Text Content */}
            <motion.div
              variants={itemVariants}
              className={`${
                isRTL ? "lg:text-right" : "lg:text-left"
              } text-center lg:text-left`}
            >
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-brown-one" />
                <span
                  className={`text-white text-xs sm:text-sm font-semibold ${
                    isRTL ? "font-cairo" : ""
                  }`}
                >
                  {t("hero.badge")}
                </span>
              </div>

              {/* Title */}
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                <span className="text-white block">
                  {t("hero.title_line1")}
                </span>
                <span className="text-brown-one block mt-1 sm:mt-2">
                  {t("hero.title_line2")}
                </span>
              </h1>

              {/* Description */}
              <p
                className={`text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("hero.description")}
              </p>

              {/* Two Educational Programs Badges */}
              <div className="flex flex-wrap gap-3 mb-6 justify-center lg:justify-start">
                {/* 100% Montessori Badge */}
                <div className="inline-flex items-center gap-2 bg-brown-one/30 backdrop-blur-sm px-4 py-2 rounded-full border border-brown-one/40">
                  <GraduationCap className="w-4 h-4 text-brown-one" />
                  <span
                    className={`text-white text-sm font-semibold ${
                      isRTL ? "font-cairo" : ""
                    }`}
                  >
                    {t("hero.montessori_100")}
                  </span>
                </div>

                {/* Inspired Montessori Badge */}
                <div className="inline-flex items-center gap-2 bg-orange/30 backdrop-blur-sm px-4 py-2 rounded-full border border-orange/40">
                  <Heart className="w-4 h-4 text-orange" />
                  <span
                    className={`text-white text-sm font-semibold ${
                      isRTL ? "font-cairo" : ""
                    }`}
                  >
                    {t("hero.montessori_inspired")}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10 md:mb-12">
                <Link
                  to="/registration"
                  className={`group inline-flex items-center justify-center gap-2 bg-orange text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-sm sm:text-base hover:scale-105 transition-all hover:shadow-2xl ${
                    isRTL ? "flex-row" : ""
                  }`}
                >
                  <span className={`${isRTL ? "order-2" : "order-1"}`}>
                    {t("hero.register_child")}
                  </span>
                  <ArrowIcon
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      isRTL
                        ? "order-1 group-hover:-translate-x-1"
                        : "order-2 group-hover:translate-x-1"
                    } transition-transform`}
                  />
                </Link>

                <a
                  href="#contact"
                  className={`inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-white/20 transition-all hover:scale-105 ${
                    isRTL ? "flex-row" : ""
                  }`}
                >
                  <span>{t("hero.contact_us")}</span>
                </a>
              </div>

              {/* Stats - replaced numbers with words */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div>
                  <div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-2 mb-1">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-brown-one" />
                    <span className="text-white text-sm sm:text-base md:text-lg font-bold">
                      {t("hero.students")}
                    </span>
                  </div>
                  <p
                    className={`text-white/70 text-[10px] sm:text-xs md:text-sm text-center lg:text-start ${
                      isRTL ? "font-cairo" : ""
                    }`}
                  >
                    {t("hero.students_label")}
                  </p>
                </div>
                <div className="">
                  <div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-2 mb-1">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-brown-one" />
                    <span className="text-white text-sm sm:text-base md:text-lg font-bold">
                      {t("hero.courses")}
                    </span>
                  </div>
                  <p
                    className={`text-white/70 text-[10px] sm:text-xs md:text-sm text-center lg:text-start ${
                      isRTL ? "font-cairo" : ""
                    }`}
                  >
                    {t("hero.courses_label")}
                  </p>
                </div>
                <div className="">
                  <div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-2 mb-1">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-brown-one" />
                    <span className="text-white text-sm sm:text-base md:text-lg font-bold">
                      {t("hero.satisfaction")}
                    </span>
                  </div>
                  <p
                    className={`text-white/70 text-[10px] sm:text-xs md:text-sm text-center lg:text-start ${
                      isRTL ? "font-cairo" : ""
                    }`}
                  >
                    {t("hero.satisfaction_label")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Illustration with Balanced Floating Elements */}
            <motion.div
              variants={itemVariants}
              className=" relative flex justify-center lg:justify-end items-center mt-8 lg:mt-0"
            >
              {/* Main Illustration Container */}
              <div className="relative w-full">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brown-one/20 to-orange/20 rounded-full blur-3xl" />

                {/* Center Book Illustration */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 text-white/80 mx-auto" />
                    <p
                      className={`text-white/60 text-xs sm:text-sm mt-3 sm:mt-4 ${
                        isRTL ? "font-cairo" : ""
                      }`}
                    >
                      {t("hero.illustration_text")}
                    </p>
                  </div>
                </div>

                {/* Floating Element - Top Left / Top Right based on RTL */}
                <div
                  className={`absolute top-0 ${
                    isRTL ? "left-0" : "right-0"
                  } bg-white/10 backdrop-blur-sm rounded-2xl p-2 sm:p-3 shadow-lg`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="w-2 h-2 bg-green-one rounded-full animate-pulse" />
                    <span
                      className={`text-white text-[10px] sm:text-xs whitespace-nowrap ${
                        isRTL ? "font-cairo" : ""
                      }`}
                    >
                      {t("hero.interactive")}
                    </span>
                  </div>
                </div>

                {/* Floating Element - Bottom Right / Bottom Left based on RTL */}
                <div
                  className={`absolute bottom-0 ${
                    isRTL ? "right-0" : "left-0"
                  } bg-white/10 backdrop-blur-sm rounded-2xl p-2 sm:p-3 shadow-lg`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-brown-one" />
                    <span
                      className={`text-white text-[10px] sm:text-xs whitespace-nowrap ${
                        isRTL ? "font-cairo" : ""
                      }`}
                    >
                      {t("hero.rating")}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg
          className="w-full h-10 sm:h-12 md:h-16 text-white"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          fill="currentColor"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
