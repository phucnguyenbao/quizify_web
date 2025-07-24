import React, { useState } from 'react';
import Papa from 'papaparse';
import '../../../assets/css/popupmem/Popups.css';

const AddMemberPopup = ({ onClose, onAddMember }) => {
    const [parsedData, setParsedData] = useState([]);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    // UPDATE: Chỉnh sửa lại logic mapping, không cần member_id nữa
                    const formattedData = results.data.map(row => ({
                        avatar_id: row.avatar_id || "default.png",
                        background_sound: row.background_sound || "On",
                        email: row.email || "",
                        image_id: row.image_id || "",
                        language: row.language || "Vietnamese",
                        leader: row.leader ? row.leader.toLowerCase() === 'true' : false,
                        manager: row.manager ? row.manager.toLowerCase() === 'true' : false,
                        // member_id sẽ được tạo ở backend, không cần ở đây
                        member_name: row.member_name || "",
                        middle_and_last_name: row.middle_and_last_name || "",
                        music: row.music || "Default",
                        password: row.password || "123456",
                        phone_number: row.phone_number || "",
                        status: row.status ? row.status.toLowerCase() === 'true' : true,
                        supervisor_id: row.supervisor_id || "",
                        team_id: parseInt(row.team_id, 10) || null,
                        theme: row.theme || "Light",
                    }));
                    setParsedData(formattedData);
                },
                error: (error) => {
                    console.error("Error parsing CSV:", error);
                    alert("Đã có lỗi xảy ra khi đọc file CSV.");
                }
            });
        }
    };

    const handleAddClick = () => {
        if (parsedData.length > 0) {
            onAddMember(parsedData);
        } else {
            alert("Vui lòng chọn một file để import.");
        }
    };

    return (
        <div className="popup-backdrop">
            <div className="popup-content">
                <div className="add-popup-grid">
                    <div className="add-popup-left">
                        <h2 className="popup-main-title">Add New Member</h2>
                        <div className="add-popup-actions">
                            <span className="popup-link" onClick={handleAddClick}>Add</span>
                            <span className="popup-link" onClick={onClose}>Cancel</span>
                            <span className="popup-link">Add New Row</span>
                        </div>
                    </div>
                    <div className="add-popup-right">
                        {/* Phần form thủ công có thể giữ nguyên */}
                        <div className="import-card">
                            <span>Import from file (.csv)</span>
                            <input type="file" id="member-file" style={{ display: 'none' }} onChange={handleFileChange} accept=".csv" />
                            <button className="btn btn-secondary" onClick={() => document.getElementById('member-file').click()}>Browse</button>
                            {fileName && <p style={{ marginTop: '10px', fontSize: '14px' }}>File: {fileName}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMemberPopup;
