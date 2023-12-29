import React from 'react'

interface headingprops {
    label: string;
    small?: boolean;
}
const Heading: React.FC<headingprops> = ({ label, small }) => {
    return (
        <div className=" w-full    translate-x-[46%]    my-4">

            <h3 className=' mx-auto font-bold text-lg'>{label}</h3>

        </div>
    )
}

export default Heading