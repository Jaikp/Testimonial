"use client";

import React, { useState, useContext } from "react";
import { Rating, Spinner } from "@material-tailwind/react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, Send } from "lucide-react";
import { StoreContext } from "@/context/StoreContext";

interface Review {
  id: string;
  name: string;
  email: string;
  content: string;
  favourite: boolean;
  createdAt: string | Date;
  rating: number | string;
  videoUrl?: string;
}

function ReviewCard({ review }: { review: Review }) {
  const context = useContext(StoreContext);
  const [generatingReply, setGeneratingReply] = useState(false);
  const [replyDraft, setReplyDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFavourite, setIsFavourite] = useState(review.favourite);
  const [isToggling, setIsToggling] = useState(false);

  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleGenerateReply = async () => {
    if (!context) return;
    setGeneratingReply(true);
    try {
      const draft = await context.generateReply(review.name, review.content);
      setReplyDraft(draft);
    } catch (error) {
      console.error("Failed to generate reply", error);
    } finally {
      setGeneratingReply(false);
    }
  };

  const handleCopyReply = () => {
    if (replyDraft) {
      navigator.clipboard.writeText(replyDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendEmail = () => {
    if (replyDraft && review.email) {
      const subject = encodeURIComponent("Regarding your recent review");
      const body = encodeURIComponent(replyDraft);
      window.location.href = `mailto:${review.email}?subject=${subject}&body=${body}`;
    }
  };

  const handleToggleFavourite = async () => {
    if (!context || isToggling) return;
    
    // Optimistic update
    const newFavouriteStatus = !isFavourite;
    setIsFavourite(newFavouriteStatus);
    setIsToggling(true);
    
    try {
      await context.toggleFavourite(review.id, newFavouriteStatus);
    } catch (error) {
      // Revert on failure
      console.error("Failed to toggle favourite", error);
      setIsFavourite(!newFavouriteStatus);
    } finally {
      setIsToggling(false);
    }
  };

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
          onClick={handleToggleFavourite}
          className={`cursor-pointer ${isToggling ? 'opacity-50 pointer-events-none' : ''}`}
          title={isFavourite ? "Marked as favourite" : "Mark as favourite"}
        >
          {isFavourite ? (
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

      {/* AI Reply Generator */}
      <div className="mt-6 pt-6 border-t border-[#3D4147]">
        {!replyDraft ? (
          <button
            onClick={handleGenerateReply}
            disabled={generatingReply}
            className="w-full flex justify-center items-center gap-2 bg-[#2A2D35] hover:bg-[#333741] text-gray-300 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
          >
            {generatingReply ? (
              <Spinner className="w-4 h-4" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            ) : (
              <Sparkles className="w-4 h-4 text-purple-400" />
            )}
            {generatingReply ? "Drafting Reply..." : "AI Draft Reply"}
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-[#2A2D35] rounded-lg p-4 border border-[#3D4147]"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Drafted Reply
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyReply}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                  title="Copy reply"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleSendEmail}
                  className="text-gray-400 hover:text-blue-400 transition-colors p-1"
                  title="Send via Email"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
              {replyDraft}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default ReviewCard;
