"use client";
import { StoreContext } from "@/context/StoreContext";
import { signIn, signOut, useSession } from "next-auth/react"
import React, { useContext } from 'react'
import { Avatar } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const {setuserId,userId} = useContext(StoreContext);
  const session = useSession();


  return (
    <div className='mx-10 pt-5 flex justify-between'>
        <div onClick={()=> router.push('/dashboard')}>
            <h1 className='text-4xl cursor-pointer'>Testimonial</h1> 
            {setuserId(Number(JSON.stringify(session.data?.user?.id || '00')[1]))}
        </div>
        <div className=''>
        <div>
          {userId?(<>
            <button className="px-2 py-2 ml-2 bg-[#5D5DFF] hover:bg-[#5D5DFF] rounded" onClick={() => signOut()}>Sign out</button>
            </>):(<>
            <button className="bg-[#5D5DFF] hover:bg-[#5D5DFF] py-2 rounded px-4" onClick={()=> router.push('/signin')}>Signin</button>
          </>)}
          
        </div>
        </div>
    </div>
  )
}

export default Navbar