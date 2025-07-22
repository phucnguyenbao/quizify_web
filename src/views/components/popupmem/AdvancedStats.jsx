import React, { useState } from 'react';
import '../../../assets/css/popupmem/AdvancedStats.css';
import ComparisonPieCharts from './ComparisonPieCharts';
import DrilldownBarChart from './DrilldownBarChart'; // ĐÃ BỎ COMMENT

// --- DỮ LIỆU MẪU (giữ nguyên) ---
const mockGames = [{ id: 1, name: 'Onboarding Process' }, { id: 2, name: 'Security Training' }, { id: 3, name: 'Sales Techniques' }];
const mockDepartments = [{ id: 'D1', name: 'ODD' }, { id: 'D2', name: 'ABD' }, { id: 'D3', name: 'HR' }];
const mockTeams = [{ id: 'T1', name: 'Team 1', department: 'ODD' }, { id: 'T2', name: 'Team 2', department: 'ODD' }, { id: 'T3', name: 'Team 3', department: 'ODD' }, { id: 'T4', name: 'Team 4', department: 'ABD' }, { id: 'T5', name: 'Team 5', department: 'ABD' }, { id: 'T6', name: 'Team 6', department: 'HR' }];
const mockDetailedScores = [{ memberId: '2301001', memberName: 'Minh Tuan', gameId: 1, department: 'ODD', team: 'Team 1', score: 8 }, { memberId: '2301003', memberName: 'Phuc Lam', gameId: 1, department: 'ODD', team: 'Team 1', score: 9 }, { memberId: '2301002', memberName: 'Khanh An', gameId: 1, department: 'ODD', team: 'Team 2', score: 7 }, { memberId: '2301004', memberName: 'Thu Trang', gameId: 1, department: 'ODD', team: 'Team 3', score: 8 }, { memberId: '2302001', memberName: 'Anh Thu', gameId: 1, department: 'ABD', team: 'Team 4', score: 10 }, { memberId: '2302002', memberName: 'Bao Han', gameId: 1, department: 'ABD', team: 'Team 4', score: 9 }, { memberId: '2302003', memberName: 'Gia Huy', gameId: 1, department: 'ABD', team: 'Team 5', score: 7 }, { memberId: '2303002', memberName: 'Manh Dung', gameId: 1, department: 'HR', team: 'Team 6', score: 6 }, { memberId: '2303001', memberName: 'Hoai An', gameId: 1, department: 'HR', team: 'Team 6', score: 8 }, { memberId: '2301001', memberName: 'Minh Tuan', gameId: 2, department: 'ODD', team: 'Team 1', score: 9 }, { memberId: '2301002', memberName: 'Khanh An', gameId: 2, department: 'ODD', team: 'Team 2', score: 9 }, { memberId: '2302001', memberName: 'Anh Thu', gameId: 2, department: 'ABD', team: 'Team 4', score: 8 }, { memberId: '2303001', memberName: 'Hoai An', gameId: 2, department: 'HR', team: 'Team 6', score: 10 }, { memberId: '2303003', memberName: 'Duc Minh', gameId: 2, department: 'HR', team: 'Team 6', score: 8 }, { memberId: '2302001', memberName: 'Anh Thu', gameId: 3, department: 'ABD', team: 'Team 4', score: 10 }, { memberId: '2302002', memberName: 'Bao Han', gameId: 3, department: 'ABD', team: 'Team 4', score: 9 }, { memberId: '2302003', memberName: 'Gia Huy', gameId: 3, department: 'ABD', team: 'Team 5', score: 8 }, { memberId: '2301001', memberName: 'Minh Tuan', gameId: 3, department: 'ODD', team: 'Team 1', score: 7 },];


const AdvancedStats = () => {
    const [selectedGameId, setSelectedGameId] = useState(mockGames[0].id);
    const pieChartData = mockDetailedScores.filter(score => score.gameId === selectedGameId);

    const departmentData = [{ name: 'ODD', leader: 'Minh', members: 4, games: 3 }, { name: 'ABD', leader: 'Khanh', members: 3, games: 2 }, { name: 'HR', leader: 'An', members: 3, games: 2 }];
    const teamData = [{ name: 'Team 1', leader: 'Khai', members: 2, games: 3 }, { name: 'Team 2', leader: 'Tri', members: 1, games: 2 }, { name: 'Team 4', leader: 'Thu', members: 2, games: 3 }];

    return (
        <div className="stats-container">
            <div className="overview-stats-grid">
                {/* CỘT TRÁI: CHỨA 2 BẢNG */}
                <div className="tables-container">
                    <div className="stats-card">
                        <h3 className="stats-title">Department Statistics</h3>
                        <div className="stats-grid">
                            <div className="stats-header">Name</div><div className="stats-header">Leader</div><div className="stats-header">Members</div><div className="stats-header">Games</div>
                            {departmentData.map(dept => (<div className="stats-row" key={dept.name}><div className="stats-cell">{dept.name}</div><div className="stats-cell">{dept.leader}</div><div className="stats-cell">{dept.members}</div><div className="stats-cell">{dept.games}</div></div>))}
                        </div>
                        <div className="card-footer"><span className="action-link">Edit</span><span className="action-link">Cancel</span></div>
                    </div>
                    <div className="stats-card">
                        <h3 className="stats-title">Team Statistics</h3>
                        <div className="stats-grid">
                            <div className="stats-header">Team</div><div className="stats-header">Leader</div><div className="stats-header">Members</div><div className="stats-header">Games</div>
                            {teamData.map(team => (<div className="stats-row" key={team.name}><div className="stats-cell">{team.name}</div><div className="stats-cell">{team.leader}</div><div className="stats-cell">{team.members}</div><div className="stats-cell">{team.games}</div></div>))}
                        </div>
                        <div className="card-footer"><span className="action-link">Edit</span><span className="action-link">Cancel</span></div>
                    </div>
                </div>

                {/* CỘT PHẢI CHỨA CÁC BIỂU ĐỒ */}
                <div className="charts-column-container">
                    {/* Thẻ chứa biểu đồ tròn */}
                    <div className="stats-card">
                        <div className="game-selector-container">
                            <h3 className="stats-title">Compare Scores by Game</h3>
                            <select className="stats-selector" value={selectedGameId} onChange={(e) => setSelectedGameId(Number(e.target.value))}>
                                {mockGames.map(game => (<option key={game.id} value={game.id}>{game.name}</option>))}
                            </select>
                        </div>
                        <ComparisonPieCharts gameData={pieChartData} />
                    </div>

                    {/* Thẻ chứa biểu đồ cột (ĐÃ BỎ COMMENT) */}
                    <DrilldownBarChart
                        allScores={mockDetailedScores}
                        games={mockGames}
                        departments={mockDepartments}
                        teams={mockTeams}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdvancedStats;