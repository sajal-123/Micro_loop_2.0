import React from 'react'
import Image from 'next/image'
function Logo() {
  return (
    <div className='flex items-center gap-2'>
      <div className="img w-12 flex items-center justify-center bg-yellow-300 rounded-full overflow-hidden">
        <Image src={'/logo.jpg'} alt='Logo' height={40} width={52}/>
      </div>
      <h1 className="font-bold text-xl">Loop</h1>
    </div>
  )
}

export default Logo
