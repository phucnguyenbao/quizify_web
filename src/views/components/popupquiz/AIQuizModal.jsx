import React, { useEffect, useState } from 'react';
import '../../../assets/css/popupgamequiz/AddGame.css';

const AIQuizModal = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    // Khóa scroll nền
    document.body.style.overflow = 'hidden';

    // Scroll về đầu trang để modal ở chính giữa màn hình hiện tại
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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
