import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Play,
  Heart,
  Target,
  Users,
  Award,
  BookOpen,
  ChevronRight,
  Sparkles,
  Camera,
  GraduationCap,
  Brain,
  Leaf,
  Smile,
  Compass,
  Palette,
  Globe,
  CheckCircle,
  Star,
  Shield,
} from "lucide-react";
import Contact from "../sections/Contact";
import { Link } from "react-router-dom";

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const values = [
    {
      icon: Heart,
      title: t("about.value1_title"),
      description: t("about.value1_desc"),
    },
    {
      icon: Target,
      title: t("about.value2_title"),
      description: t("about.value2_desc"),
    },
    {
      icon: Users,
      title: t("about.value3_title"),
      description: t("about.value3_desc"),
    },
  ];

  const curriculumItems = [
    { icon: Leaf, name: t("about.curriculum_practical") },
    { icon: Brain, name: t("about.curriculum_sensorial") },
    { icon: BookOpen, name: t("about.curriculum_language") },
    { icon: GraduationCap, name: t("about.curriculum_math") },
    { icon: Compass, name: t("about.curriculum_science") },
    { icon: Smile, name: t("about.curriculum_social") },
    { icon: Heart, name: t("about.curriculum_physical") },
    { icon: Palette, name: t("about.curriculum_art") },
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
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] bg-gradient-to-br from-green-one via-green-two to-green-one overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-brown-one/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange/10 rounded-full blur-3xl animate-bounce" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-ping" />
        </div>

        <div className="container-custom relative z-10 min-h-[50vh] flex items-center py-30 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center w-full"
          >
            <div
              className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <Sparkles className="w-4 h-4 text-brown-one" />
              <span
                className={`text-white text-sm font-semibold ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("about.badge")}
              </span>
            </div>
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("about.title")}
            </h1>
            <p
              className={`text-white/90 text-base sm:text-lg max-w-2xl mx-auto ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("about.subtitle")}
            </p>
          </motion.div>
        </div>

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

      {/* Our Story Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
        <div className="container-custom">
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
              <BookOpen className="w-4 h-4 text-green-one" />
              <span
                className={`text-green-one text-sm font-semibold ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("about.story_tag")}
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              <span className="text-text">{t("about.story_title")}</span>
              <br />
              <span className="text-green-one">
                {t("about.story_title_highlight")}
              </span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className={`text-text/70 text-base leading-relaxed mb-4 ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("about.story_text1")}
              </p>
              <p
                className={`text-text/70 text-base leading-relaxed mb-4 ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("about.story_text2")}
              </p>
              <p
                className={`text-text/70 text-base leading-relaxed ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("about.story_text3")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Two Educational Systems Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container-custom">
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
              <GraduationCap className="w-4 h-4 text-green-one" />
              <span
                className={`text-green-one text-sm font-semibold ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("about.systems_tag")}
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              <span className="text-text">{t("about.systems_title")}</span>
              <br />
              <span className="text-green-one">
                {t("about.systems_title_highlight")}
              </span>
            </h2>
            <p
              className={`text-text/70 text-base max-w-3xl mx-auto ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("about.systems_subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 100% Montessori */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-brown-one"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brown-one/10 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-brown-one" />
                </div>
                <h3
                  className={`text-2xl font-bold text-brown-one ${
                    isRTL ? "font-cairo" : ""
                  }`}
                >
                  {t("about.system_montessori_100")}
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brown-one flex-shrink-0 mt-1" />
                  <span className={`text-text/70 ${isRTL ? "font-cairo" : ""}`}>
                    {t("about.montessori_100_point1")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brown-one flex-shrink-0 mt-1" />
                  <span className={`text-text/70 ${isRTL ? "font-cairo" : ""}`}>
                    {t("about.montessori_100_point2")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brown-one flex-shrink-0 mt-1" />
                  <span className={`text-text/70 ${isRTL ? "font-cairo" : ""}`}>
                    {t("about.montessori_100_point3")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brown-one flex-shrink-0 mt-1" />
                  <span className={`text-text/70 ${isRTL ? "font-cairo" : ""}`}>
                    {t("about.montessori_100_point4")}
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Montessori-Inspired */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-orange"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-orange" />
                </div>
                <h3
                  className={`text-2xl font-bold text-orange ${
                    isRTL ? "font-cairo" : ""
                  }`}
                >
                  {t("about.system_montessori_inspired")}
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-1" />
                  <span className={`text-text/70 ${isRTL ? "font-cairo" : ""}`}>
                    {t("about.montessori_inspired_point1")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-1" />
                  <span className={`text-text/70 ${isRTL ? "font-cairo" : ""}`}>
                    {t("about.montessori_inspired_point2")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-1" />
                  <span className={`text-text/70 ${isRTL ? "font-cairo" : ""}`}>
                    {t("about.montessori_inspired_point3")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange flex-shrink-0 mt-1" />
                  <span className={`text-text/70 ${isRTL ? "font-cairo" : ""}`}>
                    {t("about.montessori_inspired_point4")}
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Common Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-green-one to-green-two rounded-2xl p-8 text-white"
          >
            <h3
              className={`text-2xl font-bold mb-4 text-center ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("about.common_features")}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                <Globe className="w-5 h-5 text-brown-one flex-shrink-0" />
                <span className={`text-sm ${isRTL ? "font-cairo" : ""}`}>
                  {t("about.common_languages")}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                <Heart className="w-5 h-5 text-brown-one flex-shrink-0" />
                <span className={`text-sm ${isRTL ? "font-cairo" : ""}`}>
                  {t("about.common_psychological")}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                <Shield className="w-5 h-5 text-brown-one flex-shrink-0" />
                <span className={`text-sm ${isRTL ? "font-cairo" : ""}`}>
                  {t("about.common_safe")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container-custom">
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
              <Globe className="w-4 h-4 text-green-one" />
              <span
                className={`text-green-one text-sm font-semibold ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("about.curriculum_tag")}
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              <span className="text-text">{t("about.curriculum_title")}</span>
              <br />
              <span className="text-green-one">
                {t("about.curriculum_title_highlight")}
              </span>
            </h2>
            <p
              className={`text-text/70 text-base max-w-3xl mx-auto ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("about.curriculum_subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 sm:grid-cols-2 gap-6"
          >
            {curriculumItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="w-16 h-16 bg-green-one/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-one/20 transition-colors">
                  <item.icon className="w-8 h-8 text-green-one" />
                </div>
                <h3
                  className={`text-lg font-bold mb-2 text-text ${
                    isRTL ? "font-cairo" : ""
                  }`}
                >
                  {item.name}
                </h3>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-one to-orange rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-one to-green-two rounded-2xl p-8 text-white shadow-xl"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3
                className={`text-2xl font-bold mb-3 ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("about.mission_title")}
              </h3>
              <p
                className={`text-white/90 leading-relaxed ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("about.mission_text")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-orange to-orange/80 rounded-2xl p-8 text-white shadow-xl"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3
                className={`text-2xl font-bold mb-3 ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("about.vision_title")}
              </h3>
              <p
                className={`text-white/90 leading-relaxed ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("about.vision_text")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-green-one via-green-two to-green-one overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-brown-one/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-orange/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("about.cta_title")}
            </h2>
            <p
              className={`text-white/90 text-base mb-8 max-w-2xl mx-auto ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("about.cta_text")}
            </p>
            <Link
              to="/registration"
              className="cursor-pointer inline-flex items-center gap-2 bg-orange text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all hover:shadow-xl"
            >
              <span>{t("about.cta_btn")}</span>
              {isRTL ? (
                <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
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

      {/* Contact Section */}
      <Contact />
    </>
  );
};

export default About;
