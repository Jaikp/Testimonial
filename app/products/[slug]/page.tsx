"use client";
import { StoreContext } from "@/context/StoreContext";
import React, { useContext, useEffect, useState } from "react";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Navbar/Footer";
import { ClipboardCopyButton } from "@/components/Testimonials/Clipboard";
import { Spinner } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-blue-700" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      </div>
    );
  }

  return (
    <div className="relative bg-[#F4F6FA] min-h-screen text-black">
      <Navbar />
      <div className="pt-24 px-5 md:px-16 lg:px-28">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Testimonials</h1>
            <p className="text-sm font-light text-gray-600">
              Space public URL :
              <a href={fullurl} className="text-blue-600 underline pl-1">
                {fullurl}
              </a>
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 px-4 rounded-lg shadow-md transition-all">
            Edit Space
          </button>
        </div>

        <hr className="border border-gray-300 mb-10" />

        {/* Embeds Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Embeds</h2>
            <ul className="cursor-pointer">
              <li
                onClick={handleClick}
                className="mb-6 flex gap-3 items-center border border-gray-300 bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <p className="font-medium">Wall of Love</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6 self-start">All Reviews</h2>
          {reviews?.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No reviews yet. Once your customers share testimonials, they will
              appear here!
            </p>
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] md:w-2/4 rounded-xl shadow-2xl p-6 z-50"
            >
              <div className="flex justify-end cursor-pointer" onClick={handleClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-600 hover:text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-3xl text-center font-semibold mb-8">
                Embed a Wall of Love
              </h1>
              <div className="px-4">
                <ClipboardCopyButton spaceId={params.slug} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default Page;
