import React, { useState, useRef } from 'react';

const CollageCreator = ({ onCollageComplete, uploadedImages, watermarkURL }) => {
    const canvasRef = useRef(null);


    const createCollage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const horizontalCountElement = document.getElementById('horizontalCount');
        const verticalCountElement = document.getElementById('verticalCount');
        

        const horizontalCount = horizontalCountElement ? parseInt(horizontalCountElement.value) : 1;
        const verticalCount = verticalCountElement ? parseInt(verticalCountElement.value) : 1;

        
        canvas.width = 500;
        canvas.height = 500;
        console.log('Canvas Size:', canvas.width, canvas.height);


        let promises = uploadedImages.map(imageSrc => {
            let img = new Image();
            img.src = imageSrc;
            return new Promise((resolve, reject) => {
                img.onload = () => resolve(img);
                img.onerror = reject;
            });
        });

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

            if (watermarkURL) {
                addWatermark(watermarkURL, canvas, context);
            } else {
                generateCollage(canvas);
            }
        });
    };

    const addWatermark = (watermarkURL, canvas, context) => {
        let watermarkCanvas = document.createElement('canvas');
        let watermarkContext = watermarkCanvas.getContext('2d');
        watermarkCanvas.width = canvas.width;
        watermarkCanvas.height = canvas.height;

        let watermarkImg = new Image();
        watermarkImg.src = watermarkURL;
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
