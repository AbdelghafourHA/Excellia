import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=500&fit=crop",
      title: "gallery.img1",
      rotate: -2,
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&h=500&fit=crop",
      title: "gallery.img2",
      rotate: 3,
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&h=500&fit=crop",
      title: "gallery.img3",
      rotate: -1,
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=500&fit=crop",
      title: "gallery.img4",
      rotate: 2,
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=500&h=500&fit=crop",
      title: "gallery.img5",
      rotate: -3,
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=500&fit=crop",
      title: "gallery.img6",
      rotate: 1,
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&h=500&fit=crop",
      title: "gallery.img7",
      rotate: -2,
    },

    {
      id: 8,
      url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&h=500&fit=crop",
      title: "gallery.img8",
      rotate: -1,
    },
  ];

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
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50, rotate: image.rotate }}
              whileInView={{ opacity: 1, y: 0, rotate: image.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              style={{ rotate: `${image.rotate}deg` }}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-0"
            >
              <div className="p-3 pb-5">
                <img
                  src={image.url}
                  alt={t(image.title)}
                  className="w-full aspect-square object-cover rounded-lg"
                  loading="lazy"
                />
                <p
                  className={`text-center mt-3 text-text/80 text-sm font-medium ${
                    isRTL ? "font-cairo" : ""
                  }`}
                >
                  {t(image.title)}
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
