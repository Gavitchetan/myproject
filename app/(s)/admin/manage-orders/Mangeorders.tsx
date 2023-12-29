"use client"
import React, { useState, DragEvent, ChangeEvent } from 'react';

const ImageInput: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = () => {
                setImage(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = () => {
                setImage(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                width: '300px',
                height: '300px',
                border: '2px dashed #aaa',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {image ? (
                <img
                    src={image}
                    alt="Dropped Image"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <p>Drag & drop an image here or click to select</p>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default ImageInput;
