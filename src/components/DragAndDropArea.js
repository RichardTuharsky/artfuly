import React, { useState } from 'react';

const DragAndDropArea = () => {
    const [dragOver, setDragOver] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);

        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        const images = files.map(file => {
            return URL.createObjectURL(file);
        });

        setUploadedImages(prevImages => [...prevImages, ...images]);
    };

    return (
        <div 
            onDragOver={handleDragOver} 
            onDragLeave={handleDragLeave} 
            onDrop={handleDrop} 
            style={{ borderColor: dragOver ? 'green' : '#ccc' }}
        >
            Drop images here
            <div>
                {uploadedImages.map((src, index) => (
                    <img 
                        key={index} 
                        src={src} 
                        alt={`Uploaded ${index}`} 
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                        onLoad={() => URL.revokeObjectURL(src)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DragAndDropArea;
