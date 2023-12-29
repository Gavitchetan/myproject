'use client'
import Button from '@/components/Button'
import Input from '@/components/Inputs/Input'
import { Safeuser } from '@/types/indexforuser'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AiFillEye } from 'react-icons/ai'
import { toast } from 'react-toastify'

interface loginformInterfa {
    user: Safeuser | null
}

const Loginform: React.FC<loginformInterfa> = ({ user }) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            router.push('/')

        }
        router.refresh
    }, [isLoading])
    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const Onsubmit: SubmitHandler<FieldValues> = async (data: any) => {
        console.log(data)
        setLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((cb) => {
            if (cb?.ok) {
                router.push('/')
                toast.success('/login succesfully')
                router.refresh()
            }
        })
    }

    const router = useRouter();


    return (
        <section className=" w-full  flex items-center justify-center ">
            <div className="md:w-[50%] gap-4   flex flex-col ">

                <Input register={register} errors={errors} id='email' placeHolder='abc123@gmail.com' type='email' label='email' disabled={isLoading} required />

                <Input register={register} errors={errors} id='password' type='password' label='password' disabled={isLoading} required Icons={AiFillEye} />



                <Button label={isLoading ? "Loading..." : "Login"} onclick={handleSubmit(Onsubmit)} />
            </div>
        </section>

    )
}

export default Loginform