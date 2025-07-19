import React from 'react'; 
import '../../assets/css/AddGame.css';
const AddGameModal = ({ onClose, onCreate, newGame, onChange }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Tạo game</h2>

        <div className="form-grid">
          <div className="form-item">
            <label>Tên</label>
            <input type="text" placeholder="Tên game" value={newGame.name} onChange={e => onChange('name', e.target.value)} />
          </div>
          <div className="form-item">
            <label>Mã phòng</label>
            <input type="text" placeholder="Mã phòng" value={newGame.code} onChange={e => onChange('code', e.target.value)} />
          </div>
          <div className="form-item">
            <label>Ngày mở</label>
            <input type="date" value={newGame.date} onChange={e => onChange('date', e.target.value)} />
          </div>
          <div className="form-item">
            <label>Deadline</label>
            <input type="datetime-local" value={newGame.deadline} onChange={e => onChange('deadline', e.target.value)} />
          </div>
          <div className="form-item">
            <label>Số thành viên</label>
            <input type="number" placeholder="Số thành viên" value={newGame.numMembers} onChange={e => onChange('numMembers', e.target.value)} />
          </div>
          <div className="form-item">
            <label>Phòng ban</label>
            <input type="text" placeholder="Phòng ban" />
          </div>
          <div className="form-item">
            <label>Team</label>
            <input type="text" placeholder="Team" />
          </div>
        </div>

        <div className="button-row">
          <button className="gradient-button">Chọn game</button>
          <button className="gradient-button">Chọn quiz</button>
        </div>

        <div className="modal-footer">
          <button className="gradient-button" onClick={onCreate}>Tạo game</button>
          <button className="secondary-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddGameModal;
