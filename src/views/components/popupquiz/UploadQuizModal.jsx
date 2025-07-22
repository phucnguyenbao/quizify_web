import React, { useState } from 'react';
import '../../../assets/css/popupgamequiz/AddGame.css';

const UploadQuizModal = ({ onClose, onUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <div className="modal-overlay small-overlay">
            <div className="ai-modal">
                  <h2 className="modal-title">Upload Quiz from File</h2>
                <div className="modal-body">
                    <p>Please select a file to upload (.xls, .csv)</p>
                    
                    <input 
                        type="file" 
                        accept=".xlsx, .xls, .csv"
                        onChange={handleFileChange} 
                    />

                    {/* FIX: Sử dụng biến 'file' để hiển thị tên file đã chọn */}
{file && (
  <div className="selected-file">
    <p>Selected file: <strong>{file.name}</strong></p>
  </div>
)}

                </div>
                    <div className="modal-footer">
                    <button className="gradient-button">Upload</button>
                    <button className="secondary-button" onClick={onClose}>Cancel</button>
                    </div>
            </div>
        </div>
    );
};

export default UploadQuizModal;