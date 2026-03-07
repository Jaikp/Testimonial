"use client";
import { StoreContext } from "@/context/StoreContext";
import React, { useContext, useEffect, useState } from "react";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Navbar/Footer";
import { ClipboardCopyButton } from "@/components/Testimonials/Clipboard";
import { Spinner } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Copy } from "lucide-react";

interface Reviews {
  name: string;
  email: string;
  content: string;
  favourite: boolean;
  createdAt: any;
  rating: string;
}

function Page({ params }: { params: any }) {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("StoreContext must be used within a StoreProvider");
  }

  const { getReview, URL } = context;
  const [embed, setEmbed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const fullurl = `${URL}/testimonials/${params.slug}`;

  useEffect(() => {
    const loadData = async () => {
      const response: any = await getReview(params.slug);
      setReviews(response);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = embed ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [embed]);

  const handleClick = () => {
    setEmbed(!embed);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-b from-[#0e0f11] to-[#1a1c20]">
        <Spinner className="h-16 w-16 text-blue-600" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white min-h-screen text-gray-900">
      <Navbar />
      <div className="pt-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Testimonials
              </h1>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600">
                  Space public URL:
                </p>
                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2">
                  <a 
                    href={fullurl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline truncate text-sm font-medium"
                  >
                    {fullurl}
                  </a>
                  <button 
                    onClick={() => navigator.clipboard.writeText(fullurl)}
                    className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105">
              Edit Space
            </button>
          </div>

          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-transparent"></div>
        </div>

        {/* Embeds Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-blue-600" />
            Embeds & Sharing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleClick}
              className="flex gap-4 items-start border border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-300 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:from-red-200 group-hover:to-pink-200 transition-colors">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Wall of Love</h3>
                <p className="text-sm text-gray-600 mt-1">Display testimonials in an elegant wall format</p>
              </div>
              <div className="ml-auto text-gray-400 group-hover:text-blue-600 transition-colors">
                →
              </div>
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">All Reviews</h2>
              <p className="text-gray-600 mt-2">
                {reviews.length} {reviews.length === 1 ? 'testimonial' : 'testimonials'} received
              </p>
            </div>
          </div>

          {reviews?.length === 0 ? (
            <div className="text-center py-20 px-8">
              <div className="mb-4 text-6xl">💬</div>
              <p className="text-gray-600 text-lg mb-2">No reviews yet</p>
              <p className="text-gray-500">
                Once your customers share testimonials, they will appear here!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Embed Modal */}
      <AnimatePresence>
        {embed && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={handleClick}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-gray-900">Embed a Wall of Love</h2>
                    <p className="text-gray-600 mt-2">Add your testimonials to your website in seconds</p>
                  </div>
                  <button
                    onClick={handleClick}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Embed Code Copy Section */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-4">Copy and paste this code on your website:</p>
                  <ClipboardCopyButton spaceId={params.slug} />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    💡 <span className="font-semibold">Tip:</span> This embed will automatically update whenever you receive new testimonials!
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default Page;
