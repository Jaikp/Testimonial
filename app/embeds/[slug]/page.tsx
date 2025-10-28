"use client";
import TestimonialCard from "@/components/Testimonials/TestimonialCard";
import { StoreContext } from "@/context/StoreContext";
import { Spinner } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

function Page({ params }: { params: any }) {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("StoreContext must be used within a StoreProvider");
  }

  const { getReview } = context;
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response: any = await getReview(params.slug);
      setReviews(response || []);
      setLoading(false);
    };
    loadData();
  }, [getReview, params.slug]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-b from-white to-gray-100">
        <Spinner className="h-16 w-16 text-blue-700" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          No Testimonials Yet 😔
        </motion.h1>
        <p className="text-gray-600 max-w-md">
          Once customers start sharing their experiences, they’ll appear here as
          beautiful testimonial cards.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-16 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10 text-gray-800"
      >
        ❤️ Wall of Love
      </motion.h1>

      {/* Testimonial Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <TestimonialCard review={review} />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Label (optional for embed) */}
      <div className="text-center mt-16 text-sm text-gray-500">
        Powered by{" "}
        <a
          href="https://yourappdomain.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:underline"
        >
          YourApp
        </a>
      </div>
    </div>
  );
}

export default Page;
