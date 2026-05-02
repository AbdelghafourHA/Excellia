import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  Users,
  BookOpen,
  Heart,
  Sparkles,
  ChevronRight,
  Star,
  GraduationCap,
} from "lucide-react";
import { toast } from "react-hot-toast";
import useRegistrations from "../stores/registrations.store";
import Contact from "../sections/Contact";

const Registration = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { submitRegistration, loading } = useRegistrations();

  const [formData, setFormData] = useState({
    childName: "",
    parentName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    childAge: "",
    address: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.childName.trim())
      newErrors.childName = t("registration.required");
    if (!formData.parentName.trim())
      newErrors.parentName = t("registration.required");
    if (!formData.email) newErrors.email = t("registration.required");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t("registration.invalid_email");
    if (!formData.phone) newErrors.phone = t("registration.required");
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = t("registration.required");
    if (!formData.childAge) newErrors.childAge = t("registration.required");
    return newErrors;
  };

  // Convert age group to backend format
  const getAgeGroup = (age) => {
    if (age === "3") return "3years";
    if (age === "4") return "4years";
    if (age === "5") return "5years";
    return "3years";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      // Prepare data for backend
      const registrationData = {
        childName: formData.childName.trim(),
        parentName: formData.parentName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        dateOfBirth: formData.dateOfBirth,
        ageGroup: getAgeGroup(formData.childAge),
        address: formData.address.trim(),
        message: formData.message.trim(),
      };

      const result = await submitRegistration(registrationData);

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          childName: "",
          parentName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          childAge: "",
          address: "",
          message: "",
        });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }

      setIsSubmitting(false);
    } else {
      setErrors(newErrors);
      toast.error(t("registration.fix_errors"));
    }
  };

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
      <section className="relative min-h-[40vh] bg-gradient-to-br from-green-one via-green-two to-green-one overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-brown-one/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange/10 rounded-full blur-3xl animate-bounce" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-ping" />
        </div>

        <div className="container-custom relative z-10 min-h-[40vh] flex items-center py-30 md:py-32">
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
                {t("registration.badge")}
              </span>
            </div>
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("registration.title")}
            </h1>
            <p
              className={`text-white/90 text-base sm:text-lg max-w-2xl mx-auto ${
                isRTL ? "font-cairo" : ""
              }`}
            >
              {t("registration.subtitle")}
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

      {/* Registration Form Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-green-one to-green-two rounded-2xl p-6 text-white sticky top-24">
                <div className="text-center mb-6">
                  <Users className="w-16 h-16 mx-auto mb-4 text-brown-one" />
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      isRTL ? "font-cairo" : ""
                    }`}
                  >
                    {t("registration.info_title")}
                  </h3>
                  <p
                    className={`text-white/80 text-sm ${
                      isRTL ? "font-cairo" : ""
                    }`}
                  >
                    {t("registration.info_text")}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brown-one mt-0.5" />
                    <div>
                      <h4
                        className={`font-semibold mb-1 ${
                          isRTL ? "font-cairo" : ""
                        }`}
                      >
                        {t("registration.info1_title")}
                      </h4>
                      <p
                        className={`text-white/70 text-xs ${
                          isRTL ? "font-cairo" : ""
                        }`}
                      >
                        {t("registration.info1_text")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brown-one mt-0.5" />
                    <div>
                      <h4
                        className={`font-semibold mb-1 ${
                          isRTL ? "font-cairo" : ""
                        }`}
                      >
                        {t("registration.info2_title")}
                      </h4>
                      <p
                        className={`text-white/70 text-xs ${
                          isRTL ? "font-cairo" : ""
                        }`}
                      >
                        {t("registration.info2_text")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brown-one mt-0.5" />
                    <div>
                      <h4
                        className={`font-semibold mb-1 ${
                          isRTL ? "font-cairo" : ""
                        }`}
                      >
                        {t("registration.info3_title")}
                      </h4>
                      <p
                        className={`text-white/70 text-xs ${
                          isRTL ? "font-cairo" : ""
                        }`}
                      >
                        {t("registration.info3_text")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-brown-one mx-auto mb-2" />
                    <p className={`text-sm ${isRTL ? "font-cairo" : ""}`}>
                      {t("registration.info_footer")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-20 h-20 text-green-one mx-auto mb-4" />
                    <h3
                      className={`text-2xl font-bold text-text mb-2 ${
                        isRTL ? "font-cairo" : ""
                      }`}
                    >
                      {t("registration.success_title")}
                    </h3>
                    <p className={`text-text/70 ${isRTL ? "font-cairo" : ""}`}>
                      {t("registration.success_text")}
                    </p>
                    <p className="text-text/50 text-sm mt-4">
                      {t("registration.success_wait")}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2
                      className={`text-2xl font-bold text-text mb-6 ${
                        isRTL ? "font-cairo" : ""
                      }`}
                    >
                      {t("registration.form_title")}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5">
                      {/* Child Name */}
                      <div>
                        <label
                          className={`block text-sm font-semibold text-text mb-2 ${
                            isRTL ? "font-cairo text-right" : ""
                          }`}
                        >
                          {t("registration.child_name")}{" "}
                          <span className="text-orange">*</span>
                        </label>
                        <div className="relative">
                          <User
                            className={`absolute top-3 w-4 h-4 text-gray-400 ${
                              isRTL ? "right-3" : "left-3"
                            }`}
                          />
                          <input
                            type="text"
                            name="childName"
                            value={formData.childName}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 border ${
                              errors.childName
                                ? "border-orange"
                                : "border-gray-200"
                            } rounded-lg focus:outline-none focus:border-green-one transition-colors ${
                              isRTL ? "pr-10 font-cairo text-right" : "pl-10"
                            } disabled:bg-gray-50 disabled:cursor-not-allowed`}
                            placeholder={t(
                              "registration.child_name_placeholder"
                            )}
                          />
                        </div>
                        {errors.childName && (
                          <p className="text-orange text-xs mt-1">
                            {errors.childName}
                          </p>
                        )}
                      </div>

                      {/* Parent Name */}
                      <div>
                        <label
                          className={`block text-sm font-semibold text-text mb-2 ${
                            isRTL ? "font-cairo text-right" : ""
                          }`}
                        >
                          {t("registration.parent_name")}{" "}
                          <span className="text-orange">*</span>
                        </label>
                        <div className="relative">
                          <User
                            className={`absolute top-3 w-4 h-4 text-gray-400 ${
                              isRTL ? "right-3" : "left-3"
                            }`}
                          />
                          <input
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 border ${
                              errors.parentName
                                ? "border-orange"
                                : "border-gray-200"
                            } rounded-lg focus:outline-none focus:border-green-one transition-colors ${
                              isRTL ? "pr-10 font-cairo text-right" : "pl-10"
                            } disabled:bg-gray-50 disabled:cursor-not-allowed`}
                            placeholder={t(
                              "registration.parent_name_placeholder"
                            )}
                          />
                        </div>
                        {errors.parentName && (
                          <p className="text-orange text-xs mt-1">
                            {errors.parentName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          className={`block text-sm font-semibold text-text mb-2 ${
                            isRTL ? "font-cairo text-right" : ""
                          }`}
                        >
                          {t("registration.email")}{" "}
                          <span className="text-orange">*</span>
                        </label>
                        <div className="relative">
                          <Mail
                            className={`absolute top-3 w-4 h-4 text-gray-400 ${
                              isRTL ? "right-3" : "left-3"
                            }`}
                          />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 border ${
                              errors.email ? "border-orange" : "border-gray-200"
                            } rounded-lg focus:outline-none focus:border-green-one transition-colors ${
                              isRTL ? "pr-10 font-cairo text-right" : "pl-10"
                            } disabled:bg-gray-50 disabled:cursor-not-allowed`}
                            placeholder={t("registration.email_placeholder")}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-orange text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          className={`block text-sm font-semibold text-text mb-2 ${
                            isRTL ? "font-cairo text-right" : ""
                          }`}
                        >
                          {t("registration.phone")}{" "}
                          <span className="text-orange">*</span>
                        </label>
                        <div className="relative">
                          <Phone
                            className={`absolute top-3 w-4 h-4 text-gray-400 ${
                              isRTL ? "right-3" : "left-3"
                            }`}
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 border ${
                              errors.phone ? "border-orange" : "border-gray-200"
                            } rounded-lg focus:outline-none focus:border-green-one transition-colors ${
                              isRTL ? "pr-10 font-cairo text-right" : "pl-10"
                            } disabled:bg-gray-50 disabled:cursor-not-allowed`}
                            placeholder={t("registration.phone_placeholder")}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-orange text-xs mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label
                          className={`block text-sm font-semibold text-text mb-2 ${
                            isRTL ? "font-cairo text-right" : ""
                          }`}
                        >
                          {t("registration.dob")}{" "}
                          <span className="text-orange">*</span>
                        </label>
                        <div className="relative">
                          <Calendar
                            className={`absolute top-3 w-4 h-4 text-gray-400 ${
                              isRTL ? "right-3" : "left-3"
                            }`}
                          />
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 border ${
                              errors.dateOfBirth
                                ? "border-orange"
                                : "border-gray-200"
                            } rounded-lg focus:outline-none focus:border-green-one transition-colors ${
                              isRTL ? "pr-10 font-cairo" : "pl-10"
                            } disabled:bg-gray-50 disabled:cursor-not-allowed`}
                          />
                        </div>
                        {errors.dateOfBirth && (
                          <p className="text-orange text-xs mt-1">
                            {errors.dateOfBirth}
                          </p>
                        )}
                      </div>

                      {/* Child's Age Group */}
                      <div>
                        <label
                          className={`block text-sm font-semibold text-text mb-2 ${
                            isRTL ? "font-cairo text-right" : ""
                          }`}
                        >
                          {t("registration.child_age")}{" "}
                          <span className="text-orange">*</span>
                        </label>
                        <div className="relative">
                          <Star
                            className={`absolute top-3 w-4 h-4 text-gray-400 ${
                              isRTL ? "right-3" : "left-3"
                            }`}
                          />
                          <select
                            name="childAge"
                            value={formData.childAge}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 border ${
                              errors.childAge
                                ? "border-orange"
                                : "border-gray-200"
                            } rounded-lg focus:outline-none focus:border-green-one transition-colors appearance-none bg-white ${
                              isRTL ? "pr-10 font-cairo" : "pl-10"
                            } disabled:bg-gray-50 disabled:cursor-not-allowed`}
                          >
                            <option value="">
                              {t("registration.select_age")}
                            </option>
                            <option value="3">{t("registration.age_3")}</option>
                            <option value="4">{t("registration.age_4")}</option>
                            <option value="5">{t("registration.age_5")}</option>
                          </select>
                        </div>
                        {errors.childAge && (
                          <p className="text-orange text-xs mt-1">
                            {errors.childAge}
                          </p>
                        )}
                      </div>

                      {/* Address */}
                      <div className="md:col-span-2">
                        <label
                          className={`block text-sm font-semibold text-text mb-2 ${
                            isRTL ? "font-cairo text-right" : ""
                          }`}
                        >
                          {t("registration.address")}
                        </label>
                        <div className="relative">
                          <MapPin
                            className={`absolute top-3 w-4 h-4 text-gray-400 ${
                              isRTL ? "right-3" : "left-3"
                            }`}
                          />
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            rows="3"
                            className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one transition-colors ${
                              isRTL ? "pr-10 font-cairo" : "pl-10"
                            } disabled:bg-gray-50 disabled:cursor-not-allowed`}
                            placeholder={t("registration.address_placeholder")}
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="md:col-span-2">
                        <label
                          className={`block text-sm font-semibold text-text mb-2 ${
                            isRTL ? "font-cairo text-right" : ""
                          }`}
                        >
                          {t("registration.message")}
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-one transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder={t("registration.message_placeholder")}
                        />
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <p
                        className={`text-text/50 text-xs mb-4 flex items-center gap-2 ${
                          isRTL ? "justify-end" : ""
                        }`}
                      >
                        <AlertCircle className="w-3 h-3" />
                        {t("registration.required_fields")}
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer w-full bg-orange text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {t("registration.submitting")}
                          </>
                        ) : (
                          <>
                            <span>{t("registration.submit")}</span>
                            {isRTL ? (
                              <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            ) : (
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            )}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </>
  );
};

export default Registration;
