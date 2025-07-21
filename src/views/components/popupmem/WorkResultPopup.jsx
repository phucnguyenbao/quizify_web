import React from 'react';
import '../../../assets/css/popupmem/Popups.css';

const WorkResultPopup = ({ memberInfo, onClose }) => {
    return (
        <div className="popup-backdrop">
            <div className="popup-content">
                <div className="popup-header"><h2 className="popup-title">Work Results: {memberInfo.name}</h2></div>
                <h3 className="popup-section-title">Completed Games</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table className="popup-table">
                        <thead><tr><th>Game Name</th><th>Topic</th><th>Game Code</th><th>Attempts</th><th>Avg. Score</th><th>High Score</th><th>Actions</th></tr></thead>
                        <tbody>{memberInfo.completedGames.map(game => (<tr key={game.id}><td>{game.name}</td><td>{game.topic}</td><td>{game.gameCode}</td><td>{game.attempts}</td><td>{game.avgScore}</td><td>{game.highScore}</td><td><span className="popup-link">Play</span></td></tr>))}</tbody>
                    </table>
                </div>
                <h3 className="popup-section-title">Attempt Details: Game 1</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table className="popup-table">
                        <thead><tr><th>Attempt</th><th>Score</th><th>Time</th></tr></thead>
                        <tbody>{memberInfo.attemptDetails.map(detail => (<tr key={detail.attempt}><td>{detail.attempt}</td><td>{detail.score}</td><td>{detail.time}</td></tr>))}</tbody>
                    </table>
                </div>
                <div className="popup-footer"><span className="popup-link" onClick={onClose}>Close</span></div>
            </div>
        </div>
    );
};
export default WorkResultPopup;