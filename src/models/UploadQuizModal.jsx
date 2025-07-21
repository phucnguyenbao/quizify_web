// src/views/components/UploadQuizModal.jsx

import React, { useState } from 'react';

export const UploadQuizModal = ({ onClose }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // DEBUG: In file ra để xem và loại bỏ cảnh báo "no-unused-vars"
    console.log('Selected file:', file);

    return (
        <div className="popup-backdrop">
            <div className="popup-container">
                <h2>Upload Quiz File</h2>
                <input type="file" onChange={handleFileChange} />
                <div style={{ marginTop: '20px' }}>
                    <button onClick={() => alert('Upload feature is in development!')}>Upload</button>
                    <button onClick={onClose} style={{ marginLeft: '10px' }}>Close</button>
                </div>
            </div>
        </div>
    );
};