import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auditFormSchema, type AuditFormData } from "../lib/validation";
import { auditService } from "../services/auditService";
import {
  Loader2,
  Check,
  AlertCircle,
  Globe,
  Building,
  Mail,
  Phone,
  Target,
} from "lucide-react";

const WebsiteAuditForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: AuditFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await auditService.submitAuditRequest(data);
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants with proper TypeScript types
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const buttonVariants: Variants = {
    idle: { scale: 1 },
    loading: { scale: 0.95 },
    tap: { scale: 0.9 },
  };

  const floatingIcons = [
    { icon: "🚀", style: "top-10 left-10 animate-float" },
    { icon: "🔍", style: "top-20 right-10 animate-float delay-1000" },
    { icon: "📊", style: "bottom-20 left-20 animate-float delay-2000" },
    { icon: "⚡", style: "bottom-10 right-20 animate-float delay-1500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Background Elements */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute text-4xl opacity-10 ${item.style}`}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 2, delay: index * 0.5 }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" as const, stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg"
          >
            <Globe className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Website Audit
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
            Get a comprehensive analysis of your website's performance and SEO
            health in minutes
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Name Field */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="businessName"
                className="block text-left font-bold text-gray-900 mb-3"
              >
                <Building className="w-4 h-4 inline mr-2" />
                Business Name *
              </label>
              <div className="relative">
                <input
                  {...register("businessName")}
                  type="text"
                  id="businessName"
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg ${
                    errors.businessName
                      ? "border-red-300 bg-red-50/50 ring-2 ring-red-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="Enter your business name"
                />
                <AnimatePresence>
                  {errors.businessName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 text-sm mt-2 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.businessName.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-left font-bold text-gray-900 mb-3"
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg ${
                    errors.email
                      ? "border-red-300 bg-red-50/50 ring-2 ring-red-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 text-sm mt-2 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Website URL Field */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="websiteUrl"
                className="block text-left font-bold text-gray-900 mb-3"
              >
                <Globe className="w-4 h-4 inline mr-2" />
                Website URL *
              </label>
              <div className="relative">
                {/* <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">https://</span>
                </div> */}
                <input
                  {...register("websiteUrl")}
                  type="text"
                  id="websiteUrl"
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg ${
                    errors.websiteUrl
                      ? "border-red-300 bg-red-50/50 ring-2 ring-red-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="https://yourwebsite.com"
                />
                <AnimatePresence>
                  {errors.websiteUrl && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 text-sm mt-2 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.websiteUrl.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Phone Field */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="phone"
                className="block text-left font-bold text-gray-900 mb-3"
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                {...register("phone")}
                type="tel"
                id="phone"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg hover:border-gray-300"
                placeholder="+91 7890066480"
              />
            </motion.div>

            {/* Goals Field */}
            {/* Goals Field */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="goals"
                className="block text-left font-bold text-gray-900 mb-3"
              >
                <Target className="w-5 h-5 inline mr-2" />
                What are your main goals?
              </label>
              <div className="relative">
                <select
                  {...register("goals")}
                  id="goals"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg hover:border-gray-300 bg-white appearance-none cursor-pointer pr-12 bg-[length:1.5rem_1.5rem] bg-[right_1rem_center] bg-no-repeat"
                  // style={{
                  //   backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`
                  // }}
                >
                  <option value="" className="text-gray-400 py-2">
                    Select your primary goal
                  </option>
                  <option
                    value="seo"
                    className="text-gray-900 py-2 hover:bg-blue-50"
                  >
                    Improve SEO rankings
                  </option>
                  <option
                    value="speed"
                    className="text-gray-900 py-2 hover:bg-blue-50"
                  >
                    Increase website speed
                  </option>
                  <option
                    value="conversion"
                    className="text-gray-900 py-2 hover:bg-blue-50"
                  >
                    Boost conversions
                  </option>
                  <option
                    value="mobile"
                    className="text-gray-900 py-2 hover:bg-blue-50"
                  >
                    Improve mobile experience
                  </option>
                  <option
                    value="general"
                    className="text-gray-900 py-2 hover:bg-blue-50"
                  >
                    General performance audit
                  </option>
                </select>

                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg
                    className="w-5 h-5"
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
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-6">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                variants={buttonVariants}
                initial="idle"
                animate={isSubmitting ? "loading" : "idle"}
                whileHover={isSubmitting ? undefined : { scale: 1.02 }}
                whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing Your Audit...
                    </>
                  ) : (
                    <>
                      Get Free Website Audit
                      <span className="ml-2">→</span>
                    </>
                  )}
                </div>

                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.button>
            </motion.div>
          </form>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mt-6 p-6 bg-green-50 border border-green-200 rounded-2xl"
              >
                <div className="flex items-start">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="text-green-800 font-semibold text-lg">
                      Audit Request Received!
                    </h3>
                    <p className="text-green-700 mt-1">
                      We're analyzing your website. You'll receive your
                      comprehensive audit report via email shortly.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mt-6 p-6 bg-red-50 border border-red-200 rounded-2xl"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-red-800 font-semibold text-lg">
                      Something went wrong
                    </h3>
                    <p className="text-red-700 mt-1">
                      Please try again in a few moments. If the problem
                      persists, contact our support team.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Privacy Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-500 text-sm mt-6"
          >
            We respect your privacy. Your information is secure and will never
            be shared with third parties.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {[
            {
              icon: "🚀",
              title: "Performance Audit",
              desc: "Core Web Vitals & Speed Analysis",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: "🔍",
              title: "SEO Health Check",
              desc: "On-page SEO & Technical Issues",
              color: "from-green-500 to-green-600",
            },
            {
              icon: "📱",
              title: "Mobile Optimization",
              desc: "Mobile-first Performance Review",
              color: "from-purple-500 to-purple-600",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white text-xl mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WebsiteAuditForm;
