"use client";
import SpaceCard from "@/components/dashboard/SpaceCard";
import SpaceForm from "@/components/Forms/SpaceForm";
import SpaceLink from "@/components/Forms/SpaceLink";
import Footer from "@/components/Navbar/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { StoreContext } from "@/context/StoreContext";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Video, Zap, Crown } from 'lucide-react';

function Page() {
  const router = useRouter();
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("StoreContext must be used within a StoreProvider");
  }

  const { link, spaces, addSpace, userId, getSpace, addGpt } = context;
  const [loading, setLoading] = useState(true);
  const [space, setSpace] = useState({
    home: true,
    form: false,
    close: false,
  });

  useEffect(() => {
    async function loadData() {
      await getSpace();
      setLoading(false);
    }
    loadData();
  }, [userId]);

  const handleClick = (e: any) => {
    if (e.target.value === "form") {
      setSpace({ home: false, form: true, close: false });
    } else {
      setSpace({ home: true, form: false, close: false });
    }
  };

  const handleClose = () => {
    setSpace({ home: true, form: false, close: false });
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-[#0e0f11]">
        <Spinner className="h-16 w-16 text-blue-600" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      </div>
    );
  }

  // Space Form
  if (space.form) {
    return (
      <div className="min-h-screen bg-[#0e0f11] text-white">
        <SpaceForm
          handleClick={handleClick}
          setSpace={setSpace}
          addSpace={addSpace}
          userId={userId}
          addGpt={addGpt}
        />
      </div>
    );
  }

  // Space Link View
  if (space.close) {
    return (
      <div className="min-h-screen bg-[#0e0f11] text-white">
        <SpaceLink handleClose={handleClose} link={link} />
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="bg-[#0e0f11] min-h-screen text-white flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 sm:px-8 lg:px-24 xl:px-40 mt-12 mb-12">
        {/* Overview Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's an overview of your testimonials.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Videos Card */}
            <div className="group relative bg-gradient-to-br from-blue-600/20 to-blue-700/10 border border-blue-500/30 hover:border-blue-500/60 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Videos</p>
                  <p className="text-4xl font-bold mt-2">0</p>
                </div>
                <Video className="w-12 h-12 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Credits Card */}
            <div className="group relative bg-gradient-to-br from-green-600/20 to-green-700/10 border border-green-500/30 hover:border-green-500/60 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Video Credits</p>
                  <p className="text-4xl font-bold mt-2">0</p>
                </div>
                <Zap className="w-12 h-12 text-green-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Plan Card */}
            <div className="group relative bg-gradient-to-br from-purple-600/20 to-purple-700/10 border border-purple-500/30 hover:border-purple-500/60 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Current Plan</p>
                  <p className="text-2xl font-bold mt-2">Free Plan</p>
                  <p className="text-xs text-gray-500 mt-1">Upgrade for more features</p>
                </div>
                <Crown className="w-12 h-12 text-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </section>

        {/* Spaces Section */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-1">Your Spaces</h2>
              <p className="text-gray-400 text-sm">{Array.isArray(spaces) && spaces.length > 0 ? `${spaces.length} space${spaces.length !== 1 ? 's' : ''}` : 'No spaces created yet'}</p>
            </div>
            <button
              onClick={handleClick}
              name="form"
              value="form"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              + Create New Space
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
            {Array.isArray(spaces) && spaces.length > 0 ? (
                spaces.map((space, index) => (
                <SpaceCard key={index} header={space} router={router} />
                ))
            ) : (
                <div className="col-span-full text-center py-24 px-8">
                  <div className="mb-4 text-6xl">📝</div>
                  <p className="text-gray-400 text-lg mb-4">No spaces yet</p>
                  <p className="text-gray-500 text-sm mb-6">Create your first testimonial space to get started collecting feedback from your customers.</p>
                  <button
                    onClick={handleClick}
                    name="form"
                    value="form"
                    className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Create Your First Space
                  </button>
                </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Page;
