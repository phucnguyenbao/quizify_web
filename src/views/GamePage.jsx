import React, { useState, useMemo } from 'react';
import '../assets/css/GamePage.css';
import { WaitingRoom, QuizScreen } from './PlayPage';
import GameDetails from './components/popupgame/GameDetails';
import AddGameModal from './components/popupgame/AddGame';

// Dummy Data
const dummyGames = [
  {
    id: 1, name: 'Japan Quiz', code: '234', date: '23/07/2025', avgScore: 8, maxScore: 9, numMembers: 15, deadline: '10:00 26/08/2025', quiz: 'Quiz 1', status: 'Open', timeLimit: 30, attempts: '7/8',
    players: [
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301002', first: 'Khanh', last: 'Tran', dept: 'ODD', team: 'Team B', attempts: '7/8', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' },
      { id: '2301001', first: 'Minh', last: 'Nguyen', dept: 'ODD', team: 'Team A', attempts: '4/5', maxScore: 9, quiz: 'Quiz 1' }
    ]
  },
  {
    id: 2, name: 'History Battle', code: '343', date: '23/07/2025', avgScore: 7, maxScore: 8, numMembers: 12, deadline: '10:00 29/08/2025', quiz: 'Quiz 2', status: 'Closed', timeLimit: 25, attempts: '5/5', players: []
  },
  {
    id: 3, name: 'Science Clash', code: '455', date: '25/07/2025', avgScore: 6, maxScore: 8, numMembers: 10, deadline: '15:00 30/08/2025', quiz: 'Quiz 3', status: 'Open', timeLimit: 20, attempts: '3/5',
    players: [
      { id: '2301003', first: 'Linh', last: 'Pham', dept: 'SCI', team: 'Team C', attempts: '2/5', maxScore: 8, quiz: 'Quiz 3' }
    ]
  },
  {
    id: 4, name: 'Geography Run', code: '564', date: '28/07/2025', avgScore: 8, maxScore: 9, numMembers: 9, deadline: '14:00 31/08/2025', quiz: 'Quiz 4', status: 'Open', timeLimit: 25, attempts: '4/5', players: []
  },
  {
    id: 5, name: 'Math War', code: '672', date: '29/07/2025', avgScore: 9, maxScore: 10, numMembers: 8, deadline: '16:00 01/09/2025', quiz: 'Quiz 5', status: 'Closed', timeLimit: 20, attempts: '5/5', players: []
  },
  {
    id: 6, name: 'Literature Quest', code: '785', date: '30/07/2025', avgScore: 7, maxScore: 9, numMembers: 13, deadline: '17:00 02/09/2025', quiz: 'Quiz 6', status: 'Open', timeLimit: 30, attempts: '6/7', players: []
  },
  {
    id: 7, name: 'English Challenge', code: '812', date: '01/08/2025', avgScore: 8, maxScore: 9, numMembers: 14, deadline: '10:00 03/09/2025', quiz: 'Quiz 7', status: 'Closed', timeLimit: 15, attempts: '4/5', players: []
  },
  {
    id: 8, name: 'Coding Arena', code: '923', date: '02/08/2025', avgScore: 9, maxScore: 10, numMembers: 16, deadline: '11:00 04/09/2025', quiz: 'Quiz 8', status: 'Open', timeLimit: 40, attempts: '8/10', players: []
  },
  {
    id: 9, name: 'Logic Gate', code: '1034', date: '03/08/2025', avgScore: 7, maxScore: 8, numMembers: 11, deadline: '12:00 05/09/2025', quiz: 'Quiz 9', status: 'Open', timeLimit: 20, attempts: '3/5', players: []
  },
  {
    id: 10, name: 'Vietnamese Culture', code: '1145', date: '04/08/2025', avgScore: 8, maxScore: 9, numMembers: 12, deadline: '13:00 06/09/2025', quiz: 'Quiz 10', status: 'Closed', timeLimit: 25, attempts: '5/6', players: []
  },
  {
    id: 11, name: 'Movie Trivia', code: '1256', date: '05/08/2025', avgScore: 9, maxScore: 10, numMembers: 10, deadline: '14:00 07/09/2025', quiz: 'Quiz 11', status: 'Open', timeLimit: 30, attempts: '6/7', players: []
  },
  {
    id: 12, name: 'Music Beats', code: '1367', date: '06/08/2025', avgScore: 8, maxScore: 9, numMembers: 15, deadline: '15:00 08/09/2025', quiz: 'Quiz 12', status: 'Open', timeLimit: 20, attempts: '5/6', players: []
  },
  {
    id: 13, name: 'World Wonders', code: '1478', date: '07/08/2025', avgScore: 7, maxScore: 8, numMembers: 13, deadline: '16:00 09/09/2025', quiz: 'Quiz 13', status: 'Closed', timeLimit: 20, attempts: '4/5', players: []
  },
  {
    id: 14, name: 'Art Master', code: '1589', date: '08/08/2025', avgScore: 8, maxScore: 9, numMembers: 14, deadline: '17:00 10/09/2025', quiz: 'Quiz 14', status: 'Open', timeLimit: 25, attempts: '5/6', players: []
  },
  {
    id: 15, name: 'Startup Quiz', code: '1690', date: '09/08/2025', avgScore: 9, maxScore: 10, numMembers: 12, deadline: '18:00 11/09/2025', quiz: 'Quiz 15', status: 'Closed', timeLimit: 30, attempts: '6/6', players: []
  },
  {
    id: 16, name: 'Sports Battle', code: '1701', date: '10/08/2025', avgScore: 8, maxScore: 9, numMembers: 13, deadline: '19:00 12/09/2025', quiz: 'Quiz 16', status: 'Open', timeLimit: 20, attempts: '4/5', players: []
  },
  {
    id: 17, name: 'Business Case', code: '1812', date: '11/08/2025', avgScore: 7, maxScore: 8, numMembers: 14, deadline: '20:00 13/09/2025', quiz: 'Quiz 17', status: 'Open', timeLimit: 35, attempts: '5/6', players: []
  },
  {
    id: 18, name: 'Eco Warriors', code: '1923', date: '12/08/2025', avgScore: 8, maxScore: 9, numMembers: 12, deadline: '21:00 14/09/2025', quiz: 'Quiz 18', status: 'Closed', timeLimit: 25, attempts: '4/5', players: []
  },
  {
    id: 19, name: 'AI Challenge', code: '2034', date: '13/08/2025', avgScore: 9, maxScore: 10, numMembers: 10, deadline: '22:00 15/09/2025', quiz: 'Quiz 19', status: 'Open', timeLimit: 45, attempts: '8/10', players: []
  },
  {
    id: 20, name: 'Physics Race', code: '2145', date: '14/08/2025', avgScore: 8, maxScore: 9, numMembers: 11, deadline: '23:00 16/09/2025', quiz: 'Quiz 20', status: 'Open', timeLimit: 20, attempts: '3/5', players: []
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
