import React, { useState, useMemo, useEffect } from 'react';
import '../assets/css/GamePage.css'; // File CSS sẽ được cập nhật

// --- Dữ liệu giả (Không thay đổi) ---
const dummyGames = [
  { id: 1, name: 'Game 1', code: '234', date: '23/07/2025', avgScore: 8, maxScore: 9, numMembers: 15, deadline: '10:00 26/08/2025', quiz: 'Quiz 1', status: 'Mở', timeLimit: 30, attempts: '7/8', players: [{ id: '2301001', first: 'Minh', last: 'Nguyễn', dept: 'ODD', team: 'Team 1', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' }, { id: '2301002', first: 'Khánh', last: 'Trần', dept: 'ODD', team: 'Team 2', attempts: '7/8', maxScore: 9, quiz: 'Quiz 1' }] },
  { id: 2, name: 'Game 2', code: '343', date: '23/07/2025', avgScore: 7, maxScore: 8, numMembers: 12, deadline: '10:00 29/08/2025', quiz: 'Quiz 2', status: 'Đóng', timeLimit: 25, attempts: '5/5', players: [] }
];
const dummyQuiz = {
  title: 'Kiểm tra kiến thức chung',
  questions: [
    { id: 1, text: 'Cách làm bài tập về nhà hiệu quả', options: { a: 'Đáp án A', b: 'Đáp án B', c: 'Đáp án C', d: 'Đáp án D' }, },
    { id: 2, text: 'Thủ đô của Pháp là gì?', options: { a: 'London', b: 'Berlin', c: 'Paris', d: 'Madrid' }, },
    ...Array.from({ length: 18 }, (_, i) => ({ id: i + 3, text: `Đây là câu hỏi số ${i + 3}?`, options: { a: `Lựa chọn A${i + 3}`, b: `Lựa chọn B${i + 3}`, c: `Lựa chọn C${i + 3}`, d: `Lựa chọn D${i + 3}` }, }))
  ]
};
const initialFilters = { name: '', code: '', date: '', avgScore: '', maxScore: '', numMembers: '', deadline: '', quiz: '', status: '' };


// =================================================================
// COMPONENT CON: GameListView (Màn hình danh sách game)
// =================================================================
const GameListView = ({ gamesData, onPlayGame, onShowDetails, onShowAddGame }) => {
  const [games, setGames] = useState(gamesData);
  const [filters, setFilters] = useState(initialFilters);
  const [tempFilter, setTempFilter] = useState(initialFilters);
  const [selected, setSelected] = useState([]);

  const filteredGames = useMemo(() => {
    return games.filter(game =>
      Object.entries(filters).every(([key, value]) =>
        !value || game[key]?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [games, filters]);

  const handleChange = (key, value) => setTempFilter(prev => ({ ...prev, [key]: value }));
  const handleSearch = () => setFilters({ ...tempFilter });
  const handleReset = () => {
    setTempFilter(initialFilters);
    setFilters(initialFilters);
  };
  const toggleSelect = (gameId) => {
    setSelected(prev =>
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };
  const selectAll = () => {
    if (selected.length === filteredGames.length) {
      setSelected([]);
    } else {
      setSelected(filteredGames.map(g => g.id));
    }
  };
  const deleteSelected = () => {
    setGames(games.filter(g => !selected.includes(g.id)));
    setSelected([]);
  };

  return (
    <div className="game-list-container">
      <h2 className="main-title">Quản lý Game</h2>
      <div className="filter-card">
        <div className="filter-grid">
          <input placeholder="Tên game" value={tempFilter.name} onChange={e => handleChange('name', e.target.value)} />
          <input placeholder="Mã phòng" value={tempFilter.code} onChange={e => handleChange('code', e.target.value)} />
          <input type="date" value={tempFilter.date} onChange={e => handleChange('date', e.target.value)} />
          <input placeholder="Điểm TB" value={tempFilter.avgScore} onChange={e => handleChange('avgScore', e.target.value)} />
          <input placeholder="Điểm cao nhất" value={tempFilter.maxScore} onChange={e => handleChange('maxScore', e.target.value)} />
          <input placeholder="Số lượng TV" value={tempFilter.numMembers} onChange={e => handleChange('numMembers', e.target.value)} />
          <input type="date" value={tempFilter.deadline} onChange={e => handleChange('deadline', e.target.value)} />
          <input placeholder="Quiz" value={tempFilter.quiz} onChange={e => handleChange('quiz', e.target.value)} />
          <select value={tempFilter.status} onChange={e => handleChange('status', e.target.value)}>
            <option value="">Tất cả</option><option value="Mở">Mở</option><option value="Đóng">Đóng</option>
          </select>
          <div className="filter-actions">
            <button className="btn btn-primary" onClick={handleSearch}>Tìm</button>
            <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
      <div className="table-card">
        <div className="table-actions">
          <span className="action-link" onClick={selectAll}>Chọn hết</span>
          <span className="action-link" onClick={deleteSelected}>Xóa</span>
        </div>
        <table className="game-table">
          <thead>
            <tr>
              <th>Tên game</th><th>Mã phòng</th><th>Ngày tạo</th><th>Điểm TB</th><th>Điểm cao nhất</th><th>Số lượng TV</th><th>Deadline</th><th>Quiz</th><th>Trạng thái</th><th>Hành động</th><th><input type="checkbox" onChange={selectAll} checked={selected.length === filteredGames.length && filteredGames.length > 0} /></th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.map((game) => (
              <tr key={game.id}>
                <td className="game-name" onClick={() => onPlayGame(game)}>{game.name}</td>
                <td>{game.code}</td><td>{game.date}</td><td>{game.avgScore}</td><td>{game.maxScore}</td><td>{game.numMembers}</td><td>{game.deadline}</td><td>{game.quiz}</td>
                <td>
                  <select value={game.status} onChange={() => { }} className="status-select">
                    <option value="Mở">Mở</option><option value="Đóng">Đóng</option>
                  </select>
                </td>
                <td><button className="btn btn-action" onClick={() => onShowDetails(game)}>Chi tiết</button></td>
                <td><input type="checkbox" checked={selected.includes(game.id)} onChange={() => toggleSelect(game.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary btn-add-game" onClick={onShowAddGame}>Thêm game</button>
      </div>
    </div>
  );
};

// =================================================================
// COMPONENT CON: WaitingRoom
// =================================================================
const WaitingRoom = ({ game, onStartQuiz, onExit }) => {
  const [soundOn, setSoundOn] = useState(true);
  if (!game) return null;
  return (
    <div className="waiting-room">
      <div className="header-nav">
        <span>Quản lý game</span><div className="user-actions"><span>Quản lý, cài đặt và báo cáo</span><span>Đăng xuất</span></div>
      </div>
      <h3 className="page-title">Trang chờ vào game</h3>
      <div className="game-settings-box">
        <div className="settings-header">
          <div className="setting-item"><label>Chọn ảnh đại diện</label><button className="btn-list">List ảnh</button></div>
          <div className="setting-item"><span>Hiệu ứng âm thanh</span><button className={`btn-toggle ${soundOn ? 'on' : 'off'}`} onClick={() => setSoundOn(!soundOn)}>{soundOn ? 'On' : 'Off'}</button></div>
          <div className="setting-item"><img src="https://i.pravatar.cc/50" alt="avatar" className="avatar-preview" /></div>
        </div>
        <div className="game-info">
          <div className="info-row"><span>Thời gian làm bài</span><span>{game.timeLimit} phút</span></div>
          <div className="info-row"><span>Số lần đã làm/ Số lần được cho phép</span><span>{game.attempts}</span></div>
          <div className="info-row"><span>Điểm cao nhất</span><span>{game.maxScore}</span></div>
        </div>
        <div className="start-game-actions">
          <button className="btn btn-primary" onClick={onStartQuiz}>Bắt đầu</button>
          <button className="btn-secondary" onClick={onExit}>Quay lại</button>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// COMPONENT CON: QuizScreen
// =================================================================
const QuizScreen = ({ game, onFinish }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState((game?.timeLimit || 30) * 60);
  useEffect(() => { const timer = setInterval(() => { setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)); }, 1000); return () => clearInterval(timer); }, []);
  const formatTime = (seconds) => { const m = Math.floor(seconds / 60).toString().padStart(2, '0'); const s = (seconds % 60).toString().padStart(2, '0'); return `${m}:${s}`; };
  const handleSelectAnswer = (qIndex, optionKey) => setAnswers(prev => ({ ...prev, [qIndex]: optionKey }));
  const progress = ((timeLeft / ((game?.timeLimit || 30) * 60)) * 100);
  return (
    <div className="quiz-screen">
      <div className="header-nav"><span>{game?.name || "Game Quiz"}</span><div className="user-actions"><span>Quản lý, cài đặt và báo cáo</span><span>Đăng xuất</span></div></div>
      <div className="timer-bar-container"><div className="timer-bar" style={{ width: `${100 - progress}%` }}></div><span>{formatTime(timeLeft)}</span></div>
      <div className="quiz-body">
        <div className="question-area">
          <h4>Câu hỏi {currentQ + 1}: {dummyQuiz.questions[currentQ].text}</h4>
          <div className="options-grid">
            {Object.entries(dummyQuiz.questions[currentQ].options).map(([key, value]) => (<div key={key} className={`option-box ${answers[currentQ] === key ? 'selected' : ''}`} onClick={() => handleSelectAnswer(currentQ, key)}><span>{key})</span><p>{value}</p></div>))}
          </div>
        </div>
        <div className="question-nav">
          <div className="nav-grid">{dummyQuiz.questions.map((_, index) => (<button key={index} className={`nav-button ${currentQ === index ? 'current' : ''} ${answers[index] ? 'answered' : ''}`} onClick={() => setCurrentQ(index)}>Câu {index + 1}</button>))}</div>
          <div className="nav-footer"><button className="btn-submit" onClick={() => { alert('Nộp bài thành công!'); onFinish(); }}>Nộp bài</button></div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// COMPONENT CHA: GamePage (Quản lý các view và modal)
// =================================================================
const GamePage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedGame, setSelectedGame] = useState(null);
  const [detailGame, setDetailGame] = useState(null); // State cho modal chi tiết
  const [showAddGame, setShowAddGame] = useState(false);

  // --- Functions để chuyển view ---
  const handlePlayGame = (game) => {
    setSelectedGame(game);
    setCurrentView('waitingRoom');
  };
  const handleStartQuiz = () => setCurrentView('quiz');
  const handleExitToLobby = () => {
    setSelectedGame(null);
    setCurrentView('list');
  };

  // --- Functions cho modal ---
  const showDetailsModal = (game) => setDetailGame(game);
  const hideDetailsModal = () => setDetailGame(null);
  const showAddGameModal = () => setShowAddGame(true);
  const hideAddGameModal = () => setShowAddGame(false);

  // --- Render logic ---
  const renderCurrentView = () => {
    switch (currentView) {
      case 'waitingRoom':
        return <WaitingRoom game={selectedGame} onStartQuiz={handleStartQuiz} onExit={handleExitToLobby} />;
      case 'quiz':
        return <QuizScreen game={selectedGame} onFinish={handleExitToLobby} />;
      default: // 'list'
        return <GameListView gamesData={dummyGames} onPlayGame={handlePlayGame} onShowDetails={showDetailsModal} onShowAddGame={showAddGameModal} />;
    }
  }

  return (
    <div className="page-wrapper">
      {renderCurrentView()}

      {/* --- Modal chi tiết người chơi --- */}
      {detailGame && (
        <div className="modal-overlay" onClick={hideDetailsModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Chi tiết người dùng: {detailGame.name}</h3>
            <table className="detail-table">
              <thead>
                <tr>
                  <th>Mã NV</th><th>Tên</th><th>Họ</th><th>Phòng ban</th><th>Team</th><th>Số lần làm</th><th>Điểm cao nhất</th>
                </tr>
              </thead>
              <tbody>
                {detailGame.players.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.id}</td><td>{p.first}</td><td>{p.last}</td><td>{p.dept}</td><td>{p.team}</td><td>{p.attempts}</td><td>{p.maxScore}</td>
                  </tr>
                ))}
                {detailGame.players.length === 0 && (
                  <tr><td colSpan="7">Chưa có người dùng nào tham gia game này.</td></tr>
                )}
              </tbody>
            </table>
            <div className="modal-footer"><button className="btn btn-secondary" onClick={hideDetailsModal}>Đóng</button></div>
          </div>
        </div>
      )}

      {/* --- Modal thêm game --- */}
      {showAddGame && (
        <div className="modal-overlay" onClick={hideAddGameModal}>
          {/* Nội dung modal thêm game ở đây */}
          <div className="modal-content"><h3 className="modal-title">Thêm game mới</h3><p>Form thêm game sẽ ở đây...</p><button className="btn" onClick={hideAddGameModal}>Đóng</button></div>
        </div>
      )}
    </div>
  );
};

export default GamePage;