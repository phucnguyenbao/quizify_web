// src/views/components/popupmem/GameHistory.jsx

import React, { useState, useMemo } from 'react';
import '../../../assets/css/popupmem/GameHistory.css';

// === NEW: Import thư viện biểu đồ ===
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// === NEW: Đăng ký các thành phần của Chart.js ===
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


// --- MOCK DATA ---
const mockHistoryData = {
    summary: [
        { id: 'game1', name: 'Game 1', topic: 'Quy trình', code: '234', attempts: '3/4', avgScore: 7, highScore: 8, totalAttempts: 8 },
        { id: 'game2', name: 'Game 2', topic: 'Bảo mật', code: '343', attempts: '5/6', avgScore: 8, highScore: 9, totalAttempts: 9 },
        { id: 'game3', name: 'Game 3', topic: 'Chấm công', code: '545', attempts: '6/7', avgScore: 8, highScore: 9, totalAttempts: 9 },
    ],
    details: {
        game1: [
            { attempt: 1, score: 8, time: '10:00 23/06 2025-17:00 23/06 2027' },
            { attempt: 2, score: 8, time: '10:00 23/06 2025-17:00 23/06 2028' },
            { attempt: 3, score: 7, time: '10:00 23/06 2025-17:00 23/06 2029' },
            { attempt: 4, score: 8, time: '10:00 23/06 2025-17:00 23/06 2027' },
        ],
        game2: [
            { attempt: 1, score: 7, time: '11:00 24/06 2025-18:00 24/06 2027' },
            { attempt: 2, score: 9, time: '11:00 24/06 2025-18:00 24/06 2028' },
        ],
        game3: [
            { attempt: 1, score: 9, time: '12:00 25/06 2025-19:00 25/06 2027' },
        ],
    }
};

// === UPDATE: Nhận prop 'user' thay vì 'userId' ===
const GameHistory = ({ user, onClose }) => {
    const [selectedGame, setSelectedGame] = useState(mockHistoryData.summary[0]);

    const handleSelectGame = (game) => {
        setSelectedGame(game);
    };

    const attemptDetails = useMemo(() => {
        if (!selectedGame) return [];
        return mockHistoryData.details[selectedGame.id] || [];
    }, [selectedGame]);

    // === NEW: Chuẩn bị dữ liệu và tùy chọn cho biểu đồ ===
    const chartData = useMemo(() => ({
        labels: attemptDetails.map(d => `Lần ${d.attempt}`),
        datasets: [
            {
                label: 'Điểm số',
                data: attemptDetails.map(d => d.score),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1
            },
        ],
    }), [attemptDetails]);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false, // Tắt title mặc định của chart
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 10 // Giả sử điểm tối đa là 10
            }
        }
    };

    return (
        <div className="gh-backdrop" onClick={onClose}>
            <div className="gh-popup" onClick={(e) => e.stopPropagation()}>

                {/* === UPDATE: Thêm tên thành viên vào tiêu đề === */}
                <h2>Các bài đã làm của {user.name}</h2>
                <div className="gh-summary-section">
                    <table className="gh-table">
                        <thead>
                            <tr>
                                <th>Tên Game</th>
                                <th>Chủ đề</th>
                                <th>Mã game</th>
                                <th>Số lần đã làm</th>
                                <th>Điểm trung bình</th>
                                <th>Điểm cao nhất</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockHistoryData.summary.map((game) => (
                                <tr key={game.id} onClick={() => handleSelectGame(game)}>
                                    <td>{game.name}</td>
                                    <td>{game.topic}</td>
                                    <td>{game.code}</td>
                                    <td>{game.attempts}</td>
                                    <td>{game.avgScore}</td>
                                    <td>{game.highScore}</td>
                                    <td>
                                        <span className="action-link">{game.totalAttempts} Làm bài</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedGame && (
                    <div className="gh-details-section">
                        <h2>Chi tiết lần làm: {selectedGame.name}</h2>
                        <table className="gh-table">
                            <thead>
                                <tr>
                                    <th>Lần làm</th>
                                    <th>Điểm</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attemptDetails.map((detail) => (
                                    <tr key={detail.attempt}>
                                        <td>{detail.attempt}</td>
                                        <td>{detail.score}</td>
                                        <td>{detail.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* === UPDATE: Hiển thị biểu đồ thực tế === */}
                        <div className="gh-chart-container">
                            <h3>Chart thống kê điểm</h3>
                            {attemptDetails.length > 0 ? (
                                <Line options={chartOptions} data={chartData} />
                            ) : (
                                <p>Không có dữ liệu để hiển thị biểu đồ.</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="gh-footer">
                    <button className="gh-button-close" onClick={onClose}>
                        Thoát
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameHistory;