import React, { useState } from 'react';
import '../../../assets/css/popupmem/Popups.css';

const WorkResultPopup = ({ memberInfo, onClose }) => {
    // State để lưu game đang được chọn xem chi tiết
    const [selectedGame, setSelectedGame] = useState(memberInfo.completedGames[0]);

    // Hàm xử lý khi người dùng click vào một game trong danh sách
    const handleGameSelect = (game) => {
        // Trong ứng dụng thực tế, bạn sẽ fetch chi tiết của game này
        // Ở đây chúng ta chỉ cập nhật lại tiêu đề
        setSelectedGame(game);
    };

    return (
        <div className="popup-backdrop">
            <div className="popup-content" style={{ maxWidth: '1200px' }}> {/* Tăng chiều rộng tối đa cho pop-up */}
                <div className="results-popup-grid">
                    {/* CỘT TRÁI: TIÊU ĐỀ CHÍNH */}
                    <div className="results-popup-left">
                        <h2 className="popup-title" style={{ lineHeight: '1.3' }}>Work Results:<br />{memberInfo.name}</h2>
                    </div>

                    {/* CỘT GIỮA: BẢNG CÁC GAME ĐÃ HOÀN THÀNH */}
                    <div className="results-popup-main">
                        <div className="table-card">
                            <h3 className="table-card-title">Completed Games</h3>
                            <div className="table-wrapper">
                                <table className="results-popup-table">
                                    <thead>
                                        <tr>
                                            <th>Game Name</th>
                                            <th>Topic</th>
                                            <th>Game Code</th>
                                            <th>Attempts</th>
                                            <th>Avg. Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {memberInfo.completedGames.map(game => (
                                            <tr key={game.id} onClick={() => handleGameSelect(game)} style={{ cursor: 'pointer' }}>
                                                <td>{game.name}</td>
                                                <td>{game.topic}</td>
                                                <td>{game.gameCode}</td>
                                                <td>{game.attempts}</td>
                                                <td>{game.avgScore}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: CHI TIẾT CÁC LẦN LÀM */}
                    <div className="results-popup-main">
                        <div className="table-card">
                            <h3 className="table-card-title">
                                Attempt Details: {selectedGame.name}
                            </h3>
                            <div className="table-wrapper">
                                <table className="results-popup-table">
                                    <thead>
                                        <tr>
                                            <th>Attempt</th>
                                            <th>Score</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {memberInfo.attemptDetails.map(detail => (
                                            <tr key={detail.attempt}>
                                                <td>{detail.attempt}</td>
                                                <td>{detail.score}</td>
                                                <td>{detail.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="popup-footer">
                    <span className="popup-link" onClick={onClose}>Close</span>
                </div>
            </div>
        </div>
    );
};

export default WorkResultPopup;