import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const CollagePreviewAndDownload = ({ collageDataURL }) => {
    if (!collageDataURL) return null;

    const downloadCollage = () => {
        const zip = new JSZip();
        fetch(collageDataURL)
            .then(response => response.blob())
            .then(blob => {
                zip.file("collage.png", blob, { base64: true });
                zip.generateAsync({ type: "blob" }).then(content => {
                    saveAs(content, "collage.zip");
                });
            });
    };

    return (
        <div>
            <img src={collageDataURL} alt="Collage" style={{width: '500px', height: '500px'}}/>
            <button onClick={downloadCollage}>Download Collage</button>
        </div>
    );
};

export default CollagePreviewAndDownload;
