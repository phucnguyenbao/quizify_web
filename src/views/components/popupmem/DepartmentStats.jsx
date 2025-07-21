import React from 'react';
import '../../../assets/css/popupmem/StatsAndLists.css';

// Dữ liệu mẫu (đã dịch)
const departmentData = [
    { name: 'ODD', leader: 'Minh', members: 10, games: 3 },
    { name: 'ABD', leader: 'Khanh', members: 5, games: 2 },
];
const teamData = [
    { name: 'Team 1', leader: 'Khai', members: 10, games: 3 },
    { name: 'Team 2', leader: 'Tri', members: 5, games: 2 },
];

const DepartmentStats = () => {
    return (
        <div className="stats-layout">
            <div className="stats-tables">
                {/* Bảng thống kê phòng ban */}
                <div className="stats-card">
                    <h3 className="stats-title">Department Statistics</h3>
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Leader</th>
                                <th>Members</th>
                                <th>Games</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departmentData.map(dept => (
                                <tr key={dept.name}>
                                    <td>{dept.name}</td>
                                    <td>{dept.leader}</td>
                                    <td>{dept.members}</td>
                                    <td>{dept.games}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="card-footer">
                        <span className="action-link">Edit</span>
                        <span className="action-link">Cancel</span>
                    </div>
                </div>

                {/* Bảng thống kê team */}
                <div className="stats-card">
                    <h3 className="stats-title">Team Statistics</h3>
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Team</th>
                                <th>Leader</th>
                                <th>Members</th>
                                <th>Games</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamData.map(team => (
                                <tr key={team.name}>
                                    <td>{team.name}</td>
                                    <td>{team.leader}</td>
                                    <td>{team.members}</td>
                                    <td>{team.games}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="card-footer">
                        <span className="action-link">Edit</span>
                        <span className="action-link">Cancel</span>
                        <span className="action-link">Choose game</span>
                    </div>
                </div>
            </div>

            {/* Biểu đồ tròn */}
            <div className="stats-chart">
                <div className="stats-card pie-chart">
                    <img src="https://i.imgur.com/s7O3gB4.png" alt="Department Pie Chart" />
                    <p className="chart-caption">Chart of average scores between departments/teams and games</p>
                </div>
            </div>
        </div>
    );
};

export default DepartmentStats;