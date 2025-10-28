"use client";
import React, { useState } from "react";

function SpaceLink({
  handleClose,
  link,
}: {
  handleClose: any;
  link: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_URL}/testimonials/${link}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0e0f11]/90 backdrop-blur-sm z-50">
      <div className="bg-white w-[90%] max-w-md text-gray-800 rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-32 rounded-xl mb-6 flex items-center justify-center text-white font-semibold text-lg shadow-md">
          ✅ Testimonial Space Created
        </div>

        {/* Message Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Testimonial Added Successfully
          </h1>
          <p className="text-gray-600 text-sm">
            Share this link with your customers to collect testimonials:
          </p>
        </div>

        {/* Link + Copy Section */}
        <div className="border border-gray-300 bg-gray-50 rounded-lg flex items-center justify-between p-3 text-sm font-mono break-all mb-6">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate max-w-[80%]"
          >
            {url}
          </a>
          <button
            onClick={handleCopy}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Copy to clipboard"
          >
            {copied ? "✔️" : "📋"}
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.open(url, "_blank")}
            className="bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            Open Link
          </button>
          <button
            onClick={handleClose}
            className="border border-gray-400 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpaceLink;
