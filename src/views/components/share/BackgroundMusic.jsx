import React, { useEffect, useRef, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/services';
import { useAuth } from '../../AuthContext';

const BackgroundMusic = ({ music: propMusic, sound: propSound }) => {
  const { user } = useAuth();
  const memberId = user?.member_id;
  const audioRef = useRef(null);

  const [music, setMusic] = useState('');
  const [sound, setSound] = useState('Off');

  // 🔄 Load từ Firestore
  useEffect(() => {
    const fetchMusicSetting = async () => {
      if (!memberId) return;

      try {
        const docRef = doc(db, 'user', memberId);
        const docSnap = await getDoc(docRef);
        console.log(`📛 Firestore path: user/${memberId}`);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('📀 Firestore data:', data);
          setMusic(data.music || '');
          setSound(data.background_sound || 'Off');
        }
      } catch (error) {
        console.error('❌ Error fetching Firestore:', error);
      }
    };

    fetchMusicSetting();
  }, [memberId]);

  // 🎵 Nhạc và trạng thái thực tế
  const finalMusic = propMusic || music;
  const finalSound = propSound || sound;
  const musicSrc = finalMusic ? `/assets/images/music/${finalMusic}` : '';

  // 🎧 In ra đường dẫn nhạc khi thay đổi
  useEffect(() => {
    if (finalMusic) {
      console.log('🎧 Music source:', musicSrc);
    }
  }, [finalMusic]);

  // 🔁 Phát / tắt nhạc khi trạng thái sound hoặc nhạc thay đổi
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlayback = async () => {
      if (finalSound === 'On' && finalMusic) {
        try {
          await audio.play();
          console.log('✅ Music playing:', musicSrc);
        } catch (error) {
          console.warn('⚠️ Autoplay blocked. Waiting for user interaction.', error);
        }
      } else {
        audio.pause();
        audio.currentTime = 0;
        console.log('🔇 Music stopped.');
      }
    };

    // Nếu nhạc đang loading, đợi sự kiện 'canplaythrough'
    const onCanPlayThrough = () => {
      if (finalSound === 'On') {
        audio.play().catch(err => {
          console.warn('⚠️ Play blocked after canplaythrough:', err);
        });
      }
    };

    audio.addEventListener('canplaythrough', onCanPlayThrough);
    handlePlayback();

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlayThrough);
    };
  }, [finalMusic, finalSound]);

  return finalMusic ? (
    <audio
      ref={audioRef}
      src={musicSrc}
      loop
      preload="auto"
    />
  ) : null;
};

export default BackgroundMusic;
