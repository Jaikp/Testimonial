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
      <main className="flex-grow px-4 sm:px-8 lg:px-24 xl:px-40 mt-32">
        {/* Overview Section */}
        <section>
          <h1 className="text-4xl font-semibold mb-6">Overview</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#1b1d21] border border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="text-gray-400">Videos</p>
              <p className="text-2xl font-semibold mt-1">0</p>
            </div>
            <div className="bg-[#1b1d21] border border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="text-gray-400">Video Credits</p>
              <p className="text-2xl font-semibold mt-1">0</p>
            </div>
            <div className="bg-[#1b1d21] border border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all">
              <p className="text-gray-400">Plan</p>
              <p className="text-2xl font-semibold mt-1">Free Plan</p>
            </div>
          </div>
        </section>

        {/* Spaces Section */}
        <section className="mt-16">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold">Spaces</h2>
            <button
              onClick={handleClick}
              name="form"
              value="form"
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md"
            >
              + Create New Space
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.isArray(spaces) && spaces.length > 0 ? (
                spaces.map((space, index) => (
                <SpaceCard key={index} header={space} router={router} />
                ))
            ) : (
                <div className="col-span-full text-center py-20 text-gray-400">
                <p>No spaces yet. Want to create one?</p>
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
