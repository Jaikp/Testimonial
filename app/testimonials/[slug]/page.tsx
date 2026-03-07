"use client"
import { StoreContext } from '@/context/StoreContext'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { Outfit } from 'next/font/google';
import RecordView from '@/components/Record/RecordView';
import { Video, MessageSquare, X } from 'lucide-react';

const outfit = Outfit({ subsets: ["latin"] });
 
function page({params}:{params:any}) { 
  
  const context = useContext(StoreContext);
  
    
    
    if (!context) {
        throw new Error("StoreContext must be used within a StoreProvider");
    }

    const { getReviewSpace, reviewSpace, addReview } = context;


  const [upload, setUpload] = useState('');
  const [loading, setloading] = useState(true);
  const [form, setForm] = useState({
    spaceId : params.slug,
    name : "",
    email : "",
    content : "",
    rating : "5",
    videoUrl : "null"
  })

  const setVideoUrl = (url : string) => {
    setForm(prevForm => ({
      ...prevForm,
      videoUrl: url
    }));
  }

  const handleChange = (e : any) => {
    e.preventDefault();

    const { name, value} = e.target;

    const newValue = value;

    setForm(prevForm => ({
      ...prevForm,
      [name]: newValue
    }));
  };

  const handleRatingChange = (value: number) => {
    setForm(prevForm => ({
      ...prevForm,
      rating: value.toString()
    }));
  };

  useEffect(() => {
    
    const loadData = async ()=>{
      await getReviewSpace({id :params.slug});
      setloading(false);
    }
    loadData();

  }, [])

  async function handleClick(e:any){
    
    if(e.target.name === 'record'){
      setUpload(e.target.name);
    }
    else{
      setUpload(e.target.name);
    }
    
  }
  async function handleSubmit(e:any){
      
      await addReview(form);
      
  }

  if(loading){
    return (<div className='h-screen w-screen flex justify-center items-center bg-gradient-to-b from-[#0e0f11] to-[#1a1c20]'><Spinner className="h-16 w-16 text-blue-600" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /></div>)
  }
  
  return (
    <div className='bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen text-gray-900'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 shadow-sm'>
        <div className='max-w-6xl mx-auto px-6 py-5'>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>Endorser</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex justify-center items-center min-h-[calc(100vh-80px)]'>
        <div className='w-full max-w-3xl px-6 py-12'>
          
          {/* Hero Section */}
          <div className='text-center mb-12'>
            <h1 className={`text-5xl sm:text-6xl font-bold mb-4 ${outfit.className}`}>
              {reviewSpace.header}
            </h1>
            <p className='text-xl text-gray-600 leading-relaxed mb-8'>
              {reviewSpace.message}
            </p>

            {/* Questions Section */}
            <div className='mt-8 inline-block text-left bg-white rounded-2xl shadow-md p-8 border border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>Questions We'd Love Your Input On:</h3>
              <ul className='space-y-3'>
                {reviewSpace.Question?.map((q: any, index: number) => (
                  <li key={index} className='flex gap-3'>
                    <span className='text-blue-600 font-bold flex-shrink-0 w-6'>•</span>
                    <span className='text-gray-700'>{q.question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row justify-center gap-4 mt-12'>
            <button 
              onClick={handleClick} 
              name='record' 
              className='group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
            >
              <Video className='w-5 h-5' />
              Record a Video
            </button>
            <button 
              onClick={handleClick} 
              name='text' 
              className='flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
            >
              <MessageSquare className='w-5 h-5' />
              Send in Text
            </button>
          </div>

          <p className='text-center text-gray-500 text-sm mt-8'>
            Both options are welcome! Share your honest feedback in whatever format works best for you.
          </p>

        </div>
      </div>

      {/* Video Recording Modal */}
      {upload === 'record' && (
        <>
          <div 
            onClick={() => setUpload('')} 
            className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 transition-opacity'
          ></div>
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 p-4'>
            <div className='bg-white shadow-2xl p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
              {/* Close Button */}
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>Record Video Testimonial</h2>
                <button
                  onClick={() => setUpload('')}
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                >
                  <X className='w-6 h-6 text-gray-600' />
                </button>
              </div>

              {/* Questions Reference */}
              <div className='mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <p className='text-sm font-semibold text-blue-900 mb-3'>Questions to consider:</p>
                <ul className='space-y-2'>
                  {reviewSpace.Question?.map((q: any, index: number) => (
                    <li key={index} className='text-sm text-gray-700 flex gap-2'>
                      <span className='text-blue-600 font-bold flex-shrink-0'>•</span>
                      {q.question}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Record Component */}
              <RecordView setUpload={setUpload} spaceId={params.slug}/>
            </div>
          </div>
        </>
      )}

      {/* Text Submission Modal */}
      {upload === 'text' && (
        <>
          <div 
            onClick={() => setUpload('')} 
            className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 transition-opacity'
          ></div>
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 p-4'>
            <div className='bg-white shadow-2xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
              {/* Header */}
              <div className='bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 flex justify-between items-center'>
                <h2 className='text-2xl font-bold'>Write Your Testimonial</h2>
                <button
                  onClick={() => setUpload("")}
                  className='p-2 hover:bg-blue-700 rounded-lg transition-colors'
                >
                  <X className='w-6 h-6' />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className='p-8 space-y-6'>
                
                {/* Questions */}
                <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                  <p className='font-semibold text-gray-900 mb-3'>Questions to address:</p>
                  <ul className='space-y-2'>
                    {reviewSpace.Question?.map((q: any, index: number) => (
                      <li key={index} className='text-sm text-gray-700 flex gap-2'>
                        <span className='text-blue-600 font-bold flex-shrink-0'>•</span>
                        {q.question}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rating */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>Your Rating</label>
                  <Rating 
                    value={Number(form.rating)} 
                    onChange={handleRatingChange} 
                    placeholder={undefined} 
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined}  
                  />
                </div>

                {/* Textarea */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>Your Testimonial</label>
                  <textarea 
                    onChange={handleChange} 
                    name='content' 
                    placeholder='Share your honest feedback...'
                    className='w-full border border-gray-300 rounded-lg p-4 h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all'
                    required
                  ></textarea>
                </div>

                {/* Name */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Your Name</label>
                  <input 
                    onChange={handleChange} 
                    name='name' 
                    type='text'
                    placeholder='John Doe'
                    className='w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' 
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Your Email</label>
                  <input 
                    onChange={handleChange} 
                    name='email' 
                    type='email'
                    placeholder='john@example.com'
                    className='w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' 
                    required
                  />
                </div>

                {/* Checkbox */}
                <div className='flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                  <input 
                    type='checkbox' 
                    required
                    className='mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer'
                  />
                  <label className='text-sm text-gray-700'>
                    I give permission to use this testimonial across social channels and other marketing efforts
                  </label>
                </div>

                {/* Buttons */}
                <div className='flex justify-end gap-3 pt-4'>
                  <button 
                    type='button' 
                    onClick={() => setUpload("")}
                    className='px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                  >
                    Cancel
                  </button>
                  <button 
                    type='submit' 
                    className='px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all'
                  >
                    Submit Testimonial
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      
    </div>)
  
}

export default page