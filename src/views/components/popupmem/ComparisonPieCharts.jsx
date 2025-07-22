// src/components/.../ComparisonPieCharts.jsx

import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const COLORS = {
    ODD: '#e77c8e', ABD: '#5aabe7', HR: '#f3ba2f',
    'Team 1': '#e77c8e', 'Team 2': '#5aabe7', 'Team 3': '#f3ba2f',
    'Team 4': '#8d6e63', 'Team 5': '#9575cd', 'Team 6': '#4db6ac',
};

const CustomLegend = ({ data }) => (
    <div className="pie-legend">
        {data.map(item => (
            <div key={item.name} className="legend-item">
                <span className="legend-color-box" style={{ backgroundColor: item.color }}></span>
                <span>{item.name}</span>
            </div>
        ))}
    </div>
);

const ComparisonPieCharts = ({ gameData }) => {
    const { departmentData, teamData } = useMemo(() => {
        const deptScores = {};
        const teamScores = {};

        if (!gameData || gameData.length === 0) {
            return { departmentData: { labels: [], datasets: [] }, teamData: { labels: [], datasets: [] } };
        }

        gameData.forEach(score => {
            if (!deptScores[score.department]) deptScores[score.department] = { total: 0, count: 0 };
            deptScores[score.department].total += score.score;
            deptScores[score.department].count += 1;

            if (!teamScores[score.team]) teamScores[score.team] = { total: 0, count: 0 };
            teamScores[score.team].total += score.score;
            teamScores[score.team].count += 1;
        });

        const departmentResult = {
            labels: Object.keys(deptScores),
            datasets: [{
                data: Object.values(deptScores).map(d => d.total / d.count),
                backgroundColor: Object.keys(deptScores).map(name => COLORS[name] || '#ccc'),
                borderWidth: 0,
            }]
        };

        const teamResult = {
            labels: Object.keys(teamScores),
            datasets: [{
                data: Object.values(teamScores).map(t => t.total / t.count),
                backgroundColor: Object.keys(teamScores).map(name => COLORS[name] || '#ccc'),
                borderWidth: 0,
            }]
        };
        return { departmentData: departmentResult, teamData: teamResult };
    }, [gameData]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }, // Tắt chú giải mặc định của Chart.js
            tooltip: {
                callbacks: { label: (c) => `${c.label}: ${c.parsed.toFixed(1)}` }
            }
        },
    };

    const departmentLegendData = departmentData.labels.map((label, i) => ({
        name: label, color: departmentData.datasets[0].backgroundColor[i],
    }));

    const teamLegendData = teamData.labels.map((label, i) => ({
        name: label, color: teamData.datasets[0].backgroundColor[i],
    }));

    return (
        <div className="pie-charts-container">
            <div className="pie-chart-wrapper">
                <h3 className="stats-title">Department Averages</h3>
                <div className="chart-and-legend-container">
                    {departmentLegendData.length > 0 ? <Pie data={departmentData} options={chartOptions} /> : <p>No data</p>}
                    <CustomLegend data={departmentLegendData} />
                </div>
            </div>

            <div className="pie-chart-wrapper">
                <h3 className="stats-title">Team Averages</h3>
                <div className="chart-and-legend-container">
                    {teamLegendData.length > 0 ? <Pie data={teamData} options={chartOptions} /> : <p>No data</p>}
                    <CustomLegend data={teamLegendData} />
                </div>
            </div>
        </div>
    );
};

export default ComparisonPieCharts;