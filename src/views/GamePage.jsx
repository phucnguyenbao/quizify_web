import React, { useState, useMemo } from 'react';
import '../assets/css/GamePage.css';
import AddGameModal from './components/AddGame';

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
  
  const handleChange = (key, value) => {
    setTempFilter(prev => ({ ...prev, [key]: value }));
  };
  const handleNewGameChange = (key, value) => {
    setNewGame(prev => ({ ...prev, [key]: value }));
  };
  const inputFilter = (label, key) => (
    <input
      placeholder={label}
      value={tempFilter[key]}
      onChange={e => handleChange(key, e.target.value)}
    />
  );

  const handleSearch = () => setFilters({ ...tempFilter });
  const handleReset = () => {
    setTempFilter(initialFilters);
    setFilters(initialFilters);
  };

  const toggleSelect = (index) => {
    setSelected(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
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
    setGames(games.filter((_, i) => !selected.includes(i)));
    setSelected([]);
  };

  const filteredGames = useMemo(() => {
    return games.filter(game =>
      Object.entries(filters).every(([key, value]) =>
        !value || game[key].toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [games, filters]);
  const handleAddGame = () => {
    setGames([...games, newGame]);
    setShowAddGame(false);
    setNewGame({
      name: '', code: '', date: '', deadline: '', avgScore: '', maxScore: '', numMembers: '', quiz: '', status: 'Mở'
    });
  };
  


  return (
    
    <div className="game-page">
      <h2 className="bubble-text">Game management</h2>
      {/* Bộ lọc */}
      <div className="filter-row">
        {inputFilter("Tên game", "name")}
        {inputFilter("Mã phòng", "code")}
        <input type="date" value={filters.date} onChange={e => handleChange('date', e.target.value)} />
        {inputFilter("Điểm trung bình", "avgScore")}
        {inputFilter("Điểm cao nhất", "maxScore")}
        {inputFilter("Số lượng thành viên", "numMembers")}
        <input type="date" value={filters.deadline} onChange={e => handleChange('deadline', e.target.value)} />
        {inputFilter("Quiz", "quiz")}
        <select value={filters.status} onChange={e => handleChange('status', e.target.value)}>
          <option value="">Tất cả</option>
          <option value="Mở">Mở</option>
          <option value="Đóng">Đóng</option>
        </select>
        <button onClick={handleSearch}>Tìm</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Hành động */}
      <div className="action-buttons">
        <span className="action-link" onClick={selectAll}>Chọn hết</span>
        <span className="action-link" onClick={deleteSelected}>Xóa</span>
      </div>

      {/* Bảng Game */}
      <table className="game-table">
        <thead>
          <tr>
            <th>Tên game</th>
            <th>Mã phòng</th>
            <th>Ngày tạo</th>
            <th>Điểm trung bình</th>
            <th>Điểm cao nhất</th>
            <th>Số lượng thành viên</th>
            <th>Deadline</th>
            <th>Quiz</th>
            <th>Trạng thái</th>
            <th>Sửa</th>
            <th>✓</th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map((game, i) => (
            <tr key={i}>
              <td
            className="game-name"
            style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => setDetailGame(game)}
          >
            {game.name}
          </td>


              <td>{game.code}</td>
              <td>{game.date}</td>
              <td>{game.avgScore}</td>
              <td>{game.maxScore}</td>
              <td>{game.numMembers}</td>
              <td>{game.deadline}</td>
              <td>{game.quiz}</td>
              <td>
                <select
                  value={game.status}
                  onChange={e => {
                    const updated = [...games];
                    updated[i].status = e.target.value;
                    setGames(updated);
                  }}
                >
                  <option value="Mở">Mở</option>
                  <option value="Đóng">Đóng</option>
                </select>
              </td>
              <td><button>Sửa</button></td>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(i)}
                  onChange={() => toggleSelect(i)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button className="add-button" onClick={() => setShowAddGame(true)}>Thêm game</button>
      {/* Modal chi tiết */}
      {detailGame && (
        <div className="modal-overlay" onClick={() => setDetailGame(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div>Chi tiết các người dùng đã thực hiện game</div>
            <h3 style={{ color: 'hotpink' }}>{detailGame.name}</h3>
            <table className="detail-table">
              <thead>
                <tr>
                  <th>Mã nhân viên</th><th>Tên</th><th>Họ</th>
                  <th>Phòng ban</th><th>Team</th>
                  <th>Số lần làm</th><th>Điểm cao nhất</th><th>Các quiz đã làm</th>
                </tr>
              </thead>
              <tbody>
                {detailGame.players.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.id}</td>
                    <td>{p.first}</td>
                    <td>{p.last}</td>
                    <td><select value={p.dept}><option>{p.dept}</option></select></td>
                    <td><select value={p.team}><option>{p.team}</option></select></td>
                    <td>{p.attempts}</td>
                    <td>{p.maxScore}</td>
                    <td>{p.quiz}</td>
                  </tr>
                ))}
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
