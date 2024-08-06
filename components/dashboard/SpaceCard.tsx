
import React from 'react'

function SpaceCard({header,router}:{header:any,router:any}) {

    function handleClick(){
        router.push(`/products/${header.id}`);
    }
  return (
    
    <div onClick={handleClick} className='flex bg-[#26282C] p-2 border-2 border-[#464a4d] hover:bg-[#33363B] w-full sm:w-1/2 md:w-[32.5%] items-center rounded-md justify-around cursor-pointer'>
        <div className='text-5xl'>
            A
        </div>
        <div className='ml-8 py-2 '>
            <h1>{header.name}</h1>
            <div className='flex text-sm mt-2 gap-20'>
                <div>video: 0</div>
                <div>Text: 0</div>
            </div>
        </div>
        <div className='cursor-pointer'>
            ⚙️
        </div>
    </div>
    
  )
}

export default SpaceCard