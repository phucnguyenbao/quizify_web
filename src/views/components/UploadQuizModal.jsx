import React, { useState } from 'react';
// Giả sử bạn có một file CSS chung cho các modal
import '../../assets/css/QuizPage.css';

const UploadQuizModal = ({ onClose, onUpload }) => {
    // Dòng này gây ra lỗi vì biến 'file' không được sử dụng
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Upload Quiz from File</h2>
                </div>
                <div className="modal-body">
                    <p>Please select a file to upload (.xls, .csv)</p>
                    
                    <input 
                        type="file" 
                        accept=".xlsx, .xls, .csv"
                        onChange={handleFileChange} 
                    />

                    {/* FIX: Sử dụng biến 'file' để hiển thị tên file đã chọn */}
                    {file && (
                        <div style={{ marginTop: '15px', color: 'green' }}>
                            <p>Selected file: <strong>{file.name}</strong></p>
                        </div>
                    )}

                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={() => onUpload(file)}>Upload</button>
                </div>
            </div>
        </div>
    );
};

export default UploadQuizModal;