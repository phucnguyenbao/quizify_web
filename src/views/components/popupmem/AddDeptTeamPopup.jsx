// src/views/components/popupmem/AddDeptTeamPopup.jsx

import React, { useState } from 'react';
import '../../../assets/css/popupmem/AddDeptTeamPopup.css'; // Tạo file CSS mới nếu cần

// === THAY ĐỔI: Nhận props 'mode', 'onClose', 'onAdd' ===
const AddDeptTeamPopup = ({ mode, onClose, onAdd }) => {
    // Xác định nội dung dựa trên mode
    const title = mode === 'department' ? 'Add New Department' : 'Add New Team';
    const nameLabel = mode === 'department' ? 'Department Name' : 'Team Name';

    // State để quản lý các dòng input
    const [rows, setRows] = useState([
        { id: 1, name: '', manager: '', leader: '', email: '', phone: '' }
    ]);

    const handleAddRow = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
        setRows([...rows, { id: newId, name: '', manager: '', leader: '', email: '', phone: '' }]);
    };

    const handleInputChange = (id, field, value) => {
        setRows(rows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container-large">
                <div className="popup-sidebar">
                    {/* === THAY ĐỔI: Tiêu đề động === */}
                    <h2>{title}</h2>
                    <a href="#" onClick={(e) => { e.preventDefault(); onAdd(rows); }}>Add</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>Cancel</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleAddRow(); }}>Add New Row</a>
                </div>
                <div className="popup-main-content">
                    <div className="add-dept-team-form">
                        <div className="form-header">
                            {/* === THAY ĐỔI: Nhãn động === */}
                            <div className="header-cell">{nameLabel}</div>
                            <div className="header-cell">Manager</div>
                            <div className="header-cell">Leader</div>
                            <div className="header-cell">Email</div>
                            <div className="header-cell">Phone</div>
                        </div>
                        {rows.map(row => (
                            <div className="form-row" key={row.id}>
                                <input type="text" placeholder="..." value={row.name} onChange={(e) => handleInputChange(row.id, 'name', e.target.value)} />
                                <input type="text" placeholder="..." value={row.manager} onChange={(e) => handleInputChange(row.id, 'manager', e.target.value)} />
                                <input type="text" placeholder="..." value={row.leader} onChange={(e) => handleInputChange(row.id, 'leader', e.target.value)} />
                                <input type="text" placeholder="..." value={row.email} onChange={(e) => handleInputChange(row.id, 'email', e.target.value)} />
                                <input type="text" placeholder="..." value={row.phone} onChange={(e) => handleInputChange(row.id, 'phone', e.target.value)} />
                            </div>
                        ))}
                    </div>

                    <div className="import-section">
                        <p>Import from file</p>
                        <button className="btn-browse">Browse</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDeptTeamPopup;