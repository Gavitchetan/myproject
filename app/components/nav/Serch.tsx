"use client"
import React, { useCallback } from 'react'
import { BiSearch, BiServer } from "react-icons/bi"
const Serch = () => {
    const FindProducts = useCallback(() => {

    }, [])
    return (
        <div className=' flex flex-1  items-center border-slate-500  rounded-md'>
            <div className=" border-[1px]    border-slate-500" >
                <input placeholder='Serch Here' className=' focus:w-[300px] border-none  items-center justify-center outline-none p-2' type="text" />
            </div>
            <button className=' p-[8px] bg-black rounded-sm  text-white  ' onClick={FindProducts}>
                <BiSearch size={26} />
            </button>
        </div>
    )
}

export default Serch