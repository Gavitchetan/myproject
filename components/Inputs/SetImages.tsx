'use client'

import { ImageType } from '@/types/products.type'
import React, { ChangeEvent, Fragment, useCallback, useEffect, useState } from 'react'
import SetImtype from './SetImtype';

interface setImageProps {
    item: ImageType,
    addImageToState: (value: ImageType) => void;
    removeImageFromState: (value: ImageType) => void;
    isProductCreted: boolean;

}
const SetImages: React.FC<setImageProps> = ({ item, addImageToState, removeImageFromState, isProductCreted }) => {
    const [selected, setSelected] = useState<boolean>(false)
    const [files, setFile] = useState<File | null>(null)

    useEffect(() => {
        if (isProductCreted) {
            setSelected(false)
        }
    }, [isProductCreted])

    const fileChange = useCallback(
        (image: File) => {
            console.log(files, 'file is selected')
            setFile(image)
            addImageToState({ ...item, image: image })
        },
        [addImageToState],
    )

    const OnchangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSelected(!selected);

        if (!selected) {
            setFile(null)

        }

    }
    return (
        <div className=' p-8 border-2 border-slate-400'>
            <div className=" flex flex-col gap-2">
                <div className=" flex gap-3 items-center ">
                    <input type="checkbox" onChange={OnchangeInput} />
                    <p>{item.color}</p>
                </div>
                <div className="">

                    {selected && !files && (
                        <SetImtype selectImage={fileChange} />
                    )}

                    {
                        files &&
                        <Fragment>

                            <div className=" flex items-start gap-3">
                                <span>{files.name}</span>
                                <button className=' bg-rose-400 text-white  p-2 rounded-md hover:bg-red-600' onClick={() => { setFile(null) }} >cancel</button>
                            </div>
                        </Fragment>

                    }

                </div>
            </div>

        </div>
    )
}

export default SetImages