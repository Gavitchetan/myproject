import React, { FC, ReactNode } from 'react'
interface cprops {
    children: ReactNode
}

const Container: FC<cprops> = ({ children }) => {
    return (
        <div className=' max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4'>
            {children}
        </div>
    )
}

export default Container