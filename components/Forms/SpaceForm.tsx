
import axios from 'axios';
import React, { useState } from 'react'


function SpaceForm({handleClick,setSpace,addSpace,userId}:{handleClick:any,setSpace:any,addSpace:any,userId:any}) {
    const [form, setForm] = useState({
        userId : userId,
        name : "",
        header : "",
        message : "",
        Question : {}
    })

    const handleChange = (e : any) => {
        e.preventDefault();
    
        const { name, value } = e.target;
    
        setForm(prevForm => ({
          ...prevForm,
          [name]: value
        }));
      };

      const handleSubmit = async () => {
        console.log(form);
        await addSpace(form);
        // Update space state to control UI elements
        setSpace({ home: false, form: false, close: true });
      };


  return (
    <div className=' bg-slate-400 text-black h-screen pt-20'>
    <div className='mx-60 bg-white flex rounded py-4'>
        <div className='p-4 mt-8'>
            <div className='border p-4 rounded-md py-10'>
                <div className='text-center mt-40'>
                    <h1 className='mb-2 text-3xl'>{form.header ? form.header : "Header goes here.."}</h1>
                    <p>{form.message? form.message : "you custom message goes here.."}</p>
                </div>
                <div className='mt-10 mb-12'>
                    <p className='text-xl mb-4'>Questions</p>
                    <p className='ml-4 mb-1'>Who are you / what are you working on?</p>
                    <p className='ml-4 mb-1'>How has [our product / service] helped you?</p>
                    <p  className='ml-4 mb-1'>What is the best thing about [our product / service]</p>
                </div>
                <button className='bg-blue-600 w-full p-2 text-white rounded mb-2' >Record a video</button>
                <button className='bg-black w-full p-2 text-white rounded'>Send in text</button>
            </div>
            <div className='flex justify-between mt-4 gap-2'>
                <button className='border p-2 rounded w-1/2'>Thank you page</button>
                <button className='border p-2 rounded w-1/2'>Extra Setting</button>
            </div>
        </div>
        <div className='p-4 mt-8'>
            <div className='text-center px-8 mb-16'>
                <h1 className='text-3xl mb-4'>Create new Space</h1>
                <p className='font-light'>After the Space is created, it will generate a dedicated page for collecting testimonials.</p>
            </div>

            <p>Space name</p>
            <input onChange={handleChange} name='name' className='border w-full rounded h-10 mt-2 border-gray-400 mb-8 bg-white p-2'></input>

            <p>Header Title</p>
            <input onChange={handleChange} name='header' className='border w-full rounded h-10 mt-2 border-gray-400 mb-8 bg-white p-2'></input>
            
            <p>Your custom message</p>
            <textarea onChange={handleChange} name='message' className='border w-full rounded h-20 mt-2 border-gray-400 mb-8 p-2 bg-white' placeholder='Write a war message to your customer'></textarea>

            <button onClick={handleSubmit} className='bg-blue-500 w-full text-white p-4 rounded'>Create new space</button>
        </div>
        <div onClick={handleClick} className='px-4 cursor-pointer'>
            X
        </div>
    </div>
    </div>
  )
}

export default SpaceForm