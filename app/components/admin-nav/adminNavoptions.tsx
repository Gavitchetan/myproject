import React, { FC } from 'react'
import { adminNavoptions as adminOps } from '@/utils/AdminNav'
import { IconType } from 'react-icons'
interface dminOps {
    title: string,
    selected?: boolean,
    Icon: IconType,
    onclick: () => void
}
const adminNavoptions: FC<dminOps> = ({ title, selected, onclick, Icon }) => {

    return (
        <div>
            <div onClick={onclick} className={` cursor-pointer border-b-[1px] ${selected ? "border-b-slate-" : "border-transparent"}  text-white flex items-center gap-2`}>
                <p className='  md:text-[1rem] text-xs'> {title}</p>
                <Icon className=' text-xs md:text-[1rem]' />
            </div>
        </div>
    )
}

export default adminNavoptions