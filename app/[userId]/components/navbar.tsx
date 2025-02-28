import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  const day = new Date().toDateString();
  
  return (
    <div className='disableHighlight border-b-[1px] border-black flex justify-between font-Silkscreen text-lg'>
        <div className='border-r-[1px] border-black px-2 py-0.5 flex gap-2'>
          <Image src={'/icons/deliveryshoes.png'} alt='delivery shoes icon' width={20} height={20}/>
          Heartfelt Delivery Service
        </div>
        <div className='border-l-[1px] border-black px-2 py-0.5'>{day.substring(0, day.length - 5)} 1999</div>
    </div>
  )
}

export default Navbar