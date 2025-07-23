import React, { useEffect } from 'react';
import '../../../assets/css/popupgamequiz/AddGame.css';

const GameDetails = ({ game, onClose }) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '90vh',    // Đảm bảo modal không bị tràn màn hình
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title">{game.name}</h2>

        <div className="table-container">
          <table className="detail-table">
            <thead>
              <tr>
                <th>ID</th><th>First</th><th>Last</th><th>Department</th><th>Team</th><th>Attempts</th><th>Max Score</th><th>Quiz</th>
              </tr>
            </thead>
          </table>

         <div class="table-wrapper">
            <table className="detail-table">
              <tbody>
                {game.players.length > 0 ? (
                  game.players.map((p, idx) => (
                    <tr key={idx}>
                      <td>{p.id}</td><td>{p.first}</td><td>{p.last}</td><td>{p.dept}</td><td>{p.team}</td><td>{p.attempts}</td><td>{p.maxScore}</td><td>{p.quiz}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8">No players yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
