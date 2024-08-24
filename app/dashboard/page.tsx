"use client"
import SpaceCard from '@/components/dashboard/SpaceCard';
import SpaceForm from '@/components/Forms/SpaceForm';
import SpaceLink from '@/components/Forms/SpaceLink';
import Footer from '@/components/Navbar/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { StoreContext } from '@/context/StoreContext';
import { Spinner } from '@material-tailwind/react';
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

function page() {

    const router = useRouter();
    const context = useContext(StoreContext);
    
    if (!context) {
       throw new Error("StoreContext must be used within a StoreProvider");
    }

    const {link,spaces,addSpace,userId,getSpace} = context;
    const [loading, setLoading] = useState(true);
    const [space, setSpace] = useState({
        home : true,
        form : false,
        close : false
    });
    useEffect(() => {
        async function loadData(){
             
            await getSpace();
            setLoading(false);
        }
        loadData();
    },[userId])
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
    if(loading){

        return (<div className='h-screen w-screen flex justify-center items-center'><Spinner className="h-16 w-16 text-blue-700" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /></div>)
    }

    else if(space.form){

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
    <div className=' text-white 2xl:mx-52 lg:mx-4 md:mx-4 mx-2 mb-0'>
    <div className='mt-52'>
        <h1 className='text-3xl mt-14 mb-5'>Overview</h1>
        <div className='flex gap-5 lg:flex-nowrap flex-wrap md:flex-rap'>
            <div className='md:w-[48.5%] w-full lg:w-1/3 bg-[#26282C] rounded-md h-20 p-4 border-gray-700 border'>
                <p>videos</p>
                <p>0</p>
            </div>
            <div className='md:w-[48.5%] w-full lg:w-1/3 bg-[#26282C] rounded-md h-20 p-4 border-gray-700 border'>
                <p>video credits</p>
                <p>0</p>
            </div>
            <div className='md:w-[48.5%] w-full lg:w-1/3 bg-[#26282C] rounded-md h-20 p-4 border-gray-700 border'>
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