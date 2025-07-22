import React, { useState, useMemo } from 'react';
import '../assets/css/GamePage.css';
import { WaitingRoom, QuizScreen } from './PlayPage';
import GameDetails from './components/popupgame/GameDetails';
import AddGameModal from './components/popupgame/AddGame';
// Dummy Data
const dummyGames = [
  {
    id: 1, name: 'Game 1', code: '234', date: '23/07/2025', avgScore: 8, maxScore: 9, numMembers: 15, deadline: '10:00 26/08/2025', quiz: 'Quiz 1', status: 'Open', timeLimit: 30, attempts: '7/8',
    players: [
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team 1', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301002', first: 'Khanh', last: 'Tran', dept: 'ODD', team: 'Team 2', attempts: '7/8', maxScore: 9, quiz: 'Quiz 1' }
    ]
  },
  {
    id: 2, name: 'Game 2', code: '343', date: '23/07/2025', avgScore: 7, maxScore: 8, numMembers: 12, deadline: '10:00 29/08/2025', quiz: 'Quiz 2', status: 'Closed', timeLimit: 25, attempts: '5/5', players: []
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
    name: '', code: '', date: '', deadline: '', avgScore: '', maxScore: '', numMembers: '', quiz: '', status: 'Open'
  });

  const [currentView, setCurrentView] = useState('list');
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = useMemo(() => {
    return games.filter(game =>
      Object.entries(filters).every(([key, value]) =>
        !value || game[key]?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [games, filters]);

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
      name: '', code: '', date: '', deadline: '', avgScore: '', maxScore: '', numMembers: '', quiz: '', status: 'Open'
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
          <h2 class="game-title"><span class="text-inner">GAME MANAGEMENT</span></h2>


          {/* Filters */}
          <div className="filter-row">
<input 
  placeholder="Name" 
  value={tempFilter.name} 
  onChange={e => handleChange('name', e.target.value)} 
/>
<input 
  placeholder="Code" 
  value={tempFilter.code} 
  onChange={e => handleChange('code', e.target.value)} 
/>
<input 
  type="Date" 
  value={tempFilter.date} 
  onChange={e => handleChange('date', e.target.value)} 
/>
<input 
  placeholder="AvgScore" 
  value={tempFilter.avgScore} 
  onChange={e => handleChange('avgScore', e.target.value)} 
/>
<input 
  placeholder="MaxScore" 
  value={tempFilter.maxScore} 
  onChange={e => handleChange('maxScore', e.target.value)} 
/>
<input 
  placeholder="NumMembers" 
  value={tempFilter.numMembers} 
  onChange={e => handleChange('numMembers', e.target.value)} 
/>
<input 
  placeholder="Quiz" 
  value={tempFilter.quiz} 
  onChange={e => handleChange('quiz', e.target.value)} 
/>

            <input type="date" value={tempFilter.deadline} onChange={e => handleChange('deadline', e.target.value)} />
            <select value={tempFilter.status} onChange={e => handleChange('status', e.target.value)}>
              <option value="">All</option><option value="Open">Open</option><option value="Closed">Closed</option>
            </select>
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleReset}>Reset</button>
          </div>

          {/* Game Table */}
          <table className="game-table">
  <thead>
    <tr>
      <th colSpan="12" style={{ textAlign: 'right', padding: '10px 20px' }}>
        <div className="table-actions">
          <span className="action-link" onClick={selectAll}>Select All</span>
          <span className="action-link" onClick={deleteSelected}>Delete</span>
        </div>
      </th>
    </tr>
    <tr>
      <th>Game Name</th><th>Room Code</th><th>Created Date</th><th>Avg Score</th>
      <th>Max Score</th><th>Members</th><th>Deadline</th><th>Quiz</th>
      <th>Status</th><th>Details</th><th>Edit</th><th>✓</th>
    </tr>
  </thead>
  <tbody>
              {filteredGames.map((game, i) => (
                <tr key={i}>
                  <td style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handlePlayGame(game)}>{game.name}</td>
                  <td>{game.code}</td><td>{game.date}</td><td>{game.avgScore}</td><td>{game.maxScore}</td><td>{game.numMembers}</td><td>{game.deadline}</td><td>{game.quiz}</td>
                  <td>
                    <button 
                      className={`status-button ${game.status.toLowerCase()}`} 
                      onClick={() => {
                        const updated = [...games];
                        updated[i].status = game.status === 'Open' ? 'Closed' : 'Open';
                        setGames(updated);
                      }}
                    >
                      {game.status}
                    </button>
                  </td>
                  <td><button onClick={() => setDetailGame(game)}>Details</button></td>
                  <td><button>Edit</button></td>
                  <td><input type="checkbox" checked={selected.includes(i)} onChange={() => toggleSelect(i)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
     <br />
<button 
  onClick={() => setShowAddGame(true)} 
  className="save-button"
>
  Add Game
</button>


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
  <GameDetails
    game={detailGame}
    onClose={() => setDetailGame(null)}
  />
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
