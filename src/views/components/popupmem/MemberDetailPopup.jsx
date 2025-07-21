import React, { useState, useEffect } from 'react';
import '../../../assets/css/popupmem/Popups.css';

const MemberDetailPopup = ({ member, onClose, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableMember, setEditableMember] = useState(member);

    useEffect(() => {
        setEditableMember(member);
    }, [member]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableMember(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(editableMember);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditableMember(member);
        setIsEditing(false);
    };

    // Component con để hiển thị một trường thông tin
    const InfoField = ({ label, value, children }) => (
        <div className="popup-field">
            <span className="popup-label">{label}</span>
            <div className="popup-value">
                {children || value}
            </div>
        </div>
    );

    return (
        <div className="popup-backdrop">
            <div className="detail-popup-content">
                <div className="detail-popup-header">
                    <h2 className="detail-popup-title">Member Information</h2>
                    <div>
                        {isEditing ? (
                            <>
                                <span className="popup-link" style={{ marginRight: '15px' }} onClick={handleCancel}>Cancel</span>
                                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                            </>
                        ) : (
                            <>
                                <span className="popup-link" style={{ marginRight: '15px' }} onClick={() => setIsEditing(true)}>Edit</span>
                                <span className="popup-link" onClick={onClose}>Close</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="detail-popup-body">
                    <InfoField label="Employee ID" value={editableMember.id} />

                    <InfoField label="Full Name">
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={editableMember.name}
                                onChange={handleInputChange}
                            />
                        ) : editableMember.name}
                    </InfoField>

                    <InfoField label="Status" value={<span className="status-badge">Active</span>} />

                    <InfoField label="Department">
                        {isEditing ? (
                            <input
                                type="text"
                                name="department"
                                value={editableMember.department}
                                onChange={handleInputChange}
                            />
                        ) : editableMember.department}
                    </InfoField>

                    <InfoField label="Team">
                        {isEditing ? (
                            <input
                                type="text"
                                name="team"
                                value={editableMember.team}
                                onChange={handleInputChange}
                            />
                        ) : editableMember.team}
                    </InfoField>

                    <InfoField label="Role">
                        {isEditing ? (
                            <select name="role" value={editableMember.role} onChange={handleInputChange}>
                                <option value="User">User</option>
                                <option value="Leader">Leader</option>
                                <option value="Manager">Manager</option>
                            </select>
                        ) : editableMember.role}
                    </InfoField>
                </div>
            </div>
        </div>
    );
};

export default MemberDetailPopup;