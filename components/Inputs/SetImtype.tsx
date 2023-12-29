"use client"
import React, { FC } from 'react'
import Dropzone, { useDropzone } from "react-dropzone"
interface SetImtypes {
    selectImage: (Value: File) => void;

}

const SetImtype: FC<SetImtypes> = ({ selectImage }) => {

    const onDrop = (img: File[]) => {
        console.log(img, 'file is recibed from brovers')
        if (img.length > 0) {
            console.log(img, 'imaage is selected in internal page')
            selectImage(img[0])
        }
    }
    const { isDragActive, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.svg', '.webp', '.png'] }

    })
    return (
        <div {...getRootProps()} className='  p-3  border-dotted border-2 border-slate-700'>
            <input {...getInputProps()} className='' />
            {
                isDragActive ? <p className=''>Drop Image Here</p> : <p> Drag and Drop imae or click here and choose image</p>
            }
        </div>
    )
}

export default SetImtype