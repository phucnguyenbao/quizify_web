import React, { useState } from 'react';
import '../../../assets/css/popupgamequiz/AddGame.css';

const AIQuizModal = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="modal-overlay small-overlay">
      <div className="ai-modal">
        <h2 className="modal-title">AI Quiz Generator</h2>
        <input
          className="ai-input"
          type="text"
          placeholder="Enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="modal-footer">
          <button className="gradient-button">Gen</button>
          <button className="secondary-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AIQuizModal;
