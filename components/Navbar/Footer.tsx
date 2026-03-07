"use client"
import React from 'react'
import { Heart, Mail, ArrowRight } from 'lucide-react'

function Footer() {
  return (
    <div className='bg-gradient-to-r from-[#0e0f11] to-[#1a1c20] border-t border-gray-800 mt-20'>
      {/* Newsletter Section */}
      <div className='bg-gradient-to-r from-blue-600/10 to-blue-400/10 border-b border-gray-800 py-12 px-6'>
        <div className='max-w-6xl mx-auto text-center'>
          <h3 className='text-2xl font-bold text-white mb-2'>Stay Updated</h3>
          <p className='text-gray-400 mb-6'>Get tips and updates delivered to your inbox</p>
          <div className='flex gap-2 max-w-md mx-auto'>
            <input 
              type="email" 
              placeholder='Enter your email' 
              className='flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors'
            />
            <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2'>
              <Mail className='w-4 h-4' />
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
          {/* Brand Section */}
          <div className='lg:col-span-1'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent mb-2'>
              Endorser
            </h1>
            <p className='text-gray-400 text-sm leading-relaxed mb-6'>
              Collect video and text testimonials from your customers with ease. Simple, secure, and powerful.
            </p>
            <div className='flex gap-4'>
              <a href='#' className='text-gray-400 hover:text-blue-500 transition-colors'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'><path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/></svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-blue-500 transition-colors'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'><path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7'/></svg>
              </a>
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h3 className='text-white font-semibold mb-4 flex items-center gap-2'>
              <span>Products</span>
            </h3>
            <ul className='space-y-3'>
              {['Wall of Love', 'Help Center', 'Pricing', 'Features'].map((link) => (
                <li key={link}>
                  <a 
                    href='#' 
                    className='text-gray-400 hover:text-blue-500 transition-colors duration-300 text-sm flex items-center gap-2 group'
                  >
                    <span className='inline-block w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className='hidden md:block'>
            <h3 className='text-white font-semibold mb-4'>Company</h3>
            <ul className='space-y-3'>
              {['About Us', 'Blog', 'Careers', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href='#' 
                    className='text-gray-400 hover:text-blue-500 transition-colors duration-300 text-sm flex items-center gap-2 group'
                  >
                    <span className='inline-block w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className='hidden lg:block'>
            <h3 className='text-white font-semibold mb-4'>Legal</h3>
            <ul className='space-y-3'>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((link) => (
                <li key={link}>
                  <a 
                    href='#' 
                    className='text-gray-400 hover:text-blue-500 transition-colors duration-300 text-sm flex items-center gap-2 group'
                  >
                    <span className='inline-block w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-800 pt-8 mt-8'>
          {/* Bottom Section */}
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-gray-500 text-sm'>
              © 2024 Endorser. All rights reserved. Made with <Heart className='w-4 h-4 inline text-red-500' /> by your team
            </p>
            <div className='flex gap-4'>
              <a href='#' className='text-gray-400 hover:text-blue-500 text-sm transition-colors'>Privacy</a>
              <span className='text-gray-600'>•</span>
              <a href='#' className='text-gray-400 hover:text-blue-500 text-sm transition-colors'>Terms</a>
              <span className='text-gray-600'>•</span>
              <a href='#' className='text-gray-400 hover:text-blue-500 text-sm transition-colors'>Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer