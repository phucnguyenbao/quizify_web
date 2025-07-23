import React, { useEffect, useRef } from 'react';

const BackgroundMusic = ({ music, sound }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (sound === 'On' && music) {
      audio.play().catch((e) =>
        console.warn('Auto-play blocked by browser:', e)
      );
    } else {
      audio.pause();
    }
  }, [sound, music]);

  return (
    music ? (
      <audio
        ref={audioRef}
        src={`/assets/images/music/${music}`}
        loop
        preload="auto"
      />
    ) : null
  );
};

export default BackgroundMusic;
