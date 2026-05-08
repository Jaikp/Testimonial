"use client";
import TestimonialCard from "@/components/Testimonials/TestimonialCard";
import { StoreContext } from "@/context/StoreContext";
import { Spinner } from "@material-tailwind/react";
import React, { useContext, useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

function EmbedContent({ params }: { params: any }) {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("StoreContext must be used within a StoreProvider");
  }

  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "default";
  const customThemeStr = searchParams.get("customTheme");
  
  let customThemeObj: any = null;
  if (customThemeStr) {
    try {
      customThemeObj = JSON.parse(decodeURIComponent(customThemeStr));
    } catch (e) {
      console.error("Failed to parse custom theme");
    }
  }

  const { getReview } = context;
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response: any = await getReview(params.slug);
      
      // Only show favorited reviews in the embed
      const favoritedReviews = response?.filter((review: any) => review.favourite) || [];
      
      setReviews(favoritedReviews);
      setLoading(false);
    };
    loadData();
  }, [getReview, params.slug]);

  if (loading) {
    return (
      <div 
        style={customThemeObj ? { backgroundColor: customThemeObj.backgroundColor } : {}}
        className={`h-screen w-screen flex justify-center items-center ${customThemeObj ? "" : theme === "dark" ? "bg-gray-900" : "bg-gradient-to-b from-white to-gray-100"}`}
      >
        <Spinner className={`h-16 w-16 ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div 
        style={customThemeObj ? { backgroundColor: customThemeObj.backgroundColor, color: customThemeObj.textColor } : {}}
        className={`min-h-screen flex flex-col items-center justify-center text-center px-6 ${customThemeObj ? "" : theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-b from-white to-gray-100 text-gray-800"}`}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4"
        >
          No Testimonials Yet 😔
        </motion.h1>
        <p className={`max-w-md ${customThemeObj ? "" : theme === "dark" ? "text-gray-400" : "text-gray-600"}`} style={customThemeObj ? { opacity: 0.8 } : {}}>
          Once customers start sharing their experiences, they’ll appear here as
          beautiful testimonial cards.
        </p>
      </div>
    );
  }

  const isDark = theme === "dark";
  const activeLayout = customThemeObj ? customThemeObj.layout || "grid" : theme;

  return (
    <div 
      style={customThemeObj ? { backgroundColor: customThemeObj.backgroundColor, color: customThemeObj.textColor } : {}}
      className={`min-h-screen py-16 px-4 md:px-8 lg:px-16 overflow-hidden ${customThemeObj ? "" : isDark ? "bg-gray-900 text-white" : "bg-gradient-to-b from-white to-gray-100 text-gray-800"}`}
    >
      {/* Header */}
      {activeLayout !== "carousel" && activeLayout !== "list" && (
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10"
        >
          ❤️ Wall of Love
        </motion.h1>
      )}

      {/* Render based on layout */}
      {activeLayout === "carousel" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex overflow-x-auto pb-8 pt-4 gap-6 snap-x snap-mandatory scrollbar-hide max-w-7xl mx-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[320px] sm:w-[400px] snap-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <TestimonialCard review={review} theme={customThemeObj ? "custom" : theme} customTheme={customThemeObj} />
            </motion.div>
          ))}
        </motion.div>
      ) : activeLayout === "list" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col gap-8 max-w-3xl mx-auto"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <TestimonialCard review={review} theme={customThemeObj ? "custom" : theme} customTheme={customThemeObj} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Default & Dark Wall Grid (Masonry) */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto space-y-0"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <TestimonialCard review={review} theme={customThemeObj ? "custom" : theme} customTheme={customThemeObj} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Footer Label (optional for embed) */}
      <div className={`text-center mt-16 text-sm ${customThemeObj ? "" : isDark ? "text-gray-500" : "text-gray-500"}`} style={customThemeObj ? { color: customThemeObj.textColor, opacity: 0.6 } : {}}>
        Powered by{" "}
        <a
          href="https://yourappdomain.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`font-medium hover:underline ${customThemeObj ? "" : isDark ? "text-blue-400" : "text-blue-600"}`}
        >
          YourApp
        </a>
      </div>
    </div>
  );
}

function Page({ params }: { params: any }) {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-b from-white to-gray-100">
        <Spinner className="h-16 w-16 text-blue-700" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      </div>
    }>
      <EmbedContent params={params} />
    </Suspense>
  );
}

export default Page;
