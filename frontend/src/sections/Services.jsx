import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  BookOpen,
  Heart,
  Palette,
  Globe,
  Users,
  Trophy,
  Rocket,
  Smile,
  Brain,
  Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const services = [
    {
      icon: BookOpen,
      title: t("services.montessori_learning"),
      description: t("services.montessori_learning_desc"),
      color: "from-orange to-orange/70",
      bgColor: "bg-orange/10",
    },
    {
      icon: Heart,
      title: t("services.character_building"),
      description: t("services.character_building_desc"),
      color: "from-brown-one to-brown-two",
      bgColor: "bg-brown-one/10",
    },
    {
      icon: Brain,
      title: t("services.sensorial_development"),
      description: t("services.sensorial_development_desc"),
      color: "from-green-two to-green-one",
      bgColor: "bg-green-two/10",
    },
    {
      icon: Globe,
      title: t("services.language_skills"),
      description: t("services.language_skills_desc"),
      color: "from-brown-two to-brown-one",
      bgColor: "bg-brown-two/10",
    },
    {
      icon: Leaf,
      title: t("services.practical_life"),
      description: t("services.practical_life_desc"),
      color: "from-orange to-brown-one",
      bgColor: "bg-orange/10",
    },
    {
      icon: Users,
      title: t("services.individual_attention"),
      description: t("services.individual_attention_desc"),
      color: "from-green-one to-orange",
      bgColor: "bg-green-one/10",
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-one/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-brown-one/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div
            className={`inline-flex items-center gap-2 bg-green-one/10 px-4 py-2 rounded-full mb-4 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Rocket className="w-4 h-4 text-green-one" />
            <span
              className={`text-green-one text-sm font-semibold ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("services.tag")}
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isRTL ? "font-cairo" : ""
            }`}
          >
            <span className="text-text">{t("services.title")}</span>
            <br />
            <span className="text-green-one">
              {t("services.title_highlight")}
            </span>
          </h2>
          <p
            className={`text-text/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${
              isRTL ? "font-cairo" : ""
            }`}
          >
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div
                className={`${service.bgColor} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon
                  className={`w-7 h-7 sm:w-8 sm:h-8 text-green-one`}
                />
              </div>

              {/* Title */}
              <h3
                className={`text-xl sm:text-2xl font-bold mb-3 text-text ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className={`text-text/70 text-sm sm:text-base leading-relaxed ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {service.description}
              </p>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-one to-orange rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Feature Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 sm:mt-20 md:mt-24 bg-gradient-to-r from-green-one to-green-two rounded-2xl p-6 sm:p-8 md:p-10 text-center text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div
              className={`text-center md:text-left ${
                isRTL ? "md:text-right" : ""
              }`}
            >
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <Smile className="w-6 h-6 text-brown-one" />
                <h3
                  className={`text-2xl sm:text-3xl font-bold ${
                    isRTL ? "font-cairo" : ""
                  }`}
                >
                  {t("services.banner_title")}
                </h3>
              </div>
              <p
                className={`text-white/90 text-sm sm:text-base max-w-lg ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("services.banner_text")}
              </p>
            </div>
            <Link
              to="/registration"
              className="bg-orange text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-sm sm:text-base hover:scale-105 transition-all hover:shadow-xl whitespace-nowrap"
            >
              {t("services.banner_btn")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
