"use client"
import React, { FC, Fragment, useCallback, useState } from 'react'
import { BiCaretDownCircle, BiUser } from "react-icons/bi"
// import Avatar from "@mui/material"
import { Avatar, MenuItem } from '@mui/material'

import { AiFillCaretDown } from "react-icons/ai"
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { User } from '@prisma/client'
import { Safeuser } from '@/types/indexforuser'
interface usermenuProp {
    user: Safeuser | null
}
const Usermenu: FC<usermenuProp> = ({ user }) => {

    const [menuOpen, setmenuOpen] = useState(false)
    setTimeout(() => {
        setmenuOpen(false)
    }, 20000);
    const Hadlemenu = useCallback(() => {
        setmenuOpen(!menuOpen)
    }, [menuOpen])
    return (
        <section className=' cursor-pointer  relative '>

            <div className="">
                <div onClick={Hadlemenu} className=" transition justify-between flex w-[85px]  items-center p-[8px] rounded-2xl bg-slate-700">
                    {
                        user ? <Image className=' rounded-full' src={user.avatar as string} width={30} height={20} alt='alt' /> : <Avatar />
                    }
                    <AiFillCaretDown className={'text-white'} />
                </div>
                {
                    menuOpen && (
                        <section className=' z-40 absolute gap-4 flex flex-col  right-16 shadow-md shadow-blue-400  p-4 top-18 bg-white w-[250px] border-[1px] border-slate-500 rounded-md'>

                            {
                                user ?
                                    (<>
                                        <div onClick={Hadlemenu} className=' font-bold'>
                                            <Link href={'/user/orders'}>Your Orders</Link>
                                        </div>
                                        <div onClick={Hadlemenu} className=' font-bold'>
                                            <Link href={'/cart'}>Cart</Link>
                                        </div>
                                        <div onClick={() => { signOut() }} className=' font-bold'>
                                            <Link href={'/'}>LogOut</Link>
                                        </div>
                                        {
                                            user && user.role == 'admin' && <div onClick={Hadlemenu} className=' font-bold'>
                                                <Link href={'/admin'}>Admin</Link>
                                            </div>
                                        }
                                    </>) :

                                    (<>
                                        <div onClick={Hadlemenu} className=' font-bold'>
                                            <Link href={'user/login'}>Login</Link>
                                        </div>
                                        <div onClick={Hadlemenu} className=' font-bold'>
                                            <Link href={'user/register'}>Regster</Link>
                                        </div>

                                    </>)
                            }

                        </section>
                    )
                }
            </div>
        </section>
    )
}

export default Usermenu