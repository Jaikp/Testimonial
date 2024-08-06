"use client"
import TestimonialCard from '@/components/Testimonials/TestimonialCard'
import { StoreContext } from '@/context/StoreContext'
import React, { useContext, useEffect } from 'react'

function page({params}:{params:any}) {
    const { reviews , getReview } = useContext(StoreContext);    
    
    useEffect(() => {
      
     const loadData = async ()=>{

        await getReview(params.slug);
     }
     loadData();
     console.log(reviews);
      
    },[])

  return (
    <div className='flex gap-5 h-screen bg-white p-20 justify-center'>
        {reviews.map((review,index)=>(
            <TestimonialCard key={index} review={review}/>
        ))}
      
    </div>
  )
}

export default page