import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Review {
  name: string;
  content: string;
  createdAt: string | Date;
  rating?: number | string;
}

function TestimonialCard({ review }: { review: Review }) {
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const rating =
    typeof review.rating === "string"
      ? parseInt(review.rating)
      : review.rating || 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl p-6 flex flex-col justify-between text-gray-800 max-w-sm mx-auto w-full"
    >
      {/* Top section - avatar and name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-md">
          {review.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{review.name}</h2>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>

      {/* Review content */}
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        “{review.content}”
      </p>

      {/* Rating (if exists) */}
      {rating > 0 && (
        <div className="flex gap-1 mt-auto">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default TestimonialCard;
