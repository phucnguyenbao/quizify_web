import React from 'react';
import '../../assets/css/AddGame.css'; 

const AddOptionModal = ({ onClose, onSelect }) => {
  return (
    <div className="small-overlay">
      <div className="option-modal">
        <button className="gradient-button" onClick={() => onSelect('upload')}>Upload File</button>
        <button className="gradient-button" onClick={() => onSelect('ai')}>Generate by AI</button>
        <button className="secondary-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddOptionModal;
