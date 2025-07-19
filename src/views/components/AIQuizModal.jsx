import React, { useState } from 'react';
import "../../assets/css/QuizPage.css";

const AIQuizModal = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');

  return (
<div className="popup-container">
  <span className="popup-title">AI tạo quiz</span>

  <div className="popup-content">
    <input
      type="text"
      placeholder="Nhập prompt"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
    />
    <button className="popup-btn">Tạo</button>
    <span className="popup-cancel" onClick={onClose}>Cancel</span>
  </div>
</div>

  );
};

export default AIQuizModal;
