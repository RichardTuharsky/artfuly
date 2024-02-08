import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between'
};

const dropzoneStyle = {
  flex: '0 0 auto',
    display: 'flex',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
  width: '500px',
  height: '200px',
  overflow: 'hidden'
};




function DragAndDropArea(props) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      // Create file previews
      const filePreviews = acceptedFiles.map(file => URL.createObjectURL(file));
      
      // Update state or lift state up with the new file previews
      props.onFilesAdded(filePreviews);

      // Log success message to the console
      console.log("Images accepted, success");
    } else {
      // Log failure message to the console
      console.log("Can't see images");
    }
  }, [props]);
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });

  



  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div>
      <section {...getRootProps({style: dropzoneStyle})}>
        <input {...getInputProps()} />
        <p>Drag and drop your images here.</p>
      </section>
      <input {...getInputProps()} aria-label="Drop images here" />

    </div>
    
  );
}

export default DragAndDropArea;
