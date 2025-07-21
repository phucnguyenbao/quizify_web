import React from 'react';
import '../../assets/css/GamePage.css'; // Dùng chung CSS hoặc tách riêng nếu muốn

const GameDetails = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ color: 'hotpink' }}>{game.name}</h3>
        <table className="detail-table">
          <thead>
            <tr>
              <th>ID</th><th>First</th><th>Last</th><th>Department</th><th>Team</th><th>Attempts</th><th>Max Score</th><th>Quiz</th>
            </tr>
          </thead>
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
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default GameDetails;
