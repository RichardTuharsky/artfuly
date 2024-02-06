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
    display: 'grid',
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

const thumbContainerStyle = {
  flex: '1 1 auto',
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: '20px'
};


function DragAndDropArea(props) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    const filePreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    props.onFilesAdded(filePreviews); // Assuming a prop named 'onFilesAdded'
  }, [props]);
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });



  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div style={containerStyle}>
      <section {...getRootProps({style: dropzoneStyle})}>
        <input {...getInputProps()} />
        <p>Drag and drop your images here.</p>
      </section>
      <input {...getInputProps()} aria-label="Drop images here" />

    </div>
    
  );
}

export default DragAndDropArea;
