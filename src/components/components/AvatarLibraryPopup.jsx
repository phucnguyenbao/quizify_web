// src/components/AvatarLibraryPopup.jsx
import React from 'react';
import '../../assets/css/popupheader/AvatarLibraryPopup.css'; // nếu có CSS riêng

const avatarList = [
'bird.png', 'panda.png', 'cat.png', 'chicken.png', 'crocodile.png', 'dog.png', 'dolphin.png', 'dragon.png', 'elephant.png', 'frog.png', 'hippo.png', 'lion.png', 'monkey.png', 'nemo.png', 'otter.png', 'pig.png', 'snake.png', 'tiger.png', 'penguin.png', 'wolf.png'

];

const AvatarLibraryPopup = ({ onSelect, onClose }) => {
  return (
      <div className="avatar-library-popup">
        <h3>Choose your avatar</h3>
        <div className="avatar-grid">
          {avatarList.map((filename) => (
            <img
              key={filename}
              src={`/assets/images/avatar/${filename}`} // dùng public path
              alt={filename}
              onClick={() => onSelect(filename)}
              className="avatar-item"
            />
          ))}
        </div>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
  );
};

export default AvatarLibraryPopup;
