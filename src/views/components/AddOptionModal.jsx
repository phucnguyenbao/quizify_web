import React from 'react';
import "../../assets/css/QuizPage.css";

const AddOptionModal = ({ onClose, onSelect }) => {
  return (
    <div className="simple-modal">
      <button onClick={() => onSelect('upload')}>Nhập file</button>
      <button onClick={() => onSelect('ai')}>Tạo bằng AI</button>
      <a href="#" className="cancel-link" onClick={onClose}>Cancel</a>
    </div>
  );
};

export default AddOptionModal;
