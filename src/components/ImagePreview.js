import React from 'react';

const thumbStyle = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const imgStyle = {
  display: 'block',
  width: '100%',
  height: '100%'
};

const ImagePreview = ({ images }) => {
  return (
    <aside style={{ display: 'flex', flexWrap: 'wrap' }}>
      {images.map((image, index) => (
        <div style={thumbStyle} key={index}>
          <img
            src={image}
            alt={`Uploaded ${index}`}
            style={imgStyle}
          />
        </div>
      ))}
    </aside>
  );
};

export default ImagePreview;
