import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Hàm tính toán điểm trung bình theo nhóm (phòng ban hoặc team)
const calculateAverageScores = (data, groupBy) => {
    if (!data || data.length === 0) return { labels: [], scores: [] };

    const grouped = data.reduce((acc, score) => {
        const key = score[groupBy];
        if (!acc[key]) {
            acc[key] = { totalScore: 0, count: 0 };
        }
        acc[key].totalScore += score.score;
        acc[key].count++;
        return acc;
    }, {});

    const labels = Object.keys(grouped);
    const scores = labels.map(key => grouped[key].totalScore / grouped[key].count);

    return { labels, scores };
};


const ComparisonPieCharts = ({ gameData }) => {

    const departmentAvg = calculateAverageScores(gameData, 'department');
    const teamAvg = calculateAverageScores(gameData, 'team');

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
    };

    const colors = [
        'rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)'
    ];

    const departmentChartData = {
        labels: departmentAvg.labels,
        datasets: [{ label: 'Avg Score', data: departmentAvg.scores, backgroundColor: colors }],
    };

    const teamChartData = {
        labels: teamAvg.labels,
        datasets: [{ label: 'Avg Score', data: teamAvg.scores, backgroundColor: colors }],
    };

    return (
        <div className="pie-charts-container">
            <div className="pie-chart-wrapper">
                <h4 className="stats-title" style={{ textAlign: 'center' }}>Department Averages</h4>
                <Pie options={chartOptions} data={departmentChartData} />
            </div>
            <div className="pie-chart-wrapper">
                <h4 className="stats-title" style={{ textAlign: 'center' }}>Team Averages</h4>
                <Pie options={chartOptions} data={teamChartData} />
            </div>
        </div>
    );
};

export default ComparisonPieCharts;