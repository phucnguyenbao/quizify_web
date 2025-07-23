import React, { useEffect, useState } from 'react';
import '../../../assets/css/PlayPage.css';
import AvatarLibraryPopup from './AvatarLibraryPopup';
import { useAuth } from '../../AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/services';

export const WaitingRoom = ({ game, onStartQuiz, onExit }) => {
  const { user } = useAuth();
  const [soundOn, setSoundOn] = useState(true);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarFromDB, setAvatarFromDB] = useState(null);

  const memberId = user?.member_id;

  useEffect(() => {
    const fetchAvatarId = async () => {
      if (!memberId) return;
      try {
        const q = query(collection(db, 'user'), where('member_id', '==', memberId));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setAvatarFromDB(data.avatar_id || null);
          console.log("🎯 Avatar from DB:", data.avatar_id);
        } else {
          console.warn("⚠️ Không tìm thấy user với member_id:", memberId);
        }
      } catch (err) {
        console.error("❌ Lỗi khi lấy avatar_id:", err);
      }
    };

    fetchAvatarId();
  }, [memberId]);

  const handleStart = () => {
    document.body.classList.add('start-transition');
    document.querySelector('.waiting-room').classList.add('hide-content');
    setTimeout(() => {
      onStartQuiz();
    }, 870);
  };

  const handleAvatarSelect = (filename) => {
    setSelectedAvatar(filename);
    setShowAvatarPopup(false);
    setAvatarFromDB(filename); // ✅ Cập nhật ngay sau khi chọn
  };

  if (!game) return null;

  return (
    <div className="waiting-room">
      <h3 className="page-title">Game Lobby</h3>
      <div className="game-settings-box">
        <div className="settings-header">
          <div className="setting-item">
            <label>Choose Avatar</label>
            <button className="btn-list" onClick={() => setShowAvatarPopup(true)}>Image List</button>
          </div>
          <div className="setting-item">
            <span>Sound Effects</span>
            <button
              className={`btn-toggle ${soundOn ? 'on' : 'off'}`}
              onClick={() => setSoundOn(!soundOn)}
            >
              <span>{soundOn ? 'On' : 'Off'}</span>
            </button>
          </div>
          <div className="setting-item">
            <img
              src={
                selectedAvatar
                  ? `/assets/images/avatar/${selectedAvatar}`
                  : avatarFromDB
                    ? `/assets/images/avatar/${avatarFromDB}`
                    : 'image'
              }
              alt="avatar"
              className="avatar-preview"
            />
          </div>
        </div>

        <div className="game-info">
          <div className="info-row"><span>Time Limit</span><span>30 minutes</span></div>
          <div className="info-row"><span>Attempts Made / Allowed</span><span>7/8</span></div>
          <div className="info-row"><span>Highest Score</span><span>9</span></div>
        </div>

        <div className="start-game-actions">
          <button className="btn btn-primary" onClick={handleStart}>Start</button>
          <button className="btn-secondary" onClick={onExit}>Back</button>
        </div>
      </div>

      {showAvatarPopup && (
        <AvatarLibraryPopup
          onSelect={handleAvatarSelect}
          onClose={() => setShowAvatarPopup(false)}
        />
      )}
    </div>
  );
};
