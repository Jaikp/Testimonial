"use client";
import React, { useState } from "react";

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

  const handleGPT = async () => {
    if (!GPT.trim()) return;
    setLoader(true);
    const data = await addGpt(GPT);
    setLoader(false);
    setForm({
      userId: userId,
      name: data.name,
      header: data.header,
      message: data.message,
      Question: data.questions,
    });
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
    <div className="bg-[#EEF1F5] min-h-screen py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <div className="flex justify-end p-4 border-b">
          <button
            onClick={handleClick}
            className="text-gray-500 hover:text-red-500 text-lg font-semibold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Left Side - Preview */}
          <div className="bg-gray-50 border rounded-xl p-8 flex flex-col justify-between shadow-inner h-min">
            <div>
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
                {form.header || "Header goes here..."}
              </h1>
              <p className="text-center text-gray-600 mb-10">
                {form.message || "Your custom message goes here..."}
              </p>

              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Questions
                </h2>
                <div className="space-y-3">
                  {form.Question?.map((q) => (
                    <div key={q.id} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <p className="text-gray-700">{q.question}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all">
                🎥 Record a Video
              </button>
              <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-medium transition-all">
                ✉️ Send in Text
              </button>
            </div>

            <div className="mt-6 flex justify-between gap-3">
              <button className="border border-gray-400 text-gray-700 rounded-lg py-2 w-full hover:bg-gray-100 transition">
                Thank You Page
              </button>
              <button className="border border-gray-400 text-gray-700 rounded-lg py-2 w-full hover:bg-gray-100 transition">
                Extra Settings
              </button>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3 text-gray-800">
                Create New Space
              </h1>
              <p className="text-gray-600">
                Once created, you’ll get a unique page for collecting
                testimonials.
              </p>
            </div>

            {/* AI Section */}
            <label className="block font-semibold mb-2 text-gray-700">
              AI Space Creator
            </label>
            <div className="flex gap-2 mb-6">
              <input
                onChange={(e) => setGPT(e.target.value)}
                name="GPT"
                value={GPT}
                placeholder="Describe your product or business..."
                className="border border-gray-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={handleGPT}
                className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
              >
                {loader ? "Processing..." : "Generate"}
              </button>
            </div>

            {/* Form Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Space Name
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  value={form.name}
                  className="border border-gray-300 w-full rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Header Title
                </label>
                <input
                  onChange={handleChange}
                  name="header"
                  value={form.header}
                  className="border border-gray-300 w-full rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Custom Message
                </label>
                <textarea
                  onChange={handleChange}
                  name="message"
                  value={form.message}
                  placeholder="Write a warm message to your customers..."
                  className="border border-gray-300 w-full rounded-lg p-2 h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Questions Section */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Questions
                </label>
                <div className="space-y-3">
                  {form.Question?.map((q) => (
                    <div
                      key={q.id}
                      className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2"
                    >
                      <input
                        onChange={(e) =>
                          handleQuestionChange(q.id, e.target.value)
                        }
                        value={q.question}
                        className="flex-grow border-none bg-transparent focus:ring-0 focus:outline-none text-gray-700"
                      />
                      <button
                        onClick={() => deleteQuestion(q.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addQuestion}
                  className="text-blue-600 mt-3 flex items-center gap-1 hover:underline"
                >
                  ➕ Add another question
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className={`mt-8 w-full py-3 rounded-lg text-white font-semibold transition-all ${
                uploading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {uploading ? "Uploading..." : "Create Space"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpaceForm;
