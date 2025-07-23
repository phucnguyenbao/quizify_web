// AvatarLibraryPopup.js
import React, { useEffect, useState } from 'react';
import '../../../assets/css/popupplay/AvatarLibraryPopup.css';
import { useAuth } from '../../AuthContext';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../../../firebase/services";

const avatarList = [
  'bird.png', 'panda.png', 'cat.png', 'chicken.png', 'crocodile.png', 'dog.png',
  'dolphin.png', 'dragon.png', 'elephant.png', 'frog.png', 'hippo.png',
  'lion.png', 'monkey.png', 'nemo.png', 'otter.png', 'pig.png',
  'snake.png', 'tiger.png', 'penguin.png', 'wolf.png'
];

const AvatarLibraryPopup = ({ onSelect, onClose }) => {
  const { user } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const memberId = user?.member_id;

  useEffect(() => {
    console.log("📌 AuthContext.member_id:", memberId);
  }, [memberId]);

  const handleConfirm = async () => {
    if (!memberId || !selectedAvatar) return;

    try {
      const q = query(collection(db, "user"), where("member_id", "==", memberId));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0]; // giả sử duy nhất 1 user match
        const userRef = doc(db, "user", userDoc.id);

        await updateDoc(userRef, { avatar_id: selectedAvatar });
        console.log(`✅ Avatar "${selectedAvatar}" cập nhật cho member_id: ${memberId}`);

        onSelect(selectedAvatar);
        onClose();
        window.location.reload(); 
      } else {
        console.warn("⚠️ Không tìm thấy user với member_id:", memberId);
      }
    } catch (err) {
      console.error("❌ Lỗi cập nhật avatar:", err);
    }
  };

  return (
    <div className="avatar-library-popup">
      <h3>Choose your avatar</h3>
      <div className="avatar-grid">
        {avatarList.map((filename) => (
          <img
            key={filename}
            src={`/assets/images/avatar/${filename}`}
            alt={filename}
            onClick={() => setSelectedAvatar(filename)}
            className={`avatar-item ${selectedAvatar === filename ? 'selected' : ''}`}
          />
        ))}
      </div>

      <div className="popup-buttons">
        <button 
          onClick={handleConfirm} 
          disabled={!selectedAvatar} 
          className="select-btn"
        >
          Choose
        </button>
        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default AvatarLibraryPopup;
