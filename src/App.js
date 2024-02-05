import './App.css';
import CollagePreviewAndDownload from './components/CollagePreviewAndDownload'; // Import the 'CollagePreviewAndDownload' component
import DragAndDropArea from './components/DragAndDropArea'; // Import the 'DragAndDropArea' component
import CollageCreator from './components/CollageCreator'; // Import the 'CollageCreator' component
import ImagePreview from './components/ImagePreview'; // Import the 'ImagePreview' component
import React, { useState } from 'react';

const App = () => {
  const [collageDataURL, setCollageDataURL] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  return (
      <div>
          <CollageCreator onCollageComplete={setCollageDataURL} />
          <CollagePreviewAndDownload collageDataURL={collageDataURL} />
          <ImagePreview images={uploadedImages} />
          <DragAndDropArea setUploadedImages={setUploadedImages} />
      </div>
  );
};

export default App;