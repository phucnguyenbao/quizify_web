import React, { useState, useEffect } from 'react';

// --- DỮ LIỆU MẪU BAN ĐẦU (ĐÃ MỞ RỘNG) ---
const mockMembersData = [
    { id: '2301001', name: 'Minh Tuấn', department: 'ODD', team: 'Team 1', role: 'Leader' },
    { id: '2301002', name: 'Khánh An', department: 'ODD', team: 'Team 2', role: 'Manager' },
    { id: '2301003', name: 'Phúc Lâm', department: 'ODD', team: 'Team 1', role: 'user' },
    { id: '2301004', name: 'Thu Trang', department: 'ODD', team: 'Team 3', role: 'Leader' },
    { id: '2302001', name: 'Anh Thư', department: 'ABD', team: 'Team 4', role: 'Leader' },
    { id: '2302002', name: 'Bảo Hân', department: 'ABD', team: 'Team 4', role: 'user' },
    { id: '2302003', name: 'Gia Huy', department: 'ABD', team: 'Team 5', role: 'Leader' },
    { id: '2303001', name: 'Hoài An', department: 'HR', team: 'Team 6', role: 'Leader' },
    { id: '2303002', name: 'Mạnh Dũng', department: 'HR', team: 'Team 6', role: 'user' },
    { id: '2303003', name: 'Đức Minh', department: 'HR', team: 'Team 7', role: 'user' },
];

const mockTeamsByDepartment = {
    ODD: [
        { id: 'T1', name: 'Team 1 (Frontend)', leader: 'Minh Tuấn', members: 2, games: 5 },
        { id: 'T2', name: 'Team 2 (Backend)', leader: 'Khánh An', members: 1, games: 4 },
        { id: 'T3', name: 'Team 3 (Mobile)', leader: 'Thu Trang', members: 1, games: 4 },
    ],
    ABD: [
        { id: 'T4', name: 'Team 4 (Sales)', leader: 'Anh Thư', members: 2, games: 3 },
        { id: 'T5', name: 'Team 5 (Marketing)', leader: 'Gia Huy', members: 1, games: 2 }
    ],
    HR: [
        { id: 'T6', name: 'Team 6 (Recruitment)', leader: 'Hoài An', members: 2, games: 2 },
        { id: 'T7', name: 'Team 7 (C&B)', leader: 'Đức Minh', members: 1, games: 1 },
    ]
};


// Dữ liệu popup chi tiết bài làm
const mockWorkResults = {
    '2301001': { // Dữ liệu cho Minh Tuấn
        name: 'Minh Tuấn',
        completedGames: [
            { id: 1, name: 'Game 1', topic: 'Quy trình', gameCode: '234', attempts: '3/4', avgScore: 7, highScore: 8, lastScore: 8 },
            { id: 2, name: 'Game 2', topic: 'Bảo mật', gameCode: '343', attempts: '5/6', avgScore: 8, highScore: 9, lastScore: 9 },
            { id: 3, name: 'Game 3', topic: 'Chấm công', gameCode: '545', attempts: '6/7', avgScore: 8, highScore: 9, lastScore: 9 },
        ],
        attemptDetails: [
            { attempt: 1, score: 8, time: '10:00 23/06/2025 - 17:00 23/06/2027' },
            { attempt: 2, score: 8, time: '10:00 23/06/2025 - 17:00 23/06/2028' },
            { attempt: 3, score: 7, time: '10:00 23/06/2025 - 17:00 23/06/2029' },
            { attempt: 4, score: 8, time: '10:00 23/06/2025 - 17:00 23/06/2027' },
        ]
    },
    '2302001': { // Dữ liệu cho Anh Thư
        name: 'Anh Thư',
        completedGames: [{ id: 2, name: 'Game 2', topic: 'Bảo mật', gameCode: '343', attempts: '1/2', avgScore: 9, highScore: 9, lastScore: 9 }],
        attemptDetails: [{ attempt: 1, score: 9, time: '09:00 25/06/2025' }]
    },
};
const mockGamesData = [{ id: 1, name: 'Quy trình Onboarding', openDate: '23/07/2025' }, { id: 2, name: 'An toàn thông tin', openDate: '15/08/2025' }, { id: 3, name: 'Văn hóa Doanh nghiệp', openDate: '01/09/2025' }];

