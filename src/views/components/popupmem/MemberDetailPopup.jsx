import React from 'react';
import '../../../assets/css/popupmem/Popups.css';

const MemberDetailPopup = ({ member, onClose }) => {
    const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' };
    const fieldStyle = { marginBottom: '15px' };
    const labelStyle = { fontWeight: '600', color: '#555', display: 'block', marginBottom: '5px' };
    const valueStyle = { color: '#333' };
    const statusStyle = { background: 'green', color: 'white', borderRadius: 12, padding: '2px 12px', fontSize: '12px' };

    return (
        <div className="popup-backdrop">
            <div className="popup-content">
                <div className="popup-header"><h2 className="popup-title">Member Information</h2></div>
                <div style={gridStyle}>
                    <div>
                        <div style={fieldStyle}><span style={labelStyle}>Employee ID</span><span style={valueStyle}>{member.id}</span></div>
                        <div style={fieldStyle}><span style={labelStyle}>Full Name</span><span style={valueStyle}>{member.name}</span></div>
                        <div style={fieldStyle}><span style={labelStyle}>Phone</span><span style={valueStyle}>0912345678</span></div>
                        <div style={fieldStyle}><span style={labelStyle}>Email</span><span style={valueStyle}>member.email@example.com</span></div>
                    </div>
                    <div>
                        <div style={fieldStyle}><span style={labelStyle}>Department</span><span style={valueStyle}>{member.department}</span></div>
                        <div style={fieldStyle}><span style={labelStyle}>Team</span><span style={valueStyle}>{member.team}</span></div>
                        <div style={fieldStyle}><span style={labelStyle}>Role</span><span style={valueStyle}>{member.role}</span></div>
                        <div style={fieldStyle}><span style={labelStyle}>Status</span><span style={statusStyle}>Active</span></div>
                    </div>
                    <div>
                        <div style={fieldStyle}><span style={labelStyle}>Registration Date</span><span style={valueStyle}>2025-07-23</span></div>
                        <div style={fieldStyle}><span style={labelStyle}>Last Access Date</span><span style={valueStyle}>2025-07-28</span></div>
                    </div>
                </div>
                <div className="popup-footer">
                    <span className="popup-link" style={{ marginRight: '15px' }}>Edit</span>
                    <span className="popup-link" onClick={onClose}>Close</span>
                </div>
            </div>
        </div>
    );
};
export default MemberDetailPopup;