"use client"
import React, { useState } from 'react'


function SpaceForm({handleClick,setSpace,addSpace,userId,addGpt}:{handleClick:any,setSpace:any,addSpace:any,userId:any,addGpt:any}) {

    interface Form {
        userId : any,
        name : string,
        header : string,
        message : string,
        Question : any[]
    }
    const [GPT, setGPT] = useState("")
    const [loader, setloader] = useState(false);
    const [form, setForm] = useState<Form>({
        userId : userId,
        name : "",
        header : "",
        message : "",
        Question : [{id:1 , question:"Who are you / what are you working on?"},
            {id:2 , question:"How has [our product / service] helped you?"},
            {id:3 , question:"What is the best thing about [our product / service]"}
        ]
    })

    const addQuestion = ()=>{
        setForm(prevForm=>({
            ...prevForm,
            Question : [...prevForm.Question,{id:Date.now(),question:" "}]
        }));
    }

    const handleQuestionChange = (id: number,value: string)=>{

        setForm(prevForm=>({
            ...prevForm,
            Question : prevForm.Question.map(q=>
                q.id === id ? {...q , question:value} : q
            )
        }))

    }

    const deleteQuestion = (id:number)=>{

        setForm(prevForm=>({
            ...prevForm,
            Question : prevForm.Question.filter(q=> q.id!=id)
        }))
    }

    const handleGPT = async (e:any)=>{
        setloader(true);
        const form = await addGpt(GPT);
        setloader(false);
        setForm({
            userId : userId,
            name : form.name,
            header : form.header,
            message : form.message,
            Question : form.questions
        })
        console.log(form);
    }

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
        setSpace({ home: false, form: false, close: true });
      };


  return (
    <div className='text-black bg-[#D8E0EA] h-fit pb-20 pt-20'>
    <div className='mx-5 2xl:mx-52 bg-[#FFFFFF] rounded flex flex-col items-center py-4 shadow-2xl' >
        <div onClick={handleClick} className='px-4 cursor-pointer w-full text-end right-0'>
            X
        </div>
        <div className='flex flex-col md:flex-row'>
        <div className='p-4 md:mt-8 md:max-w-lg'>
            <div className='border p-4 rounded-md py-10'>
                <div className='text-center mt-40'>
                    <h1 className='mb-2 text-3xl'>{form.header ? form.header : "Header goes here.."}</h1>
                    <p>{form.message? form.message : "you custom message goes here.."}</p>
                </div>
                <div className='mt-10 mb-12'>
                    <p className='text-xl mb-4'>Questions</p>
                    {form.Question?.map((q)=>(
                        <div className='ml-4 mb-1 flex gap-2 font-light'>
                            <p>•</p>
                            <p>{q.question}</p>
                        </div>
                    ))}
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
            <p className='mb-2'>AI Space Creator</p>
            <div className='flex h-fit gap-2 items-center mb-4'>
                <input onChange={(e)=>setGPT(e.target.value)} name='GPT' className='border w-full rounded h-10 border-gray-400 bg-white p-2'></input>
                <button onClick={handleGPT} className='bg-blue-500 text-white rounded h-fit p-2'>{loader ? (<>Processing...</>):(<>Generate</>)}</button>
            </div>
            <p>Space name</p>
            <input onChange={handleChange} name='name' value={form.name} className='border w-full rounded h-10 mt-2 border-gray-400 mb-8 bg-white p-2'></input>

            <p>Header Title</p>
            <input onChange={handleChange} name='header' value={form.header} className='border w-full rounded h-10 mt-2 border-gray-400 mb-8 bg-white p-2'></input>
            
            <p>Your custom message</p>
            
            <textarea onChange={handleChange} name='message' value={form.message} className='border w-full rounded h-20 mt-2 border-gray-400 mb-8 p-2 bg-white' placeholder='Write a war message to your customer'></textarea>
            
            <div>
            <p>Questions</p>
            {form.Question?.map((q)=>(
                
                <div key={q.id} className='flex items-center gap-2 cursor-pointer p-2'> 
                    <i className="fi fi-br-menu-dots-vertical text-xl h-full flex items-center"></i>
                    <input onChange={(e)=>handleQuestionChange(q.id , e.target.value)} name='Question' value={q.question} className='border w-full rounded h-10 border-gray-400 bg-white p-2'></input>
                    <i onClick={()=>deleteQuestion(q.id)} className="fi fi-rr-trash text-xl cursor-pointer flex items-center"></i>
                </div> 
            ))}
                <div className='flex items-center'>
                    <i onClick={addQuestion} className="fi fi-rr-add p-2 text-lg font-normal flex items-center cursor-pointer"></i>
                    <div className='text-sm'>
                        Add
                    </div>
                </div>
                
            </div>

            <button onClick={handleSubmit} className='bg-blue-500 w-full text-white p-4 rounded'>Create new space</button>
        </div>
        </div>
    </div>
    </div>
  )
}

export default SpaceForm