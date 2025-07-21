import React, { useState, useMemo } from 'react';
import '../assets/css/GamePage.css';
import AddGameModal from './components/AddGame';
import { WaitingRoom, QuizScreen } from './PlayPage';

// Dữ liệu giả
const dummyGames = [
  {
    id: 1, name: 'Game 1', code: '234', date: '23/07/2025', avgScore: 8, maxScore: 9, numMembers: 15, deadline: '10:00 26/08/2025', quiz: 'Quiz 1', status: 'Mở', timeLimit: 30, attempts: '7/8',
    players: [
      { id: '2301001', first: 'Minh', last: 'Nguyễn', dept: 'ODD', team: 'Team 1', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301002', first: 'Khánh', last: 'Trần', dept: 'ODD', team: 'Team 2', attempts: '7/8', maxScore: 9, quiz: 'Quiz 1' }
    ]
  },
  {
    id: 2, name: 'Game 2', code: '343', date: '23/07/2025', avgScore: 7, maxScore: 8, numMembers: 12, deadline: '10:00 29/08/2025', quiz: 'Quiz 2', status: 'Đóng', timeLimit: 25, attempts: '5/5', players: []
  }
];

const initialFilters = {
  name: '', code: '', date: '', avgScore: '', maxScore: '',
  numMembers: '', deadline: '', quiz: '', status: ''
};

const GamePage = () => {
  const [games, setGames] = useState(dummyGames);
  const [filters, setFilters] = useState(initialFilters);
  const [tempFilter, setTempFilter] = useState(initialFilters);
  const [selected, setSelected] = useState([]);
  const [detailGame, setDetailGame] = useState(null);
  const [showAddGame, setShowAddGame] = useState(false);
  const [newGame, setNewGame] = useState({
    name: '', code: '', date: '', deadline: '', avgScore: '', maxScore: '', numMembers: '', quiz: '', status: 'Mở'
  });

  const [currentView, setCurrentView] = useState('list');
  const [selectedGame, setSelectedGame] = useState(null);

  // Filter games
  const filteredGames = useMemo(() => {
    return games.filter(game =>
      Object.entries(filters).every(([key, value]) =>
        !value || game[key]?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [games, filters]);

  // Handlers
  const handleChange = (key, value) => setTempFilter(prev => ({ ...prev, [key]: value }));
  const handleNewGameChange = (key, value) => setNewGame(prev => ({ ...prev, [key]: value }));
  const handleSearch = () => setFilters({ ...tempFilter });
  const handleReset = () => {
    setTempFilter(initialFilters);
    setFilters(initialFilters);
  };

  const toggleSelect = (index) => {
    setSelected(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const selectAll = () => {
    if (selected.length === filteredGames.length) {
      setSelected([]);
    } else {
      setSelected(filteredGames.map((_, i) => i));
    }
  };

  const deleteSelected = () => {
    setGames(games.filter((_, i) => !selected.includes(i)));
    setSelected([]);
  };

  const handleAddGame = () => {
    setGames([...games, { ...newGame, id: games.length + 1 }]);
    setShowAddGame(false);
    setNewGame({
      name: '', code: '', date: '', deadline: '', avgScore: '', maxScore: '', numMembers: '', quiz: '', status: 'Mở'
    });
  };

  // View switching
  const handlePlayGame = (game) => {
    setSelectedGame(game);
    setCurrentView('waitingRoom');
  };

  const handleStartQuiz = () => setCurrentView('quiz');
  const handleExitToLobby = () => {
    setSelectedGame(null);
    setCurrentView('list');
  };

  return (
    <div className="game-page">

      {currentView === 'list' && (
        <>
          <h2 className="bubble-text">Game Management</h2>

          {/* Bộ lọc */}
          <div className="filter-row">
            {['name', 'code', 'avgScore', 'maxScore', 'numMembers', 'quiz'].map(field => (
              <input key={field} placeholder={field} value={tempFilter[field]} onChange={e => handleChange(field, e.target.value)} />
            ))}
            <input type="date" value={tempFilter.date} onChange={e => handleChange('date', e.target.value)} />
            <input type="date" value={tempFilter.deadline} onChange={e => handleChange('deadline', e.target.value)} />
            <select value={tempFilter.status} onChange={e => handleChange('status', e.target.value)}>
              <option value="">Tất cả</option><option value="Mở">Mở</option><option value="Đóng">Đóng</option>
            </select>
            <button onClick={handleSearch}>Tìm</button>
            <button onClick={handleReset}>Reset</button>
          </div>

          {/* Bảng game */}
          <table className="game-table">
            <thead>
              <tr>
                <th>Tên game</th><th>Mã phòng</th><th>Ngày tạo</th><th>Điểm TB</th><th>Điểm cao</th><th>SL TV</th><th>Deadline</th><th>Quiz</th><th>Trạng thái</th><th>Chi tiết</th><th>Sửa</th><th>✓</th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.map((game, i) => (
                <tr key={i}>
                  <td style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handlePlayGame(game)}>{game.name}</td>
                  <td>{game.code}</td><td>{game.date}</td><td>{game.avgScore}</td><td>{game.maxScore}</td><td>{game.numMembers}</td><td>{game.deadline}</td><td>{game.quiz}</td>
                  <td>
                    <select value={game.status} onChange={e => {
                      const updated = [...games];
                      updated[i].status = e.target.value;
                      setGames(updated);
                    }}>
                      <option value="Mở">Mở</option><option value="Đóng">Đóng</option>
                    </select>
                  </td>
                  <td><button onClick={() => setDetailGame(game)}>Chi tiết</button></td>
                  <td><button> Sửa </button></td>
                  <td><input type="checkbox" checked={selected.includes(i)} onChange={() => toggleSelect(i)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="action-buttons">
            <button onClick={selectAll}>Chọn hết</button>
            <button onClick={deleteSelected}>Xóa</button>
            <button onClick={() => setShowAddGame(true)}>Thêm game</button>
          </div>
        </>
      )}

      {currentView === 'waitingRoom' && (
        <WaitingRoom
          game={selectedGame}
          onStartQuiz={handleStartQuiz}
          onExit={handleExitToLobby}
        />
      )}

      {currentView === 'quiz' && (
        <QuizScreen
          game={selectedGame}
          onFinish={handleExitToLobby}
        />
      )}

      {detailGame && (
        <div className="modal-overlay" onClick={() => setDetailGame(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={{ color: 'hotpink' }}>{detailGame.name}</h3>
            <table className="detail-table">
              <thead>
                <tr><th>Mã NV</th><th>Tên</th><th>Họ</th><th>Phòng ban</th><th>Team</th><th>Làm</th><th>Điểm</th><th>Quiz</th></tr>
              </thead>
              <tbody>
                {detailGame.players.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.id}</td><td>{p.first}</td><td>{p.last}</td><td>{p.dept}</td><td>{p.team}</td><td>{p.attempts}</td><td>{p.maxScore}</td><td>{p.quiz}</td>
                  </tr>
                ))}
                {detailGame.players.length === 0 && <tr><td colSpan="8">Chưa có người chơi</td></tr>}
              </tbody>
            </table>
            <button onClick={() => setDetailGame(null)}>Đóng</button>
          </div>
        </div>
      )}

      {showAddGame && (
        <AddGameModal
          onClose={() => setShowAddGame(false)}
          onCreate={handleAddGame}
          newGame={newGame}
          onChange={handleNewGameChange}
        />
      )}
    </div>
  );
};

export default GamePage;
