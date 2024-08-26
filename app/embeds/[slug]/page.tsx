"use client"
import TestimonialCard from '@/components/Testimonials/TestimonialCard'
import { StoreContext } from '@/context/StoreContext'
import { Spinner } from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react'

function page({params}:{params:any}) {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("StoreContext must be used within a StoreProvider");
 }
    const {getReview } = context;    
    const [loading, setLoading] = useState(true);
    const [reviews, setreviews] = useState([])
    
    useEffect(() => {
      
     const loadData = async ()=>{

        const response:any = await getReview(params.slug);
        setreviews(response);
        setLoading(false);
     }
     loadData();
     console.log(reviews);
      
    },[])

    if(loading){

      return (<div className='h-screen w-screen flex justify-center items-center'><Spinner className="h-16 w-16 text-blue-700" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /></div>)
    }

  return (
    <div className='flex gap-5 h-screen bg-white p-20 justify-center'>
        {reviews.map((review,index)=>(
            <TestimonialCard key={index} review={review}/>
        ))}
      
    </div>
  )
}

export default page