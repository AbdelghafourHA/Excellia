import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import useImages from "../stores/images.store";

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const currentLang = i18n.language;
  const { images, fetchImages, loading } = useImages();

  useEffect(() => {
    fetchImages();
  }, []);

  // Get the title in the current language
  const getTitle = (image) => {
    if (!image.title) return t("gallery.untitled");

    if (currentLang === "ar" && image.title.ar) {
      return image.title.ar;
    }
    if (currentLang === "fr" && image.title.fr) {
      return image.title.fr;
    }
    // Default to English
    return image.title.en || t("gallery.untitled");
  };

  if (loading) {
    return (
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-green-one border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div
              className={`inline-flex items-center gap-2 bg-green-one/10 px-4 py-2 rounded-full mb-4 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <Camera className="w-4 h-4 text-green-one" />
              <span
                className={`text-green-one text-sm font-semibold ${
                  isRTL ? "font-cairo" : ""
                }`}
              >
                {t("gallery.tag")}
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              <span className="text-text">{t("gallery.title")}</span>
              <br />
              <span className="text-green-one">
                {t("gallery.title_highlight")}
              </span>
            </h2>
            <p className="text-text/70 text-sm sm:text-base">
              {t("gallery.no_images")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Random rotation for polaroid effect
  const getRandomRotation = (index) => {
    const rotations = [-2, -1, 0, 1, 2, 3];
    return rotations[index % rotations.length];
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
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
            <Camera className="w-4 h-4 text-green-one" />
            <span
              className={`text-green-one text-sm font-semibold ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("gallery.tag")}
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isRTL ? "font-cairo" : ""
            }`}
          >
            <span className="text-text">{t("gallery.title")}</span>
            <br />
            <span className="text-green-one">
              {t("gallery.title_highlight")}
            </span>
          </h2>
          <p
            className={`text-text/70 text-sm sm:text-base max-w-2xl mx-auto ${
              isRTL ? "font-cairo" : ""
            }`}
          >
            {t("gallery.subtitle")}
          </p>
        </motion.div>

        {/* Polaroid-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {images.map((image, index) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, y: 50, rotate: getRandomRotation(index) }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: getRandomRotation(index),
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              style={{ rotate: `${getRandomRotation(index)}deg` }}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-0"
            >
              <div className="p-3 pb-5">
                <img
                  src={image.url}
                  alt={getTitle(image)}
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />
                <p
                  className={`text-center mt-3 text-text/80 text-sm font-medium ${
                    isRTL ? "font-cairo" : ""
                  }`}
                >
                  {getTitle(image)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
