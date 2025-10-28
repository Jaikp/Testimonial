"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Navbar/Footer";
import { motion } from "framer-motion";
import { Rocket, Layers, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0e0f11] text-white flex flex-col justify-between">

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center mt-32 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent"
          >
            Empower Your Spaces.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gray-400 mt-4 max-w-2xl text-lg"
          >
            Create, organize, and share your testimonial spaces with ease.
            Manage everything in one place — clean, fast, and secure.
          </motion.p>

          <motion.button
            onClick={() => router.push("/dashboard")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-10 bg-blue-600 hover:bg-blue-700 transition-all px-8 py-3 rounded-lg font-medium text-lg shadow-md"
          >
            Get Started →
          </motion.button>
        </section>

        {/* Features Section */}
        <section className="mt-32 grid md:grid-cols-3 gap-8 px-8 lg:px-32 mb-32">
          {[
            {
              icon: <Rocket className="h-8 w-8 text-blue-500" />,
              title: "Fast Setup",
              desc: "Create a new space in seconds and start gathering testimonials instantly.",
            },
            {
              icon: <Layers className="h-8 w-8 text-blue-500" />,
              title: "Organized Dashboard",
              desc: "Keep all your customer feedback and links organized in one clean dashboard.",
            },
            {
              icon: <ShieldCheck className="h-8 w-8 text-blue-500" />,
              title: "Secure & Private",
              desc: "Your data is protected and encrypted to maintain trust and safety.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#1a1c20] rounded-xl p-8 border border-gray-800 hover:border-blue-600 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-blue-700 to-blue-500 py-20 rounded-t-3xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-100 mb-8">
            Create your first testimonial space today — it’s completely free.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Create Your Space
          </button>
        </motion.section>

        <Footer />
      </main>
    </>
  );
}
