import React, { useState, useRef } from 'react';


const CollageCreator = ({onCollageComplete}) => {
    const canvasRef = useRef(null);

    const createCollage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const images = document.getElementById('imageUpload').files;
        const watermark = document.getElementById('watermarkUpload').files[0];
        const horizontalCountElement = document.getElementById('horizontalCount');
        const verticalCountElement = document.getElementById('verticalCount');
    
        // Safely get the values from the elements, defaulting to 1 if they're not found
        const horizontalCount = horizontalCountElement ? parseInt(horizontalCountElement.value) : 1;
        const verticalCount = verticalCountElement ? parseInt(verticalCountElement.value) : 1;

        canvas.width = 2000;
        canvas.height = 2000;

        let promises = [];
        for (let i = 0; i < images.length; i++) {
            let img = new Image();
            img.src = URL.createObjectURL(images[i]);
            promises.push(new Promise((resolve, reject) => {
                img.onload = () => resolve(img);
                img.onerror = reject;
            }));
        }

        Promise.all(promises).then(loadedImages => {
            
            if (loadedImages.length > 0 && loadedImages[0].width) {
                canvas.width = loadedImages[0].width * horizontalCount;
                canvas.height = loadedImages[0].height * verticalCount;

                for (let i = 0; i < verticalCount; i++) {
                    for (let j = 0; j < horizontalCount; j++) {
                        let index = i * horizontalCount + j;
                        if (index < loadedImages.length) {
                            context.drawImage(loadedImages[index], j * loadedImages[0].width, i * loadedImages[0].height, loadedImages[0].width, loadedImages[0].height);
                        }
                    }
                }
            } else {
                console.error('No images or invalid image width');
            }

            addWatermark(watermark, canvas, context);
        });
    };

    const addWatermark = (watermark, canvas, context) => {
        let watermarkCanvas = document.createElement('canvas');
        let watermarkContext = watermarkCanvas.getContext('2d');
        watermarkCanvas.width = canvas.width;
        watermarkCanvas.height = canvas.height;

        let watermarkImg = new Image();
        watermarkImg.src = URL.createObjectURL(watermark);
        watermarkImg.onload = () => {
            let watermarkWidth = watermarkImg.width;
            let watermarkHeight = watermarkImg.height;

            for (let i = 0; i < watermarkCanvas.height; i += watermarkHeight) {
                for (let j = 0; j < watermarkCanvas.width; j += watermarkWidth) {
                    watermarkContext.globalAlpha = 0.3;
                    watermarkContext.drawImage(watermarkImg, j, i, watermarkWidth, watermarkHeight);
                }
            }

            context.drawImage(watermarkCanvas, 0, 0);
            generateCollage(canvas);
        };
    };

    const generateCollage = (canvas) => {
        // Remove the zip and saveAs logic
        // Set the collage image data URL to pass to the parent component
        const collageDataURL = canvas.toDataURL('image/png');
        onCollageComplete(collageDataURL);
    };

    return (
        <div>
            <button onClick={createCollage}>Create Collage</button>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default CollageCreator;
