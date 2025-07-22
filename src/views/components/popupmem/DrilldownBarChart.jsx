import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DrilldownBarChart = ({ allScores, games, departments, teams }) => {
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedGame, setSelectedGame] = useState('');

    const availableTeams = selectedDepartment ? teams.filter(t => t.department === selectedDepartment) : [];

    // Logic để chỉ hiện game mà team đã tham gia (tùy chọn, có thể thêm để tối ưu UX)
    const availableGames = useMemo(() => {
        if (!selectedTeam) return [];
        const gameIds = new Set(allScores.filter(s => s.team === selectedTeam).map(s => s.gameId));
        return games.filter(g => gameIds.has(g.id));
    }, [selectedTeam, allScores, games]);

    const chartData = useMemo(() => {
        const data = {
            labels: [],
            datasets: [{
                label: 'Score',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderRadius: 5,
            }]
        };

        if (selectedDepartment && selectedTeam && selectedGame) {
            const filteredData = allScores.filter(score =>
                score.team === selectedTeam &&
                score.gameId.toString() === selectedGame
            );
            data.labels = filteredData.map(d => d.memberName);
            data.datasets[0].data = filteredData.map(d => d.score);
        }
        return data;
    }, [selectedDepartment, selectedTeam, selectedGame, allScores]);

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
                ticks: { stepSize: 2 }
            }
        },
    };

    return (
        <div className="stats-card drilldown-container">
            <div className="drilldown-selectors-wrapper">
                <h3 className="stats-title">Detailed Score Breakdown</h3>
                <div className="drilldown-selectors">
                    <select className="stats-selector" value={selectedDepartment} onChange={(e) => { setSelectedDepartment(e.target.value); setSelectedTeam(''); setSelectedGame(''); }}>
                        <option value="">Select Department</option>
                        {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>

                    <select className="stats-selector" value={selectedTeam} onChange={(e) => { setSelectedTeam(e.target.value); setSelectedGame(''); }} disabled={!selectedDepartment}>
                        <option value="">Select Team</option>
                        {availableTeams.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                    </select>

                    <select className="stats-selector" value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)} disabled={!selectedTeam}>
                        <option value="">Select Game</option>
                        {availableGames.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                </div>
            </div>

            {/* === THAY ĐỔI QUAN TRỌNG: GỠ BỎ STYLE INLINE === */}
            <div className="bar-chart-container">
                {selectedDepartment && selectedTeam && selectedGame ? (
                    <Bar data={chartData} options={barChartOptions} />
                ) : (
                    <div className="chart-placeholder-text">
                        <p>Please complete all selections to view the chart.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DrilldownBarChart;