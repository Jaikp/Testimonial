"use client";
import { StoreContext } from "@/context/StoreContext";
import React, { useContext, useEffect, useState } from "react";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Navbar/Footer";
import { ClipboardCopyButton } from "@/components/Testimonials/Clipboard";
import { Spinner } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Copy, Layout, List, Moon, Sparkles, TrendingUp, ThumbsUp, ThumbsDown, Tag, AlertCircle } from "lucide-react";

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

  const { getReview, URL, analyzeReviews, generateEmbedTheme } = context;
  const [embed, setEmbed] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [customTheme, setCustomTheme] = useState<any>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatingTheme, setGeneratingTheme] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [analysisError, setAnalysisError] = useState<string>("");
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

  const handleOpenEmbed = (theme: string) => {
    setSelectedTheme(theme);
    setCustomTheme(null);
    setEmbed(true);
  };

  const handleCloseEmbed = () => {
    setEmbed(false);
  };

  const handleGenerateTheme = async () => {
    if (!aiPrompt.trim()) return;
    setGeneratingTheme(true);
    try {
      const themeData = await generateEmbedTheme(aiPrompt);
      setCustomTheme(themeData);
      setSelectedTheme("custom");
      setEmbed(true);
    } catch (error) {
      console.error("Error generating theme:", error);
    } finally {
      setGeneratingTheme(false);
    }
  };

  const handleCustomThemeChange = (key: string, value: string) => {
    setCustomTheme((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAnalyze = async () => {
    if (!reviews || reviews.length === 0) return;
    setAnalyzing(true);
    setAnalysisError("");
    try {
      const result = await analyzeReviews(reviews);
      setAnalysisData(result);
    } catch (err: any) {
      setAnalysisError(err.message || "Failed to analyze reviews.");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-b from-[#0e0f11] to-[#1a1c20]">
        <Spinner className="h-16 w-16 text-blue-600" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      </div>
    );
  }

  return (
    <div className="relative bg-[#0e0f11] min-h-screen text-white">
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
                <p className="text-sm text-gray-400">
                  Space public URL:
                </p>
                <div className="flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2">
                  <a 
                    href={fullurl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline truncate text-sm font-medium"
                  >
                    {fullurl}
                  </a>
                  <button 
                    onClick={() => navigator.clipboard.writeText(fullurl)}
                    className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105">
              Edit Space
            </button>
          </div>

          <div className="h-px bg-gradient-to-r from-gray-800 via-gray-700 to-transparent"></div>
        </div>

        {/* Embeds Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-blue-500" />
            Embeds & Sharing
          </h2>

          {/* AI Magic Generator */}
          <div className="mb-8 bg-gray-900 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Sparkles className="w-32 h-32 text-purple-400" />
            </div>
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-grow w-full">
                  <label className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-2">
                    <Sparkles className="w-4 h-4" />
                    AI Template Generator
                  </label>
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g. A cyberpunk theme with neon green borders and dark background"
                    className="w-full bg-gray-800/80 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerateTheme()}
                  />
                </div>
                <button
                  onClick={handleGenerateTheme}
                  disabled={generatingTheme || !aiPrompt.trim()}
                  className="w-full md:w-auto flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {generatingTheme ? <Spinner className="w-5 h-5" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/> : "Generate Theme"}
                </button>
              </div>

              {/* Manual Theme Editor */}
              {selectedTheme === "custom" && customTheme && (
                <div className="mt-2 pt-6 border-t border-gray-800 animate-fade-in">
                  <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Layout className="w-4 h-4" /> Fine-Tune Theme
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400">Layout</label>
                      <select 
                        value={customTheme.layout || "grid"}
                        onChange={(e) => handleCustomThemeChange("layout", e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-sm text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option value="grid">Grid (Masonry)</option>
                        <option value="list">List</option>
                        <option value="carousel">Carousel</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400">Background</label>
                      <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-2 py-2">
                        <input 
                          type="color" 
                          value={customTheme.backgroundColor || "#000000"}
                          onChange={(e) => handleCustomThemeChange("backgroundColor", e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                        />
                        <span className="text-xs text-gray-300 uppercase truncate">{customTheme.backgroundColor || "#000000"}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400">Card Color</label>
                      <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-2 py-2">
                        <input 
                          type="color" 
                          value={customTheme.cardBackgroundColor || "#000000"}
                          onChange={(e) => handleCustomThemeChange("cardBackgroundColor", e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                        />
                        <span className="text-xs text-gray-300 uppercase truncate">{customTheme.cardBackgroundColor || "#000000"}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400">Text Color</label>
                      <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-2 py-2">
                        <input 
                          type="color" 
                          value={customTheme.textColor || "#ffffff"}
                          onChange={(e) => handleCustomThemeChange("textColor", e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                        />
                        <span className="text-xs text-gray-300 uppercase truncate">{customTheme.textColor || "#ffffff"}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400">Border Color</label>
                      <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-2 py-2">
                        <input 
                          type="color" 
                          value={customTheme.borderColor || "#ffffff"}
                          onChange={(e) => handleCustomThemeChange("borderColor", e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                        />
                        <span className="text-xs text-gray-300 uppercase truncate">{customTheme.borderColor || "#ffffff"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-wider">Or choose a preset template:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Wall of Love */}
            <button
              onClick={() => handleOpenEmbed('default')}
              className="flex flex-col gap-3 items-start border border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-blue-500 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:from-red-500/30 group-hover:to-pink-500/30 transition-colors">
                <Heart className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-left w-full">
                <h3 className="font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">Wall of Love</h3>
                <p className="text-xs text-gray-400 mt-1">Masonry grid layout</p>
              </div>
            </button>

            {/* Carousel */}
            <button
              onClick={() => handleOpenEmbed('carousel')}
              className="flex flex-col gap-3 items-start border border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-blue-500 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors">
                <Layout className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left w-full">
                <h3 className="font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">Carousel</h3>
                <p className="text-xs text-gray-400 mt-1">Horizontal sliding</p>
              </div>
            </button>

            {/* List View */}
            <button
              onClick={() => handleOpenEmbed('list')}
              className="flex flex-col gap-3 items-start border border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-blue-500 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-colors">
                <List className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left w-full">
                <h3 className="font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">List View</h3>
                <p className="text-xs text-gray-400 mt-1">Vertical stack</p>
              </div>
            </button>

            {/* Dark Wall */}
            <button
              onClick={() => handleOpenEmbed('dark')}
              className="flex flex-col gap-3 items-start border border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-blue-500 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600/50 to-gray-800/50 rounded-lg flex items-center justify-center group-hover:from-gray-600/80 group-hover:to-black transition-colors">
                <Moon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left w-full">
                <h3 className="font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">Dark Wall</h3>
                <p className="text-xs text-gray-400 mt-1">Dark theme grid</p>
              </div>
            </button>
          </div>
        </div>

        {/* AI Analytics Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              AI Analytics
            </h2>
            <button
              onClick={handleAnalyze}
              disabled={analyzing || reviews.length === 0}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {analyzing ? <Spinner className="w-4 h-4" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/> : <Sparkles className="w-4 h-4" />}
              {analyzing ? "Analyzing..." : "Analyze Reviews"}
            </button>
          </div>

          {analysisError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <p>{analysisError}</p>
            </div>
          )}

          {analysisData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Summary & Sentiment */}
              <div className="lg:col-span-4 bg-gray-900/50 p-6 rounded-2xl shadow-sm border border-gray-800 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-xl border border-purple-500/20">
                  <TrendingUp className="w-8 h-8 text-purple-400 mb-2" />
                  <span className="text-4xl font-bold text-white">{analysisData.sentimentScore}</span>
                  <span className="text-sm text-gray-400 mt-1 font-medium">Overall Sentiment</span>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-lg font-bold text-gray-200 mb-2">Executive Summary</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {analysisData.summary}
                  </p>
                </div>
              </div>

              {/* Positives */}
              <div className="lg:col-span-2 bg-gray-900/50 p-6 rounded-2xl shadow-sm border border-green-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <ThumbsUp className="w-24 h-24 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5" /> Positive Highlights
                </h3>
                <ul className="space-y-3 relative z-10">
                  {analysisData.positives?.map((pos: string, idx: number) => (
                    <li key={idx} className="flex gap-3 text-gray-300">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>{pos}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Negatives */}
              <div className="lg:col-span-2 bg-gray-900/50 p-6 rounded-2xl shadow-sm border border-orange-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <ThumbsDown className="w-24 h-24 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                  <ThumbsDown className="w-5 h-5" /> Constructive Feedback
                </h3>
                <ul className="space-y-3 relative z-10">
                  {analysisData.negatives?.length > 0 ? (
                    analysisData.negatives.map((neg: string, idx: number) => (
                      <li key={idx} className="flex gap-3 text-gray-300">
                        <span className="text-orange-400 mt-0.5">•</span>
                        <span>{neg}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No significant negative feedback detected.</li>
                  )}
                </ul>
              </div>

              {/* Themes */}
              <div className="lg:col-span-4 bg-gray-900/50 p-6 rounded-2xl shadow-sm border border-gray-800">
                <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-blue-400" /> Key Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisData.themes?.map((theme: string, idx: number) => (
                    <span key={idx} className="bg-blue-900/30 text-blue-300 border border-blue-500/30 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
             <div className="bg-gray-800/30 border border-gray-700 border-dashed rounded-2xl p-10 text-center flex flex-col items-center justify-center">
               <Sparkles className="w-10 h-10 text-gray-600 mb-3" />
               <p className="text-gray-400 font-medium mb-1">No AI Analysis yet</p>
               <p className="text-sm text-gray-500">Click the button above to generate insights from your customer reviews.</p>
             </div>
          )}
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
              <p className="text-gray-400 text-lg mb-2">No reviews yet</p>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={handleCloseEmbed}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-gray-900 border border-gray-800 w-full max-w-5xl rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-white">Embed Template Preview</h2>
                    <p className="text-gray-400 mt-1">Preview how the {selectedTheme} template will look on your site</p>
                  </div>
                  <button
                    onClick={handleCloseEmbed}
                    className="p-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors flex-shrink-0"
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[500px]">
                  {/* Live Preview Column */}
                  <div className="flex flex-col h-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden relative">
                    <div className="bg-gray-200 px-4 py-2 border-b border-gray-300 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium ml-2">Live Preview</span>
                    </div>
                    <div className="flex-grow w-full relative bg-gray-900 rounded-b-xl overflow-hidden">
                      <iframe 
                        src={`/embeds/${params.slug}?theme=${selectedTheme}${selectedTheme === 'custom' && customTheme ? `&customTheme=${encodeURIComponent(JSON.stringify(customTheme))}` : ''}`} 
                        className="absolute inset-0 w-full h-full border-none bg-transparent"
                        title="Embed Preview"
                      />
                    </div>
                  </div>

                  {/* Code and Settings Column */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-semibold mb-4 text-gray-200">Copy Embed Code</h3>
                    {/* Embed Code Copy Section */}
                    <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 mb-6">
                      <p className="text-sm font-semibold text-gray-300 mb-4">Paste this code where you want the reviews to appear:</p>
                      <ClipboardCopyButton spaceId={params.slug} theme={selectedTheme} customTheme={customTheme} />
                    </div>

                    <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                      <p className="text-sm text-blue-300">
                        💡 <span className="font-semibold">Tip:</span> This embed will automatically update whenever you receive new testimonials! The {selectedTheme} theme will be applied.
                      </p>
                    </div>
                  </div>
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
