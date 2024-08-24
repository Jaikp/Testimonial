import React from 'react'

function SpaceLink({handleClose,link}:{handleClose:any,link:string}) {
  const url = `${process.env.NEXT_PUBLIC_URL}/testimonials/${link}`
  return (
    <div className='bg-[#D8E0EA] h-screen flex justify-center'>
        <div className='bg-white w-96 text-black text-center p-4 mt-8 h-96 rounded shadow-2xl'>
            <div className='bg-slate-500 w-full h-1/2 mb-2'></div>
            <h1 className='text-xl mb-1'>Added testimonial successfully</h1>
            <p className='text-sm'>here is the link for your customers:</p>
            <div className='flex flex-col justify-between h-28'>
            <a className='text-wrap' href={url}>{url}</a>
            <button onClick={handleClose} className='bg-blue-600 w-full p-2 text-white rounded'>Close</button>
            </div>
        </div>
    </div>
  )
}

export default SpaceLink