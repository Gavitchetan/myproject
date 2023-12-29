'use client'
import Button from '@/components/Button'
import Input from '@/components/Inputs/Input'
import storage from '@/libs/firebase'
import { Safeuser } from '@/types/indexforuser'
import { StorageReference, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import axios from "axios"
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AiFillEye } from 'react-icons/ai'

import { getAuth, createUserWithEmailAndPassword, updateProfile, Auth } from 'firebase/auth';
import { toast } from 'react-toastify'


const RegisterForm = () => {
    const [isLoading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState<File | null>(null);
    const router = useRouter();

    const auth: Auth = getAuth(); // Get Firebase Auth instance

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            avatar: ''
        }
    });

    const setimg = (img: File) => {
        setAvatar(img);
    };
    const setCstomValue = (id: string, data: any) => {
        setValue(id, data, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }
    const Onsubmit: SubmitHandler<FieldValues> = async (data: any) => {
        setLoading(true);
        toast('Register In Procces')
        console.log('data before img upload', data)

        try {
            // Create user with email and password
            // Upload avatar to Firebase Storage

            if (avatar) {
                const fileName = new Date().getTime() + '-' + avatar?.name;
                const avatarRef: StorageReference = ref(storage, `avatars/${fileName}`);
                const uploadTask = uploadBytesResumable(avatarRef, avatar);
                // Wait for the upload to complete
                await uploadTask;
                // Get the download URL
                const downloadURL = await getDownloadURL(avatarRef);

                // Update user profile with the avatar URL
                setCstomValue('avatar', downloadURL)
                console.log(downloadURL, 'dowload url')
                const postdata = { data }
                const creteUser = await axios.post('/api/v1/user/register', postdata).then((cb) => {
                    console.log(cb, cb)
                })

            } else {
                // Update user profile without avatar
                return toast.error('please select a image')
            }

            console.log(data, 'data')
            // Redirect to home page
            router.push('/');
            setLoading(false)
        } catch (error) {
            console.error('Error creating user:', error);
            setLoading(false)
        }


        setLoading(false);
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className="md:w-[50%] gap-4 flex flex-col">
                {/* ... Other form inputs */}
                <Input register={register} errors={errors} id='name' placeHolder='John Doe' label='name' disabled={isLoading} required={true} />

                <Input register={register} errors={errors} id='email' placeHolder='abc123@gmail.com' type='email' label='email' disabled={isLoading} required={true} />

                {/* <input type="file" onChange={(file: File) => { setimg(file) }} /> */}

                <Input register={register} errors={errors} id='password' type='password' label='password' disabled={isLoading} required={true} Icons={AiFillEye} />

                <input type="file" onChange={(e) => { setimg(e.target.files![0]) }} />

                {avatar && (
                    <div className="flex flex-row gap-2 text-sm col-span-2">
                        <p>{avatar.name}</p>
                        <div className="w-[70px]">
                            <Button label="cancel" onclick={() => setAvatar(null)} />
                        </div>
                    </div>
                )}

                <Button label={isLoading ? "Loading..." : "Register"} onclick={handleSubmit(Onsubmit)} />
            </div>
        </div>
    );
};

export default RegisterForm;
