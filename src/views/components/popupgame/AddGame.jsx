import React from 'react'; 
import '../../../assets/css/popupgamequiz/AddGame.css';
const AddGameModal = ({ onClose, onCreate, newGame, onChange }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">New Game</h2>

        <div className="form-grid">
          <div className="form-item">
            <label>Game Name</label>
            <input type="text" placeholder="Enter game name" value={newGame.name} onChange={e => onChange('name', e.target.value)} />
          </div>
          <div className="form-item">
            <label>Room Code</label>
            <input type="text" placeholder="Enter room code" value={newGame.code} onChange={e => onChange('code', e.target.value)} />
          </div>
          <div className="form-item">
            <label>Start Date</label>
            <input type="date" value={newGame.date} onChange={e => onChange('date', e.target.value)} />
          </div>
          <div className="form-item">
            <label>Deadline</label>
            <input type="datetime-local" value={newGame.deadline} onChange={e => onChange('deadline', e.target.value)} />
          </div>
          <div className="form-item">
            <label>Number of Members</label>
            <input type="number" placeholder="Enter number of members" value={newGame.numMembers} onChange={e => onChange('numMembers', e.target.value)} />
          </div>
          <div className="form-item">
            <label>Department</label>
            <input type="text" placeholder="Enter department" />
          </div>
          <div className="form-item">
            <label>Team</label>
            <input type="text" placeholder="Enter team" />
          </div>
        </div>

        <div className="button-row">
          <button className="gradient-button">Select Game</button>
          <button className="gradient-button">Select Quiz</button>
        </div>

        <div className="modal-footer">
          <button className="gradient-button" onClick={onCreate}>Create Game</button>
          <button className="secondary-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddGameModal;
