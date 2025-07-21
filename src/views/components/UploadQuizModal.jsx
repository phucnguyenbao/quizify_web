import React, { useState } from 'react';
import "../../assets/css/QuizPage.css";

const UploadQuizModal = ({ onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="popup-container">
      <span className="popup-title">Upload File to Create Quiz</span>

      <div className="popup-content">
        <input
          type="file"
          onChange={handleFileChange}
        />
        <button className="popup-btn">Generate</button>
        <span className="popup-cancel" onClick={onClose}>Cancel</span>
      </div>
    </div>
  );
};

export default UploadQuizModal;
