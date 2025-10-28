"use client";

import React from "react";
import { Rating } from "@material-tailwind/react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { motion } from "framer-motion";

interface Review {
  name: string;
  email: string;
  content: string;
  favourite: boolean;
  createdAt: string | Date;
  rating: number | string;
  videoUrl?: string;
}

function ReviewCard({ review }: { review: Review }) {
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-[#1E2024] text-gray-200 pt-8 px-10 mb-6 rounded-xl pb-8 border border-[#33363B] hover:bg-[#2A2C31] shadow-md transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="bg-[#DCEAFE] text-[#2363EB] font-medium rounded-full px-4 py-1 text-sm">
          {review.videoUrl ? "Video" : "Text"}
        </div>

        <motion.div
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer"
          title={review.favourite ? "Marked as favourite" : "Mark as favourite"}
        >
          {review.favourite ? (
            <i className="fi fi-sr-heart text-red-500 text-2xl transition-all" />
          ) : (
            <i className="fi fi-rr-heart text-gray-400 text-2xl hover:text-red-500 transition-all" />
          )}
        </motion.div>
      </div>

      {/* Rating */}
      <div className="mt-4">
        <Rating
          className="mt-1"
          value={Number(review.rating)}
          readonly
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>

      {/* Content or Video */}
      {review.videoUrl && review.videoUrl.trim() !== "" ? (
        <div className="my-6 rounded-lg overflow-hidden border border-[#33363B] shadow-sm">
          <CldVideoPlayer width="1920" height="1080" src={review.videoUrl} />
        </div>
      ) : (
        <p className="my-8 text-gray-300 text-[15px] leading-relaxed italic">
          “{review.content}”
        </p>
      )}

      <hr className="my-6 border-[#3D4147]" />

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
        <div>
          <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">
            Name
          </p>
          <p className="font-semibold text-gray-100">{review.name}</p>
        </div>

        <div>
          <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">
            Email
          </p>
          <p className="font-semibold text-gray-100">{review.email}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-gray-400 uppercase tracking-wide text-xs mb-1">
            Submitted
          </p>
          <p className="text-gray-300">{formattedDate}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default ReviewCard;
