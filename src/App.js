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
          <CollageCreator onCollageComplete={setCollageDataURL} />
          <CollagePreviewAndDownload collageDataURL={collageDataURL} />
          <div className="image-preview-container">
            <ImagePreview images={uploadedImages} />
          </div>
    </div>
  );
};

export default App; 