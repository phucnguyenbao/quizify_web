import React from 'react';
import '../../../assets/css/popupmem/Popups.css';

const AddDepartmentPopup = ({ onClose, onAddDepartment }) => {
    return (
        <div className="popup-backdrop">
            <div className="popup-content">
                {/* === UPDATE: Sử dụng bố cục 2 cột mới === */}
                <div className="add-popup-grid">
                    <div className="add-popup-left">
                        <h2 className="popup-main-title">Add New Department</h2>
                        <div className="add-popup-actions">
                            <span className="popup-link" onClick={onAddDepartment}>Add</span>
                            <span className="popup-link" onClick={onClose}>Cancel</span>
                            <span className="popup-link">Add New Row</span>
                        </div>
                    </div>
                    <div className="add-popup-right">
                        <div className="form-card">
                            <table className="popup-table">
                                <thead><tr><th>Department/Team Name</th><th>Manager</th><th>Leader</th><th>Email</th><th>Phone</th></tr></thead>
                                <tbody><tr>
                                    <td><input type="text" className="popup-input" /></td>
                                    <td><input type="text" className="popup-input" /></td>
                                    <td><input type="text" className="popup-input" /></td>
                                    <td><input type="email" className="popup-input" /></td>
                                    <td><input type="text" className="popup-input" /></td>
                                </tr></tbody>
                            </table>
                        </div>
                        <div className="import-card">
                            <span>Import from file</span>
                            <input type="file" id="dept-file" style={{ display: 'none' }} />
                            <button className="btn btn-secondary" onClick={() => document.getElementById('dept-file').click()}>Browse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddDepartmentPopup;