import React, { useEffect } from 'react';
import '../../../assets/css/popupgamequiz/AddGame.css';

const AddOptionModal = ({ onClose, onSelect }) => {

  useEffect(() => {
    // Khóa scroll
    document.body.style.overflow = 'hidden';

    // Scroll về đầu trang
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="small-overlay" onClick={onClose}>
      <div
        className="option-modal"
        style={{
          position: 'fixed',
          top: '50%',            // Giữa màn hình theo chiều dọc
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000
        }}
        onClick={(e) => e.stopPropagation()}  // Ngăn click xuyên modal
      >
        <button className="gradient-button" onClick={() => onSelect('upload')}>Upload File</button>
        <button className="gradient-button" onClick={() => onSelect('ai')}>Generate by AI</button>
        <button className="secondary-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddOptionModal;
