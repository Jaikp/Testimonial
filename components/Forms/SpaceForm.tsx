"use client";
import React, { useState } from "react";
import { X, Sparkles, Video, MessageSquare, Eye, Settings, Plus, Trash2, AlertCircle } from "lucide-react";

function SpaceForm({
  handleClick,
  setSpace,
  addSpace,
  userId,
  addGpt,
}: {
  handleClick: any;
  setSpace: any;
  addSpace: any;
  userId: any;
  addGpt: any;
}) {
  interface Form {
    userId: any;
    name: string;
    header: string;
    message: string;
    Question: any[];
  }

  const [GPT, setGPT] = useState("");
  const [loader, setLoader] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Form>({
    userId: userId,
    name: "",
    header: "",
    message: "",
    Question: [
      { id: 1, question: "Who are you / what are you working on?" },
      { id: 2, question: "How has [our product / service] helped you?" },
      { id: 3, question: "What is the best thing about [our product / service]?" },
    ],
  });

  const addQuestion = () => {
    setForm((prevForm) => ({
      ...prevForm,
      Question: [
        ...prevForm.Question,
        { id: Date.now(), question: "New question..." },
      ],
    }));
  };

  const handleQuestionChange = (id: number, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      Question: prevForm.Question.map((q) =>
        q.id === id ? { ...q, question: value } : q
      ),
    }));
  };

  const deleteQuestion = (id: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      Question: prevForm.Question.filter((q) => q.id !== id),
    }));
  };

  // Debug: Log whenever questions change
  React.useEffect(() => {
    console.log("Form questions updated:", form.Question);
  }, [form.Question]);

  const handleGPT = async () => {
    if (!GPT.trim()) {
      setError("Please enter a product or business description");
      return;
    }
    setError("");
    setLoader(true);
    try {
      const data = await addGpt(GPT);
      console.log("===== AI Generation Response =====");
      console.log("Complete data received:", data);
      console.log("Name:", data.name);
      console.log("Header:", data.header);
      console.log("Message:", data.message);
      console.log("Questions array:", data.questions);
      console.log("Questions length:", data.questions?.length);
      
      // Ensure questions is an array
      const questionsArray = Array.isArray(data.questions) ? data.questions : [];
      console.log("Processed questions array:", questionsArray);
      
      const newForm = {
        userId: userId,
        name: data.name || "",
        header: data.header || "",
        message: data.message || "",
        Question: questionsArray,
      };
      
      console.log("Setting new form state:", newForm);
      setForm(newForm);
      console.log("=====================================");
      setGPT("");
    } catch (err: any) {
      setError(err.message || "Failed to generate space. Please try again.");
      console.error("Generate error:", err);
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setUploading(true);
    await addSpace(form);
    setSpace({ home: false, form: false, close: true });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Create New Space</h1>
          <button
            onClick={handleClick}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          
          {/* Left Side - Preview */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-2 text-gray-700 font-semibold">
              <Eye className="w-5 h-5 text-blue-600" />
              Live Preview
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl p-8 flex flex-col flex-grow shadow-inner">
              <div className="flex-grow">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
                  {form.header || "Header goes here..."}
                </h1>
                <p className="text-center text-gray-700 text-lg mb-8 leading-relaxed">
                  {form.message || "Your custom message goes here..."}
                </p>

                <div className="my-8 p-6 bg-white rounded-xl border border-blue-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Questions
                  </h2>
                  <div className="space-y-3">
                    {form.Question?.map((q, idx) => (
                      <div key={q.id} className="flex gap-3">
                        <span className="text-blue-600 font-bold flex-shrink-0">{idx + 1}.</span>
                        <p className="text-gray-700">{q.question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-auto">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                  <Video className="w-5 h-5" />
                  Record a Video
                </button>
                <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send in Text
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="border border-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-100 transition flex items-center justify-center gap-1 text-sm">
                  <Sparkles className="w-4 h-4" />
                  Thank You
                </button>
                <button className="border border-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-100 transition flex items-center justify-center gap-1 text-sm">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex flex-col">
            <div className="text-center mb-8">
              <p className="text-gray-600 text-sm">
                Build your testimonial space in minutes. No technical knowledge required.
              </p>
            </div>

            <form className="space-y-6 flex-grow">
              {/* AI Section */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                <div className="flex items-center gap-2 mb-4 text-blue-900 font-semibold">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  AI Space Creator
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Describe your product or business, and let AI generate your space content.
                </p>
                <div className="flex gap-2 mb-3">
                  <input
                    onChange={(e) => {
                      setGPT(e.target.value);
                      setError("");
                    }}
                    name="GPT"
                    value={GPT}
                    placeholder="e.g., SaaS project management tool..."
                    className="border border-gray-300 rounded-lg w-full px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loader}
                  />
                  <button
                    onClick={handleGPT}
                    disabled={loader}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-blue-400 disabled:to-blue-400 text-white px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap"
                  >
                    {loader ? "Processing..." : "Generate"}
                  </button>
                </div>
                {error && (
                  <div className="flex gap-2 items-start p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
              </div>

              {/* Form Inputs */}
              <div>
                <label className="block text-gray-900 mb-2 font-semibold text-sm">
                  Space Name
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  value={form.name}
                  placeholder="e.g., Customer Feedback 2024"
                  className="border border-gray-300 w-full rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-900 mb-2 font-semibold text-sm">
                  Welcome Header
                </label>
                <input
                  onChange={handleChange}
                  name="header"
                  value={form.header}
                  placeholder="Share Your Feedback"
                  className="border border-gray-300 w-full rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-900 mb-2 font-semibold text-sm">
                  Welcome Message
                </label>
                <textarea
                  onChange={handleChange}
                  name="message"
                  value={form.message}
                  placeholder="Write a warm message to your customers..."
                  className="border border-gray-300 w-full rounded-lg px-4 py-3 h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                />
              </div>

              {/* Questions Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-gray-900 font-semibold text-sm">
                    Questions for Testimonial
                  </label>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {form.Question?.length} questions
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  {form.Question?.map((q, idx) => (
                    <div
                      key={q.id}
                      className="flex items-center gap-3 bg-gray-50 border border-gray-200 hover:border-blue-300 rounded-lg p-3 transition-colors group"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                        {idx + 1}
                      </span>
                      <input
                        onChange={(e) =>
                          handleQuestionChange(q.id, e.target.value)
                        }
                        value={q.question}
                        className="flex-grow border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700 text-sm"
                      />
                      <button
                        onClick={() => deleteQuestion(q.id)}
                        className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addQuestion}
                  className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition border border-blue-200 hover:border-blue-300 font-medium text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add another question
                </button>
              </div>
            </form>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className={`mt-8 w-full py-4 rounded-lg text-white font-bold transition-all text-lg ${
                uploading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl hover:scale-105"
              }`}
            >
              {uploading ? "Creating Space..." : "Create Space"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpaceForm;
