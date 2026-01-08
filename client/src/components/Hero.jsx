import React from 'react'
import {assets} from "../assets/assets"
import {Link} from "react-router-dom"

function Hero() {
  return (
    <div className='relative'>
        <img src={assets.main_banner_bg} alt="" className='hidden md:block w-full' />
         <img src={assets.main_banner_bg_sm} alt="" className=' md:hidden w-full' />
         <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center
         pb-24 md:pb-0 md pl-18 lg:pl-24">
            <h1 className='text-3xl md:4xl font-bold text-center md:text-left max-w-72 md:max-w-80 leading-tight lg:leading-15'>
                Freshness You Can Trust, Savings You Will Love!
            </h1>
            
            <div className="flex items-center mt-6 font-medium gap-6">
             <Link
                to="/products"
                className="flex items-center gap-2 px-7 py-3 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
  >
             Shop Now
             <img src={assets.white_arrow_icon} alt="" className='md:hidden transition group-focos:translate-x-1'/>
                </Link>
                  <Link
                to="/products"
                className="hidden md:flex items-center gap-2 px-7 py-3 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
  >
             Explore Deals
             <img src={assets.white_arrow_icon} alt="" className='md:hidden transition group-focos:translate-x-1'/>
                </Link>
</div>

         </div>
    </div>
  )
}

export default Hero