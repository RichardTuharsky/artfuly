import './App.css';
import CollagePreviewAndDownload from './components/CollagePreviewAndDownload'; // Import the 'CollagePreviewAndDownload' component
import DragAndDropArea from './components/DragAndDropArea'; // Import the 'DragAndDropArea' component
import CollageCreator from './components/CollageCreator'; // Import the 'CollageCreator' component
import React, { useState } from 'react';
import ImagePreview from './components/ImagePreview';


const App = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [collageDataURL, setCollageDataURL] = useState('');

  const handleFilesAdded = (newImages) => {
    setUploadedImages(prevImages => [...prevImages, ...newImages]);
  };

  return (
    <div>
       <div className="app-container">
          <DragAndDropArea onFilesAdded={handleFilesAdded} />
        </div>
        <input type="file" id="imageUpload" accept="image/*" multiple style={{ display: 'none' }} />
        <input type="file" id="watermarkUpload" accept="image/*" style={{ display: 'none' }} />

          <CollagePreviewAndDownload collageDataURL={collageDataURL} />
          <div className="image-preview-container">
            <ImagePreview images={uploadedImages} />
          </div>
          <CollageCreator onCollageComplete={setCollageDataURL} />
    </div>
  );
};

export default App; 