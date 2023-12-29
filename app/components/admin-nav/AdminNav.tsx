"use client"
import React from 'react'
import { adminNavoptions as adminOps } from '@/utils/AdminNav'
import Container from '@/components/Container'
import AdOpsComponent from './adminNavoptions'
import { BiAddToQueue, BiLibrary, BiLogoProductHunt, BiSolidDashboard } from 'react-icons/bi'
import { usePathname, useRouter } from 'next/navigation'
import { getCurrentUser } from '@/actions/getcurrentuser'

const AdminNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const user: any = getCurrentUser();
    if (!user && user.role !== "admin") {
        return (
            <>
                <p>Opps! Acces Decline</p>
                {router.push('/')}
            </>

        )
    }
    console.log('pathname', pathname)
    return (
        <section className=' bg-blue-500 p-2 max-w[1150px]'>
            <div className=" flex  flex-row items-center justify-around  mx-auto" >
                <div className={`text-white flex items-center gap-2  justify-around  w-[1150px]`}>

                    <AdOpsComponent title='Dashboard' Icon={BiSolidDashboard} onclick={() => { router.push('/admin') }} selected={pathname == "/admin"} />



                    <AdOpsComponent title='AddProduct' Icon={BiAddToQueue} onclick={() => { router.push('/admin/add-products') }} selected={pathname == "/admin/add-product"} />


                    <AdOpsComponent title='Manage Orders' Icon={BiLibrary} onclick={() => { router.push('/admin/manage-orders') }} selected={pathname == "/admin/manage-orders"} />


                    <AdOpsComponent title='Manage Products' Icon={BiLogoProductHunt} onclick={() => { router.push('/admin/manage-products') }} selected={pathname == "/admin/manage-products"} />


                </div>
            </div>
        </section>
    )
}

export default AdminNav