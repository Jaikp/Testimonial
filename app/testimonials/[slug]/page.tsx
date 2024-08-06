"use client"
import { StoreContext } from '@/context/StoreContext'
import MuxUploader from '@mux/mux-uploader-react';
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from "@material-tailwind/react";
 
function page({params}:{params:any}) { 
  
  const {getReviewSpace,reviewSpace,video,getendpoint,addReview} = useContext(StoreContext);
  const [upload, setUpload] = useState('text');


  const [form, setForm] = useState({
    spaceId : params.slug,
    name : "",
    email : "",
    content : "",
    rating : "5"
  })

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

    }
    loadData();

  }, [])

  async function handleClick(e:any){
    
    if(e.target.name === 'record'){
      await getendpoint();
      setUpload(e.target.name);
    }
    else if(e.target.name==='send'){
      await addReview(form);
      setUpload('');
    }
    else{
      setUpload(e.target.name);
    }
    
  }

  if(upload === 'record'){

    return (<MuxUploader endpoint={video} />);
  }
  
  return (
    <div className='bg-white h-screen text-black relative'>
      <div className='z-0'>
        <h1 className='pl-8 pt-4 text-2xl from-neutral-500'>Testimonial</h1>
      </div>
      <div className='items-center w-1/2 m-auto mt-20 z-0'>
          <div className='w-32 h-32 bg-slate-400 m-auto'>

          </div>
          <h1 className='text-5xl text-center mt-10'>{reviewSpace.header}</h1>
          <p className='text-xl text-center mt-5'>{reviewSpace.message}</p>

          <div className=' p-2 mt-8 mx-52'>
            <p className='text-xl'>Questions</p>
            <hr className='w-5 border-blue-500 border-2'/>
            <ul className='text-md font-light mt-2 list-disc ml-4'>
              <li>Who are you / what are you working on?</li>
              <li>How has [our product / service] helped you?</li>
              <li>What is the best thing about [our product / service]</li>
            </ul>
          </div>
          <div className='flex justify-center gap-4 mt-12'>
            <div>
              <button onClick={handleClick} name='record' className='bg-blue-600 p-2 px-8 rounded text-md hover:bg-blue-700 cursor-pointer text-white'>Record a video</button>
            </div>
            <div>
              <button onClick={handleClick} name='text' className='bg-black p-2 px-8 text-white rounded text-md hover:bg-slate-800 cursor-pointer'>Send in text</button>
            </div>
          </div>
          
      </div>
      {upload === 'text' ? (
      <>
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
        <div className='absolute bg-white w-1/4 h-fit top-32 z-20 left-[37.5%] items-center p-2 rounded'>
            <div className='flex justify-end w-full'>
              <div onClick={()=>{setUpload("")}} className='cursor-pointer text-xl'>✗</div>
            </div>
            <div className='px-2'>
              <h1 className='font-semibold text-xl'>Write text testimonial too</h1>
              <p className='text-xl mt-4'>Questions</p>
              <hr className='w-5 border-blue-500 border-2'/>
              <ul className='text-md font-light mt-2 list-disc ml-4'>
                <li>Who are you / what are you working on?</li>
                <li>How has [our product / service] helped you?</li>
                <li>What is the best thing about [our product / service]</li>
              </ul>
              
              <Rating value={Number(form.rating)} onChange={handleRatingChange}  />

              <textarea onChange={handleChange} name='content' className='w-full bg-white border mt-4 h-20'></textarea>

              <p className='mt-4'>Your Name</p>
              <input onChange={handleChange} name='name' className='w-full border rounded bg-white p-2' required></input>
              <p className='mt-4'>Your Email</p>
              <input onChange={handleChange} name='email' className='w-full border rounded bg-white p-2' required></input>

              <div className='flex mt-4'>
                <div className='bg-white mr-2'>
                  <input className='bg-white border rounded' type='checkbox'></input>
                </div>
                <div>I give permission to use this testimonial across social channels and other marketing efforts</div>
              </div>
              <div className='flex justify-end gap-2 mt-4'>
                <button onClick={handleClick} className='bg-white border border-gray-500 rounded p-2 w-20' name=''>Cancel</button>
                <button onClick={handleClick} className='bg-blue-500 border border-gray-500 rounded p-2 text-white w-20' name='send'>Send</button>
              </div>
            </div>
        </div>
      </>
      ) : (
      <></>
      )}
      
      
    </div>)
  
}

export default page