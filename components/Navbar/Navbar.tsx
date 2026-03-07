"use client";
import { StoreContext } from "@/context/StoreContext";
import { signIn, signOut, useSession } from "next-auth/react"
import React, { useContext, useEffect } from 'react'
import { Avatar } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("StoreContext must be used within a StoreProvider");
 }
  const {setuserId,userId} = context;
  const session = useSession();
  useEffect(() => {
    const userId : any = session.data?.user && 'id' in session.data.user ? session.data.user.id : '0';
    setuserId(userId);
}, [session.data, setuserId]);


  return (
    <div className='w-full bg-gradient-to-r from-[#0e0f11] to-[#1a1c20] border-b border-gray-800 shadow-lg sticky top-0 z-50'>
      <div className='mx-6 sm:mx-10 lg:mx-16 py-4 flex justify-between items-center'>
        <button 
          onClick={()=> router.push('/dashboard')} 
          className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent hover:from-blue-400 hover:to-blue-300 transition-all duration-300 cursor-pointer'
        >
          Endorser
        </button> 
        
        <div className='flex items-center gap-4'>
          {userId!='0'?(
            <div className='flex items-center gap-4'>
              {session.data?.user?.image && (
                <Avatar
                  src={session.data.user.image}
                  alt="User Avatar"
                  size="md"
                  className="border-2 border-blue-500 cursor-pointer hover:border-blue-400 transition-all"
                />
              )}
              <button 
                className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg" 
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          ):(
            <button 
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg" 
              onClick={()=> router.push('/signin')}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar