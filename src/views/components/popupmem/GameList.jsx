import React from 'react';
import '../../../assets/css/popupmem/StatsAndLists.css';

// Dữ liệu mẫu
const gameData = [
    { id: 1, name: 'Onboarding Process', openDate: '23/07/2025' },
    { id: 2, name: 'Information Security', openDate: '23/07/2025' },
    { id: 3, name: 'Corporate Culture', openDate: '23/07/2025' },
];

const GameList = () => {
    return (
        <div className="stats-layout">
            <div className="stats-card" style={{ width: '100%' }}>
                <h3 className="stats-title">Game List</h3>
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Game</th>
                            <th>Open Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameData.map(game => (
                            <tr key={game.id}>
                                <td>{game.id}</td>
                                <td><span className="action-link">{game.name}</span></td>
                                <td>{game.openDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="card-footer">
                    <span className="action-link">View</span>
                    <span className="action-link">Cancel</span>
                </div>
            </div>
        </div>
    );
};

export default GameList;