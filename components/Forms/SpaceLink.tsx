import React from 'react'

function SpaceLink({handleClose,link}:{handleClose:any,link:string}) {
  return (
    <div className='bg-gray-500 h-screen flex justify-center'>
        <div className='bg-white w-96 h-80 text-black text-center p-4 mt-8'>
            <div className='bg-slate-500 w-full h-1/2 mb-2'></div>
            <h1 className='text-xl mb-1'>Added testimonial successfully</h1>
            <p className='text-sm'>here is the link for your customers:</p>
            <p className='mb-4'>http://localhost:3000/testimonials/{link}</p>
            <button onClick={handleClose} className='bg-blue-600 w-full p-2 text-white rounded'>Close</button>
        </div>
    </div>
  )
}

export default SpaceLink