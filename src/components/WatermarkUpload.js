import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function WatermarkUpload(props) {
    const [watermark, setWatermark] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            const watermarkURL = URL.createObjectURL(acceptedFiles[0]);
            setWatermark(watermarkURL);
            props.onWatermarkAdded(watermarkURL);
        }
    }, [props]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false
    });

    return (
        <div>
            <section {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop watermark here, or click to select file</p>
            </section>
            {watermark && <img src={watermark} alt="Watermark preview" style={{ width: '100px', height: '100px' }} />}
        </div>
    );
}

export default WatermarkUpload;
