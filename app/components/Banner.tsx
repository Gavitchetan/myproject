import React from 'react'
import Img from "./img.jpg"
import Image from 'next/image'
Image
const Banner = () => {
    return (
        <div className=' rounded-md relative   bg-gradient-to-tl from-rose-100 p-12 to-teal-400  flex flex-col md:flex-row  justify-between items-center mt-12 shadow-lg hover:shadow-blue-500   delay-1000 '>
            <div className=" text-slate-200 flex md:flex-row ">
                <h1 className=' text-lg text-rose-400 font-bold capitalize  z-10 pb-2 md:text-4xl shadow-sm p-2 py-4 shadow-white'>Summer Sale</h1>
                <p>Enjoy discounts on selected items</p>
                <p>Get 50% OFF</p>
            </div>
            <div className="">
                {/* <h2 className=' text-white'>Hello</h2> */}
                <Image src={Img} alt='logo' className='  bg-transparent shadow-md shadow-blue-700 rounded-full' width={200} height={200} />
            </div>

        </div>
    )
}

export default Banner