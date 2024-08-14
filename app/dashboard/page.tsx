"use client"
import SpaceCard from '@/components/dashboard/SpaceCard';
import SpaceForm from '@/components/Forms/SpaceForm';
import SpaceLink from '@/components/Forms/SpaceLink';
import Footer from '@/components/Navbar/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { StoreContext } from '@/context/StoreContext';
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

function page() {

    const router = useRouter();
    const context = useContext(StoreContext);
    
    // Ensure context is not undefined
    if (!context) {
       throw new Error("StoreContext must be used within a StoreProvider");
    }

    const {link,url,spaces,addSpace,userId} = context;
    
    const [space, setSpace] = useState({
        home : true,
        form : false,
        close : false
    });
    function handleClick(e:any){
        if(e.target.value === 'form'){
            setSpace({home:false , form : true , close:false})
        }
        else{
            setSpace({home:true , form : false , close:false})
        }
    }

    const handleClose = ()=>{
        setSpace({home:true , form : false , close:false})
    }

    if(space.form){

        return (
            <div>
                <SpaceForm handleClick={handleClick} setSpace={setSpace} addSpace={addSpace} userId={userId}/>
            </div>
        )
    }
    else{

  return (

    space.close ? (<div>
        <SpaceLink handleClose={handleClose} link={link}/>
    </div>)
    :
    (
        <div>
            <Navbar/>
    <div className=' text-white mx-72 mb-0'>
    <div className='mt-52'>

        <div className='flex items-center justify-between' >
            <div className=' text-wrap mr-2 '>
                <h1 className='text-4xl mb-2'>Here's a quick demo for you 👉</h1>
                <p className='text-xl mb-2'>You will find everything you need to get started to collect testimonials and build a wall of love</p>
                <button className='p-2 bg-white text-black rounded'>Dismiss</button>
            </div>
            <div className='' >
                <div className='bg-slate-600 w-72 h-60'></div>
            </div>
            
        </div>
        <hr className='mt-40 border-[#33363B]'/>
        <h1 className='text-3xl mt-14 mb-5'>Overview</h1>
        <div className='flex gap-5'>
            <div className='w-1/3 bg-[#26282C] rounded-md h-20 p-4'>
                <p>videos</p>
                <p>0</p>
            </div>
            <div className='w-1/3 bg-[#26282C] rounded-md h-20 p-4'>
                <p>video credits</p>
                <p>0</p>
            </div>
            <div className='w-1/3 bg-[#26282C] rounded-md h-20 p-4'>
                <p>Plan</p>
                <p>Free Plan</p>
            </div>
        </div>
        <div className=' mt-14 flex justify-between'>
            <div>
                <h1 className='text-3xl'>Spaces</h1>
            </div>
            <div>
                <button onClick={handleClick} name='form' value={'form'} className='text-md bg-blue-600 p-2 rounded hover:bg-blue-700'>+ Create new space</button>
            </div>
        </div>
        <div className='mt-12 flex flex-wrap gap-5 items-start h-fit'>
            {spaces && spaces.length === 0 ?(<div className='w-full mt-48'>
                <p className='text-center'>No space yet, add new one?</p>
            </div>)
            :
            (spaces && spaces.map((space, index) => (
                <SpaceCard key={index} header={space} router={router} />
            )))
            } 
        </div>
 
    </div>
    </div>
    
    <Footer/>
    </div>
    )

    
  )
}
}

export default page