import React, { useState } from 'react';
import '../assets/css/Footer.css';

const upcomingGames = [
  { name: 'Battle Arena', video: '/assets/images/BattleArena.mp4', poster: '/assets/images/BattleArena.mp4' },
  { name: 'Chess', video: '/assets/images/Chess.mp4', poster: '/assets/images/quiz-quest.png' },
  { name: 'Memory Match', video: '/assets/images/MemoryMatch.mp4', poster: '/assets/images/memory-match.png' },
  { name: 'Adventure Run', video: '/assets/images/AdventureRun.mp4', poster: '/assets/images/adventure-run.png' },
  { name: 'Guess the sound', video: '/assets/images/GuessTheSound.mp4', poster: '/assets/images/adventure-run.png' }
];

const Footer = () => {
  
  const [modalIndex, setModalIndex] = useState(null);

  return (
    <footer className="game-footer">
      <div className="footer-content">

        <div className="footer-about">
          <h4>About Quizify</h4>
          <p>
            Quizify is your go-to platform for team quizzes, fun games, and interactive learning. We aim to bring education and entertainment together! With a wide range of engaging games designed to challenge your mind and foster collaboration, Quizify is the perfect tool for teams, classrooms, or just a fun night with friends. Whether you're testing your memory, identifying sounds, or racing through trivia, our games are built to spark curiosity, encourage learning, and strengthen teamwork. Join us on a journey where knowledge meets excitement!
          </p>
          <p>Contact us: support@quizify.com</p>
        </div>

        <div className="footer-games">
          <h4>Upcoming Games</h4>
          <div className="game-preview">
            {upcomingGames.map((game, idx) => (
<div key={idx} className="game-item" onClick={() => setModalIndex(idx)}>
<video
  src={game.video}
  muted
  className="video-thumbnail"
  onMouseOver={e => {
    if (e.target.paused) {
      const playPromise = e.target.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Ngăn lỗi hiện ra console
          console.warn("Play interrupted:", error);
        });
      }
    }
  }}
  onMouseOut={e => {
    if (!e.target.paused) {
      e.target.pause();
      e.target.currentTime = 0;
    }
  }}
/>

  <span>{game.name}</span>
</div>

            ))}
          </div>
        </div>
      </div>

      <p className="footer-note">© 2025 Quizify. All rights reserved.</p>

      {/* MODAL */}
      {modalIndex !== null && (
        <div className="game-modal" onClick={() => setModalIndex(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <video
              src={upcomingGames[modalIndex].video}
              autoPlay
              loop
              muted
              controls
              className="modal-video"
            />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