function MemManage() {

    // --- STATE MANAGEMENT ---
    const [members, setMembers] = useState(mockMembersData);
    const [filteredMembers, setFilteredMembers] = useState(mockMembersData);
    const [selectedMemberIds, setSelectedMemberIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [teamFilter, setTeamFilter] = useState('all');
    const [showResultPopup, setShowResultPopup] = useState(false);
    const [popupMemberInfo, setPopupMemberInfo] = useState(null);
    const [viewingDept, setViewingDept] = useState(null);
    const [showAddMemberPopup, setShowAddMemberPopup] = useState(false);
    const [showAddDepartmentPopup, setShowAddDepartmentPopup] = useState(false);

    // Thêm state để lưu thành viên đang xem chi tiết
    const [viewingMember, setViewingMember] = useState(null);

    // --- DYNAMIC DATA LOGIC ---
    const allDepartments = [...new Set(members.map(m => m.department))];
    const allTeams = [...new Set(members.map(m => m.team))];
    const departmentStats = allDepartments.map(deptName => { const deptMembers = members.filter(m => m.department === deptName); const leader = deptMembers.find(m => m.role === 'Leader'); return { id: deptName, name: deptName, leader: leader ? leader.name : 'N/A', members: deptMembers.length, games: mockTeamsByDepartment[deptName]?.length || 0 }; });

    // --- EVENT HANDLERS ---
    useEffect(() => { let tempMembers = members; if (searchTerm) { tempMembers = tempMembers.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.id.includes(searchTerm)); } if (departmentFilter !== 'all') { tempMembers = tempMembers.filter(m => m.department === departmentFilter); } if (teamFilter !== 'all') { tempMembers = tempMembers.filter(m => m.team === teamFilter); } setFilteredMembers(tempMembers); }, [searchTerm, departmentFilter, teamFilter, members]);
    const handleSelectMember = (memberId) => { setSelectedMemberIds(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]); };
    const handleSelectAll = (e) => { setSelectedMemberIds(e.target.checked ? filteredMembers.map(m => m.id) : []); };
    const handleDeleteSelected = () => { if (selectedMemberIds.length === 0) return alert("Vui lòng chọn thành viên để xóa."); setMembers(prev => prev.filter(m => !selectedMemberIds.includes(m.id))); setSelectedMemberIds([]); };
    const handleMemberChange = (memberId, field, value) => { setMembers(members.map(m => m.id === memberId ? { ...m, [field]: value } : m)); };
    const handleShowResultPopup = (memberId) => { const results = mockWorkResults[memberId]; if (results) { setPopupMemberInfo(results); setShowResultPopup(true); } else { alert("Thành viên này chưa có dữ liệu bài làm."); } };
    const toggleTeamPopup = (department) => { setViewingDept(current => (current && current.id === department.id ? null : department)); };

    // --- STYLES ---
    const styles = {
        container: { fontFamily: 'Arial, sans-serif', padding: '15px', fontSize: '14px', backgroundColor: '#fff' },
        mainLayout: { display: 'flex', gap: '30px', marginTop: '20px', alignItems: 'flex-start' },
        leftColumn: { flex: '2 1 65%', display: 'flex', flexDirection: 'column', gap: '20px' },
        rightColumn: { flex: '1 1 35%', display: 'flex', flexDirection: 'column', gap: '20px' },
        toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' },
        searchBox: { display: 'flex', alignItems: 'center', gap: '10px' },
        filterContainer: { display: 'flex', gap: '10px' },
        bulkActions: { display: 'flex', alignItems: 'center', gap: '15px' },
        table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px', backgroundColor: '#fff' },
        th: { border: '1px solid #ddd', padding: '10px 8px', textAlign: 'left', backgroundColor: '#f7f7f7', fontWeight: 'bold' },
        td: { border: '1px solid #ddd', padding: '10px 8px', verticalAlign: 'middle' },
        select: { border: '1px solid #ccc', padding: '6px', backgroundColor: '#f0f0f0' },
        button: { padding: '6px 12px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#f0f0f0' },
        link: { color: '#007bff', textDecoration: 'underline', cursor: 'pointer' },
        actionLinksContainer: { marginTop: '15px', display: 'flex', gap: '30px' },
        section: { border: '2px solid orange', padding: '15px', borderRadius: '5px' },
        sectionTitle: { fontWeight: 'bold', marginBottom: '10px', fontSize: '1em' },
        backdrop: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
        popup: { width: '80%', maxWidth: '1100px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', border: '2px solid orange', maxHeight: '90vh', overflowY: 'auto' },
        popupHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' },
        popupFooter: { textAlign: 'right', marginTop: '30px' },
    };

    // --- CHILD COMPONENTS (POPUPS) ---
    const WorkResultPopup = ({ memberInfo, onClose }) => (
        <div style={styles.backdrop}>
            <div style={styles.popup}>
                <div style={styles.popupHeader}>
                    <h2 style={{ ...styles.sectionTitle, fontSize: '1.2em', margin: 0 }}>Tên thành viên: {memberInfo.name}</h2>
                </div>

                <h3 style={{ ...styles.sectionTitle, fontSize: '1.1em' }}>Các bài đã làm</h3>
                <table style={{ ...styles.table, marginBottom: '30px' }}>
                    <thead><tr>
                        <th style={styles.th}>Tên Game</th><th style={styles.th}>Chủ đề</th>
                        <th style={styles.th}>Mã game</th><th style={styles.th}>Số lần đã làm</th>
                        <th style={styles.th}>Điểm trung bình</th><th style={styles.th}>Điểm cao nhất</th>
                        <th style={styles.th}></th>
                    </tr></thead>
                    <tbody>{memberInfo.completedGames.map(game => (<tr key={game.id}><td style={styles.td}>{game.name}</td><td style={styles.td}>{game.topic}</td><td style={styles.td}>{game.gameCode}</td><td style={styles.td}>{game.attempts}</td><td style={styles.td}>{game.avgScore}</td><td style={styles.td}>{game.highScore}</td><td style={styles.td}>{game.lastScore} <span style={styles.link}>Làm bài</span></td></tr>))}</tbody>
                </table>

                <h3 style={{ ...styles.sectionTitle, fontSize: '1.1em' }}>Chi tiết lần làm: Game 1</h3>
                <table style={{ ...styles.table, marginBottom: '30px' }}>
                    <thead><tr><th style={styles.th}>Lần</th><th style={styles.th}>Điểm</th><th style={styles.th}>Thời gian</th></tr></thead>
                    <tbody>{memberInfo.attemptDetails.map(detail => (<tr key={detail.attempt}><td style={styles.td}>{detail.attempt}</td><td style={styles.td}>{detail.score}</td><td style={styles.td}>{detail.time}</td></tr>))}</tbody>
                </table>

                <div>
                    <p>Chart thống kê điểm</p>
                    <img src="https://i.imgur.com/vHqB7aI.png" alt="Biểu đồ thống kê điểm" style={{ width: '50%', maxWidth: '400px' }} />
                </div>

                <div style={styles.popupFooter}><span style={styles.link} onClick={onClose}>Thoát</span></div>
            </div>
        </div>
    );
    const AddMemberPopup = ({ onClose, onAddMember }) => {
        // Style cho popup, bạn có thể tách ra file CSS riêng nếu muốn
        const popupStyles = {
            container: { border: '2px solid orange', padding: '20px', backgroundColor: 'white', borderRadius: '5px' },
            title: { margin: '0 0 20px 0', fontSize: '1.2em' },
            header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
            table: { width: '100%', borderCollapse: 'collapse', marginBottom: '15px' },
            th: { padding: '8px', textAlign: 'left', fontWeight: 'normal', color: '#555' },
            actions: { display: 'flex', justifyContent: 'flex-end', gap: '15px' },
            link: { color: 'blue', cursor: 'pointer', textDecoration: 'underline' },
            fileInputSection: { border: '2px solid blue', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        };

        return (
            <div style={styles.backdrop}>
                <div style={popupStyles.container}>
                    <div style={popupStyles.header}>
                        <h2 style={popupStyles.title}>Pop-up thêm thành viên thủ công</h2>
                        <div style={popupStyles.actions}>
                            <span style={popupStyles.link} onClick={onAddMember}>Thêm</span>
                            <span style={popupStyles.link} onClick={onClose}>Cancel</span>
                        </div>
                    </div>

                    <a href="#/" style={popupStyles.link}>Thêm mới</a>

                    <table style={popupStyles.table}>
                        <thead>
                            <tr>
                                <th style={popupStyles.th}>Tên</th>
                                <th style={popupStyles.th}>Họ</th>
                                <th style={popupStyles.th}>SĐT</th>
                                <th style={popupStyles.th}>Email</th>
                                <th style={popupStyles.th}>Ban</th>
                                <th style={popupStyles.th}>Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Hàng để nhập liệu, sau này có thể thêm động */}
                            <tr>
                                <td><input type="text" style={{ width: '90%' }} /></td>
                                <td><input type="text" style={{ width: '90%' }} /></td>
                                <td><input type="text" style={{ width: '90%' }} /></td>
                                <td><input type="email" style={{ width: '90%' }} /></td>
                                <td><input type="text" style={{ width: '90%' }} /></td>
                                <td><input type="text" style={{ width: '90%' }} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={popupStyles.fileInputSection}>
                        <label htmlFor="member-file">Nhập file</label>
                        <input type="file" id="member-file" style={{ display: 'none' }} />
                        <button onClick={() => document.getElementById('member-file').click()}>Tạo</button>
                    </div>
                </div>
            </div>
        );
    };
    const AddDepartmentPopup = ({ onClose, onAddDepartment }) => {
        // Tái sử dụng style từ popup trên
        const popupStyles = {
            container: { border: '2px solid orange', padding: '20px', backgroundColor: 'white', borderRadius: '5px', width: '80%', maxWidth: '900px' },
            title: { margin: '0 0 20px 0', fontSize: '1.2em' },
            header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
            table: { width: '100%', borderCollapse: 'collapse', marginBottom: '15px' },
            th: { padding: '8px', textAlign: 'left', fontWeight: 'normal', color: '#555' },
            actions: { display: 'flex', justifyContent: 'flex-end', gap: '15px' },
            link: { color: 'blue', cursor: 'pointer', textDecoration: 'underline' },
            fileInputSection: { border: '2px solid blue', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
        };

        return (
            <div style={styles.backdrop}>
                <div style={popupStyles.container}>
                    <div style={popupStyles.header}>
                        <h2 style={popupStyles.title}>Thêm phòng ban / nhóm mới</h2>
                        <div style={popupStyles.actions}>
                            <span style={popupStyles.link} onClick={onAddDepartment}>Thêm</span>
                            <span style={popupStyles.link} onClick={onClose}>Cancel</span>
                        </div>
                    </div>

                    <a href="#/" style={popupStyles.link}>Thêm mới</a>

                    <table style={popupStyles.table}>
                        <thead>
                            <tr>
                                <th style={popupStyles.th}>Tên phòng ban/nhóm</th>
                                <th style={popupStyles.th}>Manager</th>
                                <th style={popupStyles.th}>Leader</th>
                                <th style={popupStyles.th}>Email</th>
                                <th style={popupStyles.th}>Sđt</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" style={{ width: '90%' }} /></td>
                                <td><input type="text" style={{ width: '90%' }} /></td>
                                <td><input type="text" style={{ width: '90%' }} /></td>
                                <td><input type="email" style={{ width: '90%' }} /></td>
                                <td><input type="text" style={{ width: '90%' }} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={popupStyles.fileInputSection}>
                        <label htmlFor="dept-file">Nhập file</label>
                        <input type="file" id="dept-file" style={{ display: 'none' }} />
                        <button onClick={() => document.getElementById('dept-file').click()}>Tạo</button>
                    </div>
                </div>
            </div>
        );
    };

    const TeamPopup = ({ teams, onClose }) => (
        <div style={styles.section}><table style={{ ...styles.table, marginTop: 0 }}>
            <thead><tr><th style={styles.th}>Team</th><th style={styles.th}>Leader</th><th style={styles.th}>Số thành viên</th><th style={styles.th}>Số lượng game</th></tr></thead>
            <tbody>{teams.map(team => (<tr key={team.id}><td style={{ ...styles.td, backgroundColor: '#f0f0f0' }}>{team.name}</td><td style={styles.td}>{team.leader}</td><td style={styles.td}>{team.members}</td><td style={styles.td}>{team.games}</td></tr>))}</tbody>
        </table><div style={{ textAlign: 'right', marginTop: '10px' }}><span style={styles.link}>Sửa</span><span style={styles.link} onClick={onClose}>Cancel</span></div></div>
    );

    // Popup chi tiết thành viên
    const MemberDetailPopup = ({ member, onClose }) => (
        <div style={styles.backdrop}>
            <div style={styles.popup}>
                <div style={styles.popupHeader}>
                    <b>Thông tin cá nhân</b>
                </div>
                <table style={{ width: '100%', fontSize: 14, border: 'none', background: 'transparent' }}>
                    <tbody>
                        <tr>
                            <td>Mã nhân viên</td>
                            <td>{member.id}</td>
                            <td rowSpan={8} style={{ borderLeft: '1px solid #ccc', paddingLeft: 16, verticalAlign: 'top' }}>
                                <div>
                                    <div><b>Nội dung thay đổi</b></div>
                                    <div>Thay tên</div>
                                    <div>Thêm tên đệm</div>
                                </div>
                            </td>
                            <td rowSpan={8} style={{ verticalAlign: 'top' }}>
                                <div>
                                    <div><b>Ngày thay đổi</b></div>
                                    <div>23/07/2025</div>
                                    <div>24/07/2025</div>
                                </div>
                            </td>
                            <td rowSpan={8} style={{ borderLeft: '1px solid #ccc', paddingLeft: 16, verticalAlign: 'top' }}>
                                <div>
                                    <div><b>Leader</b></div>
                                    <div>Khải</div>
                                </div>
                            </td>
                            <td rowSpan={8} style={{ verticalAlign: 'top' }}>
                                <div>
                                    <div><b>Manager</b></div>
                                    <div>Cường</div>
                                </div>
                            </td>
                            <td rowSpan={8} style={{ borderLeft: '1px solid #ccc', paddingLeft: 16, verticalAlign: 'top' }}>
                                <div>
                                    <div><b>Phòng ban</b></div>
                                    <div>{member.department}</div>
                                </div>
                            </td>
                            <td rowSpan={8} style={{ verticalAlign: 'top' }}>
                                <div>
                                    <div><b>Team</b></div>
                                    <div>{member.team}</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Tên</td>
                            <td>{member.name.split(' ').slice(-1).join(' ')}</td>
                        </tr>
                        <tr>
                            <td>Họ</td>
                            <td>{member.name.split(' ').slice(0, -1).join(' ')}</td>
                        </tr>
                        <tr>
                            <td>Sđt</td>
                            <td>948393</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>tramminh@gmail.com</td>
                        </tr>
                        <tr>
                            <td>Ngày đăng ký</td>
                            <td>23/07/2025</td>
                        </tr>
                        <tr>
                            <td>Ngày truy cập gần nhất</td>
                            <td>23/07/2025</td>
                        </tr>
                        <tr>
                            <td>Trạng thái</td>
                            <td>
                                <span style={{
                                    background: 'green',
                                    color: 'white',
                                    borderRadius: 12,
                                    padding: '2px 12px'
                                }}>Active</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Role</td>
                            <td colSpan={7}>User/ Leader/ Manager</td>
                        </tr>
                    </tbody>
                </table>
                <div style={styles.popupFooter}>
                    <span style={styles.link}>Sửa</span>
                    <span style={styles.link} onClick={onClose}>Cancel</span>
                </div>
            </div>
        </div>
    );

    // --- MAIN RENDER ---
    return (
        <div style={styles.container}>
            <div style={styles.toolbar}>
                <div style={styles.searchBox}><span>Tìm kiếm:</span><input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Tên hoặc mã..." style={{ padding: '5px', width: '200px' }} /></div>
                <div style={styles.filterContainer}><select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} style={styles.select}><option value="all">Lọc theo phòng ban</option>{allDepartments.map(dep => <option key={dep} value={dep}>{dep}</option>)}</select><select value={teamFilter} onChange={e => setTeamFilter(e.target.value)} style={styles.select}><option value="all">Lọc theo team</option>{allTeams.map(team => <option key={team} value={team}>{team}</option>)}</select></div>
                <div style={styles.bulkActions}><span style={styles.link} onClick={(e) => { const cb = document.getElementById('select-all-cb'); cb.checked = !cb.checked; handleSelectAll({ target: cb }); }}>Chọn hết</span><span style={styles.link}>Export</span><button onClick={handleDeleteSelected} style={styles.button}>Xóa</button></div>
            </div>
            <div>
                <p><b>Manager phòng ban: ODD / Leader nhóm 1 - ABD</b></p>
                <table style={styles.table}>
                    <thead><tr><th style={styles.th}>Mã nhân viên</th><th style={styles.th}>Tên</th><th style={styles.th}>Phòng ban</th><th style={styles.th}>Team</th><th style={styles.th}>Role</th><th style={styles.th}>Hành động</th><th style={{ ...styles.th, width: '30px' }}><input id="select-all-cb" type="checkbox" onChange={handleSelectAll} checked={filteredMembers.length > 0 && selectedMemberIds.length === filteredMembers.length} /></th></tr></thead>
                    <tbody>
                        {filteredMembers.map(member => (
                            <tr key={member.id}>
                                <td style={styles.td}>{member.id}</td>
                                {/* Thêm sự kiện click vào tên */}
                                <td style={styles.td}>
                                    <span style={styles.link} onClick={() => setViewingMember(member)}>
                                        {member.name}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <select style={styles.select} value={member.department} onChange={(e) => handleMemberChange(member.id, 'department', e.target.value)}>
                                        {allDepartments.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </td>
                                <td style={styles.td}>
                                    <select style={styles.select} value={member.team} onChange={(e) => handleMemberChange(member.id, 'team', e.target.value)}>
                                        {allTeams.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </td>
                                <td style={styles.td}>
                                    <select style={styles.select} value={member.role} onChange={(e) => handleMemberChange(member.id, 'role', e.target.value)}>
                                        <option>Leader</option>
                                        <option>Manager</option>
                                        <option>user</option>
                                    </select>
                                </td>
                                <td style={styles.td}>
                                    <span style={styles.link} onClick={() => handleShowResultPopup(member.id)}>Xem bài làm</span>
                                </td>
                                <td style={styles.td}>
                                    <input type="checkbox" checked={selectedMemberIds.includes(member.id)} onChange={() => handleSelectMember(member.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={styles.actionLinksContainer}>
                    <span style={styles.link}>Chi tiết thành viên</span>
                    <span style={styles.link} onClick={() => setShowAddMemberPopup(true)}>Thêm thành viên</span>
                    <span style={styles.link} onClick={() => setShowAddDepartmentPopup(true)}>Thêm phòng/team</span>
                </div>            </div>
            <div style={styles.mainLayout}>
                <div style={styles.leftColumn}>
                    <div style={styles.section}>
                        <p style={styles.sectionTitle}>Thống kê phòng ban</p>
                        <table style={{ ...styles.table, marginTop: 0 }}>
                            <thead><tr><th style={styles.th}>Tên</th><th style={styles.th}>Leader</th><th style={styles.th}>Số thành viên</th><th style={styles.th}>Số lượng team</th><th style={styles.th}>Hành động</th></tr></thead>
                            <tbody>{departmentStats.map(stat => (
        <tr key={stat.id}>
            <td style={styles.td}>
                <span style={styles.link} onClick={() => toggleTeamPopup(stat)}>{stat.name}</span>
            </td>
            <td style={styles.td}>{stat.leader}</td>
            <td style={styles.td}>{stat.members}</td>
            <td style={styles.td}>{stat.games}</td>
            <td style={styles.td}>
                <span
                    style={styles.link}
                    onClick={() => alert(`Chức năng Sửa phòng ban "${stat.name}" đang phát triển!`)}
                >Sửa</span>
                {" "}
                <span
                    style={styles.link}
                    onClick={() => {
                        if (window.confirm(`Bạn có chắc muốn xóa phòng ban "${stat.name}"?`)) {
                            // Xóa phòng ban khỏi danh sách (chỉ xóa trên UI)
                            setMembers(members.filter(m => m.department !== stat.name));
                        }
                    }}
                >Cancel</span>
            </td>
        </tr>
    ))}</tbody>
                        </table>
                    </div>
                    {viewingDept && <TeamPopup teams={mockTeamsByDepartment[viewingDept.name] || []} onClose={() => setViewingDept(null)} />}
                </div>
                <div style={styles.rightColumn}>
                    <div><p>Chart thống kê điểm trung bình</p><div style={{ border: '1px solid #ccc', padding: '20px', backgroundColor: '#333', color: 'white', textAlign: 'center', minHeight: '150px' }}>Chart component here</div></div>
                    <div style={styles.section}><table style={{ ...styles.table, marginTop: 0 }}><thead><tr><th style={styles.th}>Game</th><th style={styles.th}>Ngày mở</th></tr></thead><tbody>{mockGamesData.map(game => (<tr key={game.id}><td style={styles.td}>{game.id}. <span style={styles.link}>{game.name}</span></td><td style={styles.td}>{game.openDate}</td></tr>))}</tbody></table><div style={{ textAlign: 'right', marginTop: '10px' }}><span style={styles.link}>Xem</span> <span style={styles.link}>Cancel</span></div></div>
                </div>
            </div>
            {showResultPopup && <WorkResultPopup memberInfo={popupMemberInfo} onClose={() => setShowResultPopup(false)} />}
            {viewingMember && (
                <MemberDetailPopup
                    member={viewingMember}
                    onClose={() => setViewingMember(null)}
                />
            )}

            {/* --- THÊM ĐOẠN MÃ NÀY --- */}
            {showAddMemberPopup && (
                <AddMemberPopup
                    onClose={() => setShowAddMemberPopup(false)}
                    onAddMember={() => {
                        alert('Chức năng thêm thành viên đang được phát triển!');
                        setShowAddMemberPopup(false);
                    }}
                />
            )}

            {showAddDepartmentPopup && (
                <AddDepartmentPopup
                    onClose={() => setShowAddDepartmentPopup(false)}
                    onAddDepartment={() => {
                        alert('Chức năng thêm phòng ban đang được phát triển!');
                        setShowAddDepartmentPopup(false);
                    }}
                />
            )}
            
            {viewingMember && (
                <MemberDetailPopup
                    member={viewingMember}
                    onClose={() => setViewingMember(null)}
                />
            )}
        </div>
    );
}

export default MemManage;