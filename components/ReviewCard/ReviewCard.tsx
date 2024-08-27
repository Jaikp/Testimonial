"use client"
import { Rating } from '@material-tailwind/react'
import React from 'react'


function ReviewCard({review}:{review:any}) {
  return (
    <div className=' bg-[#26282C] pt-8 px-12 mb-5 rounded-lg pb-10 hover:bg-[#33363B]'>
        <div className='flex justify-between'>
            <div className='bg-[#DCEAFE] rounded-full px-3 text-[#2363EB]'>
                Text
            </div>
            
            <div className=''>
                {(review.favourite)?(<i className="fi fi-sr-heart text-red-500 text-xl"></i>):(<i className="fi fi-rr-heart text-red-500 text-xl"></i>)}
            </div>
        </div>
        <Rating className='mt-3' value={Number(review.rating)} readonly placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
        <p className='my-10'>{review.content}</p>
        <div className='grid grid-cols-2 gap-3 text-sm'>
            <div>
                <p className='font-semibold'>Name</p>
                <p>{review.name}</p> 
            </div>
            <div>
                <p className='font-semibold'>Email</p>
                <p>{review.email}</p>
            </div>
            <div>
                <p className='font-semibold'>Submitted At</p>
                <p>{review.createdAt}</p>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard