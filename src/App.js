import React, { useState } from 'react';
import './App.css';
import CollagePreviewAndDownload from './components/CollagePreviewAndDownload';
import DragAndDropArea from './components/DragAndDropArea';
import CollageCreator from './components/CollageCreator';
import ImagePreview from './components/ImagePreview';
import WatermarkUpload from './components/WatermarkUpload';

const App = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [collageDataURL, setCollageDataURL] = useState('');
    const [watermarkURL, setWatermarkURL] = useState(null);

    const handleFilesAdded = (newImages) => {
        setUploadedImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleWatermarkAdded = (watermark) => {
        setWatermarkURL(watermark);
    };

    return (
        <div>
            <div className="app-container">
                <DragAndDropArea onFilesAdded={handleFilesAdded} />
            </div>
                <WatermarkUpload onWatermarkAdded={handleWatermarkAdded} />
            <CollagePreviewAndDownload collageDataURL={collageDataURL} />
            <div className="image-preview-container">
                <ImagePreview images={uploadedImages} />
            </div>
            <CollageCreator 
                onCollageComplete={setCollageDataURL} 
                uploadedImages={uploadedImages}
                watermarkURL={watermarkURL}
            />        </div>
    );
};

export default App;
