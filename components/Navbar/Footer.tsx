"use client"
import React from 'react'

function Footer() {
  return (
    <div className='flex mx-2 md:mx-5 2xl:mx-72 justify-between mt-14 py-14 gap-5'>
        <div className=''>
            <h1 className='text-3xl mb-2'>Testimonials</h1>
            <p>The easiest solution to getting text and video testimonials from your customers</p>
        </div>
        <div className=''>
            <h1 className='mb-2 text-md font-semibold'>Products</h1>
            <p>our wall of love</p>
            <p>help center</p>
            <p>pricing</p>
            <p>features</p>
        </div>
        <div className='hidden md:block'>
            <h1 className='mb-2 text-md font-semibold'>company</h1>
            <p>our wall of love</p>
            <p>help center</p>
            <p>pricing</p>
            <p>features</p>
        </div>
        <div className='hidden lg:block'>
            <h1 className='mb-2 text-md font-semibold'>Products</h1>
            <p>our wall of love</p>
            <p>help center</p>
            <p>pricing</p>
            <p>features</p>
        </div>
    </div>
  )
}

export default Footer