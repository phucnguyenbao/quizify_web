import React from 'react';
// Giả sử file QuizPage.css đã có style cho modal. Nếu chưa, bạn có thể tạo file CSS riêng
import "../../assets/css/QuizPage.css";

const AddOptionModal = ({ onClose, onSelect }) => {
  return (
    <div className="simple-modal">
      <button onClick={() => onSelect('upload')}>Upload File</button>
      <button onClick={() => onSelect('ai')}>Generate by AI</button>

      {/* FIX: Thay thế thẻ <a> bằng thẻ <button> */}
      <button className="cancel-link" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default AddOptionModal;