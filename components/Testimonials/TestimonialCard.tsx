import React from "react";
import { motion } from "framer-motion";
import { Star, Volume2 } from "lucide-react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

interface Review {
  name: string;
  content: string;
  createdAt: string | Date;
  rating?: number | string;
  videoUrl?: string;
}

interface CustomTheme {
  backgroundColor?: string;
  cardBackgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string;
  layout?: string;
}

function TestimonialCard({ review, theme = "default", customTheme }: { review: Review; theme?: string; customTheme?: CustomTheme | null }) {
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const rating =
    typeof review.rating === "string"
      ? parseInt(review.rating)
      : review.rating || 0;

  const isDark = theme === "dark";
  const isCustom = theme === "custom" && customTheme;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={isCustom ? {
        backgroundColor: customTheme.cardBackgroundColor,
        borderColor: customTheme.borderColor,
        color: customTheme.textColor,
        borderRadius: customTheme.borderRadius || "16px",
      } : {}}
      className={`${
        isCustom ? "" : isDark
          ? "bg-gray-800 border-gray-700 shadow-lg text-white"
          : "bg-white border-gray-200 shadow-md hover:shadow-xl text-gray-800"
      } rounded-2xl border overflow-hidden flex flex-col w-full break-inside-avoid mb-6`}
    >
      {/* Video Section (if video exists) */}
      {review.videoUrl && review.videoUrl.trim() !== "" ? (
        <div className="relative w-full bg-black overflow-hidden" style={isCustom && customTheme.borderRadius ? { borderTopLeftRadius: customTheme.borderRadius, borderTopRightRadius: customTheme.borderRadius } : {}}>
          <CldVideoPlayer width="1920" height="1080" src={review.videoUrl} />
        </div>
      ) : null}

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        {/* Top section - avatar and name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-md flex-shrink-0">
            {review.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-grow">
            <h2 className="text-lg font-semibold">{review.name}</h2>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{formattedDate}</p>
            {review.videoUrl && (
              <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                <Volume2 className="w-3 h-3" />
                Video Testimonial
              </div>
            )}
          </div>
        </div>

        {/* Review content (text) */}
        {review.content && (
          <p 
            style={isCustom ? { color: customTheme.textColor } : {}}
            className={`text-sm mb-4 leading-relaxed ${isCustom ? "" : isDark ? "text-gray-200" : "text-gray-700"}`}>
            "{review.content}"
          </p>
        )}

        {/* Video only indicator */}
        {!review.content && review.videoUrl && (
          <p 
            style={isCustom ? { color: customTheme.textColor, opacity: 0.8 } : {}}
            className={`text-sm italic mb-4 ${isCustom ? "" : isDark ? "text-gray-400" : "text-gray-500"}`}>
            💬 Video testimonial - no text provided
          </p>
        )}

        {/* Rating (if exists) */}
        {rating > 0 && (
          <div className="flex gap-1 mt-auto">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < rating ? "text-yellow-400 fill-yellow-400" : isDark ? "text-gray-600" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default TestimonialCard;
