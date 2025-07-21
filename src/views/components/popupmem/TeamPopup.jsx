import React from 'react';
// Popup này được render trực tiếp nên ta import CSS chính
import '../../../assets/css/popupmem/UserPage.css';
const TeamPopup = ({ teams, onClose }) => {
    return (
        <div className="glass-card" style={{ marginTop: '20px' }}>
            <h3 style={{ marginTop: 0, color: '#3e52a8' }}>Team Details</h3>
            <table className="management-table">
                <thead><tr><th>Team</th><th>Leader</th><th>Members</th><th>Games</th></tr></thead>
                <tbody>{teams.map(team => (<tr key={team.id}><td>{team.name}</td><td>{team.leader}</td><td>{team.members}</td><td>{team.games}</td></tr>))}</tbody>
            </table>
            <div style={{ textAlign: 'right', marginTop: '15px' }}>
                <span className="action-link" style={{ marginRight: '15px' }}>Edit</span>
                <span className="action-link" onClick={onClose}>Close</span>
            </div>
        </div>
    );
};
export default TeamPopup;