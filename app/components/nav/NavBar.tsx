import Container from '@/components/Container'
import Link from 'next/link'
import React from 'react'
import Usermenu from './Usermenu'
import Serch from './Serch'
import { getCurrentUser } from '@/actions/getcurrentuser'

const NavBar = async () => {
    const user = await getCurrentUser()

    return (

        <div className=' bg-slate-300  sticky top-0 z-20 mb-1  shadow-md shadow-black'>
            <div className=" py-4 border-b[1px] border-slate-600 shadow-sm">
                <Container>
                    <div className=" flex items-center justify-between">
                        <Link className='tas font-semibold shadow-sm text-slate-700 shadow-black p-2 rounded-md ' href={'/'}>Eshop</Link>
                        <div className=" flex gap-2">
                            <Serch />
                        </div>
                        <div className="">
                            <Usermenu user={user ? user : null} />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default NavBar


const Layer = () => {
    return (

        < div className=" absolute bg-[rgba(255,255,255,0.3)]  backdrop-blur-sm  w-screen h-screen z-10" ></div >
    )
}