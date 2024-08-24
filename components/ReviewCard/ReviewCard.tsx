import { Rating } from '@material-tailwind/react'
import React from 'react'


function ReviewCard({review}:{review:any}) {
  return (
    <div className=' bg-[#26282C] pt-8 px-12 mb-5 rounded-lg pb-10 hover:bg-[#33363B]'>
        <div className='flex content-center'>
            <div className='bg-[#DCEAFE] rounded-full px-3 text-[#2363EB]'>
                Text
            </div>
            
            <div className=''>
                <i className="fi fi-rs-heart"></i>
            </div>
        </div>
        <Rating className='mt-3' value={Number(review.rating)} readonly placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
        <p className='my-10'>{review.content}</p>
        <div className='w-28 h-28 bg-black mb-8'>

        </div>
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