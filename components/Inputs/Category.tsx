import React from 'react'
import { IconType } from 'react-icons';

interface categoryprosp {
    label: string;
    icon: IconType;
    selected: boolean,
    hadleChange: (value: string) => void
}
const Category: React.FC<categoryprosp> = ({ label, icon, selected, hadleChange }) => {
    const Icon = icon;
    return (
        <div onClick={() => { hadleChange(label) }} className={`flex gap-2 p-2 rounded-md   j justify-center  items-center cursor-pointer delay-150  flex-col  border-[3px] border-slate-400 ${selected ? ' rounded-l border-slate-800 text-slate-800' : " text-slate-500 "} hover:border-slate-700 hover:text-slate-700`}   >
            <Icon />
            <div className=" capitalize  text-lg md:text-[1.2rem] font-bold">{label}</div>
        </div>
    )
}

export default Category