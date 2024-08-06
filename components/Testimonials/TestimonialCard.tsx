import React from 'react'

function TestimonialCard({review}:{review:any}) {
  return (
    
        <div className="grid gap-4 h-fit border border-slate-300 text-black p-4 rounded-lg hover:bg-[#F6F8FA] w-1/5">
              <div className='flex items-center gap-3'>
                <div className='bg-blue-600 rounded-full w-16 h-16 text-center text-3xl p-4 text-white'>
                  {review.name[0]}
                </div>
                <div>
                  <h1>{review.name}</h1>
                </div>
              </div>
              
              <div className='w-full bg-slate-400 h-52'></div>
              <p>{review.content}</p>
              <p>{review.createdAt}</p>
          </div>
  )
}

export default TestimonialCard