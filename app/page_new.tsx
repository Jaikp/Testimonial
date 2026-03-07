"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Navbar/Footer";
import { motion } from "framer-motion";
import { Rocket, Layers, ShieldCheck, Star, ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  const router = useRouter();

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#0e0f11] via-[#1a1c20] to-[#0e0f11] text-white flex flex-col justify-between overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center mt-20 px-4 sm:px-6 py-20 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-block"
          >
            <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-sm font-medium text-blue-400">
              ✨ Welcome to Endorser
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 bg-clip-text text-transparent mb-6 leading-tight"
          >
            Empower Your Spaces
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed"
          >
            Collect, organize, and showcase customer testimonials effortlessly. 
            Create beautiful testimonial spaces in seconds. No coding required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 z-20"
          >
            <button
              onClick={() => router.push("/dashboard")}
              className="group px-8 sm:px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => router.push("/signin")}
              className="px-8 sm:px-10 py-4 bg-gray-800/50 border border-gray-700 hover:border-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-gray-800/80"
            >
              Sign In
            </button>
          </motion.div>

          {/* Trust Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              No credit card required
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Free forever plan
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Deploy in seconds
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-8 lg:px-16 xl:px-32 mb-32 z-10"
        >
          {[
            {
              icon: <Rocket className="h-8 w-8" />,
              title: "Fast Setup",
              desc: "Create a new space in seconds and start gathering testimonials instantly without any technical knowledge.",
              color: "from-blue-600/20 to-blue-700/10",
              iconColor: "text-blue-500",
            },
            {
              icon: <Layers className="h-8 w-8" />,
              title: "Organized Dashboard",
              desc: "Keep all your customer feedback organized in one beautiful, intuitive dashboard for easy management.",
              color: "from-purple-600/20 to-purple-700/10",
              iconColor: "text-purple-500",
            },
            {
              icon: <ShieldCheck className="h-8 w-8" />,
              title: "Secure & Private",
              desc: "Your data is fully encrypted and protected with enterprise-grade security standards.",
              color: "from-green-600/20 to-green-700/10",
              iconColor: "text-green-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative bg-gradient-to-br ${feature.color} border border-gray-700 hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/5 transition-all duration-300"></div>
              <div className="relative">
                <div className={`inline-block p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 ${feature.iconColor}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative px-4 sm:px-8 lg:px-16 xl:px-32 mb-32 z-10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { number: "10K+", label: "Testimonials Collected" },
              { number: "500+", label: "Happy Customers" },
              { number: "99.9%", label: "Uptime Guaranteed" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-blue-500/30 transition-all"
              >
                <p className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">{stat.number}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mx-4 sm:mx-8 lg:mx-16 xl:mx-32 mb-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl shadow-blue-500/30 z-10"
        >
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Create your first testimonial space today — it's completely free and takes less than a minute.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/dashboard")}
              className="px-8 sm:px-12 py-4 bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto"
            >
              Create Your Space
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.section>

        <Footer />
      </main>
    </>
  );
}
