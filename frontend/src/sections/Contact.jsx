import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/Logo02.png";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const fullAddress = "Shaoula, Alger";
  const googleMapsLink = `https://maps.app.goo.gl/vStBeJ9SZ1ZDazzY9?g_st=iwb`;

  const contactInfo = [
    {
      icon: Phone,
      title: t("contact.phone"),
      info: "+213 775 79 61 80",
      link: "tel:+213775796180",
    },
    {
      icon: Mail,
      title: t("contact.email"),
      info: "excellia2026@gmail.com",
      link: "excellia2026@gmail.com",
    },
    {
      icon: MapPin,
      title: t("contact.address"),
      info: fullAddress, // Use the precise address
      link: googleMapsLink, // Link to a Google Maps search
    },
  ];

  const socialLinks = [
    {
      icon: <FontAwesomeIcon icon={faFacebook} />,
      href: "https://www.facebook.com/share/r/1APpc879u9/",
      label: "Facebook",
    },
    {
      icon: <FontAwesomeIcon icon={faInstagram} />,
      href: "https://www.instagram.com/eminora.montessori16?igsh=MW9ucHh5NXRlNmtxcQ==",
      label: "Instagram",
    },
    {
      icon: <FontAwesomeIcon icon={faTiktok} />,
      href: "https://www.tiktok.com/@eminoramontessorialger?_r=1&_t=ZS-97VdSqYKym5",
      label: "YouTube",
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
    <section
      id="contact"
      className="relative py-16 sm:py-20 bg-white overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-40 h-40 object-contain" />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className={`text-text/60 text-sm mb-8 ${isRTL ? "font-cairo" : ""}`}
          >
            {t("contact.tagline")}
          </motion.p>

          {/* Contact Info Grid */}
          <motion.div
            dir="ltr"
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8"
          >
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target={info.icon === MapPin ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text/70 hover:text-green-one transition-colors group"
              >
                <info.icon className="w-4 h-4" />
                <span className={`text-sm ${isRTL ? "font-cairo" : ""}`}>
                  {info.info}
                </span>
              </a>
            ))}
          </motion.div>

          {/* Working Hours */}
          <motion.div
            dir="ltr"
            variants={itemVariants}
            className="flex flex-col items-center gap-1 text-text/60 text-sm mb-8"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className={`font-semibold ${isRTL ? "font-cairo" : ""}`}>
                {t("contact.hours_title")}
              </span>
            </div>
            <span className={`text-xs ${isRTL ? "font-cairo" : ""}`}>
              {t("contact.hours")}
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-one hover:text-white transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-gray-100"
          >
            <p className={`text-text/40 text-xs ${isRTL ? "font-cairo" : ""}`}>
              © 2026 EMINORA. {t("contact.copyright")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
