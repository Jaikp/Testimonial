import React from 'react'
import { MoreVertical, Video, MessageSquare } from 'lucide-react'

function SpaceCard({header,router}:{header:any,router:any}) {

    function handleClick(){
        router.push(`/products/${header.id}`);
    }
  return (
    <div 
      onClick={handleClick} 
      className='group flex flex-col h-full bg-gradient-to-br from-[#26282C] to-[#1f2127] p-6 border border-gray-700 hover:border-blue-500 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105'
    >
      {/* Header with Avatar and Settings */}
      <div className='flex items-center justify-between mb-4'>
        <div className='w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-lg'>
          {header.name[0]?.toUpperCase() || 'S'}
        </div>
        <button className='p-2 rounded-lg bg-gray-800/50 hover:bg-blue-600/50 transition-all opacity-0 group-hover:opacity-100'>
          <MoreVertical className='w-5 h-5 text-gray-400 hover:text-white' />
        </button>
      </div>

      {/* Space Name */}
      <h3 className='text-lg font-semibold text-white mb-1 truncate'>{header.name}</h3>
      <p className='text-xs text-gray-400 mb-4'>Space ID: {header.id.substring(0, 8)}...</p>

      {/* Stats */}
      <div className='grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-700'>
        <div className='flex items-center gap-2 text-gray-300'>
          <Video className='w-4 h-4 text-blue-500' />
          <span className='text-sm'>
            <span className='font-semibold'>{header.reviews?.filter((r: any) => r.videoUrl && r.videoUrl.trim() !== "").length || 0}</span> Videos
          </span>
        </div>
        <div className='flex items-center gap-2 text-gray-300'>
          <MessageSquare className='w-4 h-4 text-green-500' />
          <span className='text-sm'>
            <span className='font-semibold'>{header.reviews?.filter((r: any) => (!r.videoUrl || r.videoUrl.trim() === "") && (r.content && r.content.trim() !== "")).length || 0}</span> Text
          </span>
        </div>
      </div>

      {/* Quick Action Button */}
      <button className='mt-4 w-full py-2 px-3 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 text-sm font-medium rounded-lg transition-all border border-blue-500/30 hover:border-blue-500'>
        View Space
      </button>
    </div>
  )
}

export default SpaceCard