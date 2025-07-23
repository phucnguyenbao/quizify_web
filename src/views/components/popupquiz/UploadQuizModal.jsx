import React, { useEffect, useState } from 'react';
import '../../../assets/css/popupgamequiz/AddGame.css';

const UploadQuizModal = ({ onClose, onUpload }) => {
    const [file, setFile] = useState(null);

    useEffect(() => {
        // Khóa scroll
        document.body.style.overflow = 'hidden';
        // Scroll về đầu trang
        window.scrollTo({ top: 0, behavior: 'smooth' });

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }
        onUpload(file);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="ai-modal"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="modal-title">Upload Quiz from File</h2>
                <div className="modal-body">
                    <p>Please select a file to upload (.xls, .csv)</p>

                    <input 
                        type="file" 
                        accept=".xlsx, .xls, .csv"
                        onChange={handleFileChange} 
                    />

                    {file && (
                        <div className="selected-file">
                            Selected file: <strong>{file.name}</strong>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="gradient-button" onClick={handleUpload}>Upload</button>
                    <button className="secondary-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UploadQuizModal;
