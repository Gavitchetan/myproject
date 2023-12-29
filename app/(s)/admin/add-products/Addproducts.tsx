"use client"
import Container from '@/components/Container'
import Input from '@/components/Inputs/Input'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { ImageType } from '@/types/products.type'
import CustomCheckbox from '@/components/Inputs/CustomCheckbox'
import Button from '@/components/Button'
import Heading from '@/components/Heading'
import ProductsCategory from '@/utils/CateDat'
import Category from '@/components/Inputs/Category'
import colors from '@/utils/ImageColors'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import storage from '@/libs/firebase'
import axios from 'axios'
import SetImages from '@/components/Inputs/SetImages'
import { compareSync } from 'bcryptjs'
import Textarea from '@/components/Inputs/Textarea'


const AddProducts = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [ImagesState, setImagesState] = useState<ImageType[] | null>(null);

    const { register, setValue, watch, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            brand: '',
            price: "",
            description: '',
            category: 'all',
            stock: true,
            images: []
        }
    });

    const categoryIs = watch('category');

    const setCustomValue = (id: string, data: any) => {
        setValue(id, data, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    const changeCategory = (data: any) => {
        setCustomValue('category', data);
    };

    const addImagesTostate = useCallback(
        (value: ImageType) => {
            setImagesState((prev) => {
                if (!prev) {
                    return [value]
                }
                return [...prev, value]
            })

        },
        [],
    )

    const removeImageFromState = useCallback(
        (value: ImageType) => {
            if (value) {
                setImagesState((prev) => {
                    if (prev) {
                        const filterimg = prev.filter((item) => item.color !== value.color)
                        return filterimg
                    }

                    return prev
                })

            }
        },
        [],
    )

    useEffect(() => {
        setCustomValue('images', ImagesState)
        console.log('uploaded', ImagesState);

    }, [ImagesState, addImagesTostate, removeImageFromState, onsubmit])


    useEffect(() => {
        setValue('images', ImagesState);
    }, [ImagesState]);

    const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
        setLoading(true);

        const uploadedImages: any[] = [];

        try {
            if (!data.category) {
                return toast.error('Please select a category first');
            }
            if (!data.images) {
                return toast.error('Please select at least one image');
            }
            const uploadImages = data.images.map((item: ImageType) => {
                if (!item.image) {
                    return toast.error('Image is not selected, please select an image');
                }
                const filename = new Date().getTime() + '-' + item.image?.name;
                const storageRef = ref(storage, `products/${filename}`);
                const uploadTask = uploadBytesResumable(storageRef, item.image);
                return new Promise<void>((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) + 100;

                            switch (snapshot.state) {
                                case 'paused':
                                    console.log('paused');
                                    break;
                                case 'running':
                                    toast(`mage upload is runnit ${progress}`)
                                    console.log('upload is running', progress);
                                    break;
                            }
                        },
                        (error) => {
                            console.error(error, 'error while uploading images');
                            reject(error);
                        },
                        async () => {
                            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

                            uploadedImages.push({
                                ...item,
                                image: downloadUrl
                            });
                            console.log(downloadUrl, 'downloaded urls ');
                            resolve();
                        }
                    );
                });
            });

            await Promise.all(uploadImages);
            setCustomValue('images', uploadedImages)

            console.log('uploaded iamges are succesfulyy ', uploadedImages)
            console.log(data, 'after uloading images');
            const post_data = {
                name: data.name,
                price: data.price,
                brand: data.brand,
                description: data.description,
                inStock: data.stock,
                category: data.category,
                images: uploadedImages
            }
            toast('product is adding into database plesea wait')
            const produc_new = axios.post('/api/v1/product', post_data).then((cb) => {
                console.log(cb)
                setLoading(false)
            }).catch((e) => {
                setLoading(false)
                console.log('error')
            }).finally(() => {
                setLoading(false)
            })
            setLoading(false)
            console.log(produc_new, 'produc new')
        } catch (error) {
            console.error(error, 'error in form submission');
            // Handle errors...
        }

        setLoading(false);
    };

    return (
        <div className='p-8'>
            <Container>
                <Heading label='Add product' />
                <section className="flex flex-col gap-3">
                    {/* Other form inputs */}


                    <section className="  flex flex-col gap-3">

                        <Input required={true} disabled={isLoading} label='Name' id='name' register={register} errors={errors} placeHolder='John Doe' />

                        <Textarea required disabled={isLoading} label='description' id='description' register={register} errors={errors} />
                        <Input required={true} disabled={isLoading} label='Price' type='number' id='price' register={register} errors={errors} placeHolder='100 usd' />


                        <Input required={true} disabled={isLoading} label='Brand' id='brand' register={register} errors={errors} placeHolder='Apple , samsung or else ' />

                        <CustomCheckbox id='stock' register={register} label='Stock' errors={errors} disabled={isLoading} required={true} />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-12">
                            {
                                ProductsCategory.map((category) => (
                                    // <div className="">{category.label}</div>
                                    <Category hadleChange={changeCategory} label={category.label} key={category.label} selected={category.label == categoryIs} icon={category.icon} />
                                ))
                            }
                        </div>
                        <div className="  gap-y-8  grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {
                                colors.map((item) => (
                                    <SetImages item={item} addImageToState={addImagesTostate} removeImageFromState={removeImageFromState} key={item.color} isProductCreted={false} />
                                ))
                            }

                        </div>
                    </section>
                </section>
                <Button label={isLoading ? 'Loading...' : 'Add Product'} onclick={handleSubmit(onSubmit)} />
            </Container>
        </div>
    );
};

export default AddProducts;
