import React, { useState, useEffect } from 'react';
import '../assets/css/popupmem/UserPage.css';
import AddDepartmentPopup from './components/popupmem/AddDepartmentPopup';
import AddMemberPopup from './components/popupmem/AddMemberPopup';
import MemberDetailPopup from './components/popupmem/MemberDetailPopup';
// TeamPopup không được sử dụng, có thể xóa dòng này nếu bạn muốn
// import TeamPopup from './components/popupmem/TeamPopup'; 
import WorkResultPopup from './components/popupmem/WorkResultPopup';
// === UPDATE: Import các component mới ===
import AdvancedStats from './components/popupmem/AdvancedStats';


// --- MOCK DATA (TRANSLATED TO ENGLISH) ---
const mockMembersData = [{ id: '2301001', name: 'Minh Tuan', department: 'ODD', team: 'Team 1', role: 'Leader' }, { id: '2301002', name: 'Khanh An', department: 'ODD', team: 'Team 2', role: 'Manager' }, { id: '2301003', name: 'Phuc Lam', department: 'ODD', team: 'Team 1', role: 'User' }, { id: '2301004', name: 'Thu Trang', department: 'ODD', team: 'Team 3', role: 'Leader' }, { id: '2302001', name: 'Anh Thu', department: 'ABD', team: 'Team 4', role: 'Leader' }, { id: '2302002', name: 'Bao Han', department: 'ABD', team: 'Team 4', role: 'User' }, { id: '2302003', name: 'Gia Huy', department: 'ABD', team: 'Team 5', role: 'Leader' }, { id: '2303001', name: 'Hoai An', department: 'HR', team: 'Team 6', role: 'Leader' }, { id: '2303002', name: 'Manh Dung', department: 'HR', team: 'Team 6', role: 'User' }, { id: '2303003', name: 'Duc Minh', department: 'HR', team: 'Team 7', role: 'User' },];
const mockWorkResults = { '2301001': { name: 'Minh Tuan', completedGames: [{ id: 1, name: 'Game 1', topic: 'Process', gameCode: '234', attempts: '3/4', avgScore: 7, highScore: 8, lastScore: 8 }, { id: 2, name: 'Game 2', topic: 'Security', gameCode: '343', attempts: '5/6', avgScore: 8, highScore: 9, lastScore: 9 },], attemptDetails: [{ attempt: 1, score: 8, time: '10:00 23/06/2025 - 17:00 23/06/2027' }, { attempt: 2, score: 8, time: '10:00 23/06/2025 - 17:00 23/06/2028' },] }, '2302001': { name: 'Anh Thu', completedGames: [{ id: 2, name: 'Game 2', topic: 'Security', gameCode: '343', attempts: '1/2', avgScore: 9, highScore: 9, lastScore: 9 }], attemptDetails: [{ attempt: 1, score: 9, time: '09:00 25/06/2025' }] }, };

function UserPage() {
    const [members, setMembers] = useState(mockMembersData);
    const [filteredMembers, setFilteredMembers] = useState(mockMembersData);
    const [selectedMemberIds, setSelectedMemberIds] = useState([]);
    const [filters, setFilters] = useState({ name: '', code: '', department: '', team: '', role: '' });
    const [viewingMember, setViewingMember] = useState(null);
    const [showWorkResultPopup, setShowWorkResultPopup] = useState(false);
    const [popupMemberInfo, setPopupMemberInfo] = useState(null);
    const [showAddMemberPopup, setShowAddMemberPopup] = useState(false);
    const [showAddDepartmentPopup, setShowAddDepartmentPopup] = useState(false);

    useEffect(() => {
        let tempMembers = members.filter(m =>
            (m.name.toLowerCase().includes(filters.name.toLowerCase()) || filters.name === "") &&
            (m.id.includes(filters.code) || filters.code === "") &&
            (m.department.toLowerCase().includes(filters.department.toLowerCase()) || filters.department === "") &&
            (m.team.toLowerCase().includes(filters.team.toLowerCase()) || filters.team === "")&&
            (m.role.toLowerCase().includes(filters.role.toLowerCase()) || filters.role === "")

        );
        setFilteredMembers(tempMembers);
    }, [filters, members]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setShowWorkResultPopup(false);
                setViewingMember(null);
                setShowAddMemberPopup(false);
                setShowAddDepartmentPopup(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectMember = (memberId) => {
        setSelectedMemberIds(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]);
    };

    const handleSelectAll = (e) => {
        setSelectedMemberIds(e.target.checked ? filteredMembers.map(m => m.id) : []);
    };

    const handleDeleteSelected = () => {
        if (selectedMemberIds.length === 0) return alert("Please select members to delete.");
        setMembers(prev => prev.filter(m => !selectedMemberIds.includes(m.id)));
        setSelectedMemberIds([]);
    };

    const handleShowResultPopup = (memberId) => {
        const results = mockWorkResults[memberId];
        if (results) {
            setPopupMemberInfo(results);
            setShowWorkResultPopup(true);
        } else {
            alert("This member has no work results data.");
        }
    };

    const handleFetch = () => {
        alert('Fetching latest data...');
        setMembers(mockMembersData);
        setFilters({ name: '', code: '', topic: '', team: '' });
    };

    const handleExport = () => {
        if (selectedMemberIds.length === 0) {
            alert('Please select members to export.');
            return;
        }
        alert(`Exporting data for ${selectedMemberIds.length} selected member(s)...`);
    };

    const handleSaveMember = (updatedMember) => {
        setMembers(prevMembers =>
            prevMembers.map(m => (m.id === updatedMember.id ? updatedMember : m))
        );
        setViewingMember(null);
    };

    return (
        <div className="management-container">
            <h1 className="management-title">USER MANAGEMENT</h1>
            {/* === UPDATE: Thêm các component mới vào đây === */}
            <AdvancedStats />

            <div className="glass-card">
                {/* === UPDATE: Bố cục thanh tìm kiếm 2 hàng mới === */}
                <div className="filter-section">
                    <input type="text" name="name" value={filters.name} onChange={handleFilterChange} placeholder="Name" className="filter-input" />
                    <input type="text" name="code" value={filters.code} onChange={handleFilterChange} placeholder="Code" className="filter-input" />
                    <input type="text" name="department" value={filters.department} onChange={handleFilterChange} placeholder="Department" className="filter-input" />
                    <input type="text" name="team" value={filters.team} onChange={handleFilterChange} placeholder="Team" className="filter-input" />

                    {/* Hàng thứ 2 */}
                    <input type="text" name="role" value={filters.role} onChange={handleFilterChange} placeholder="Role" className="filter-input" />

                    {/* 2 ô trống để đẩy nhóm nút sang phải */}
                    <div></div>
                    <div></div>

                    <div className="button-group">
                        <button className="btn btn-primary">Search</button>
                        <button className="btn btn-secondary" onClick={() => setFilters({ name: '', code: '', department: '', team: '', role: '' })}>Reset</button>
                    </div>
                </div>
            </div>
            {/* ========================================= */}
            
1
            {/* Thanh công cụ đã được di chuyển từ đây... */}

            <div className="glass-card" style={{ marginTop: '20px' }}>
                {/* ...vào đây, ngay bên trong thẻ glass-card của bảng */}
                <div className="actions-toolbar">
                    <span className="action-link" onClick={(e) => { e.preventDefault(); const cb = document.getElementById('select-all-cb'); cb.checked = !cb.checked; handleSelectAll({ target: cb }); }}>Select All</span>
                    <span className="action-link" onClick={(e) => { e.preventDefault(); handleDeleteSelected(); }}>Delete</span>
                    <span className="action-link" onClick={(e) => { e.preventDefault(); handleFetch(); }}>Fetch</span>
                    <span className="action-link" onClick={(e) => { e.preventDefault(); handleExport(); }}>Export</span>
                </div>

                <table className="management-table">
                    <thead>
                        <tr>
                            <th>Name</th><th>Code</th><th>Department</th><th>Team</th><th>Role</th><th>Actions</th>
                            <th><input id="select-all-cb" type="checkbox" onChange={handleSelectAll} checked={filteredMembers.length > 0 && selectedMemberIds.length === filteredMembers.length} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.map(member => (
                            <tr key={member.id}>
                                <td><span className="action-link" onClick={() => setViewingMember(member)}>{member.name}</span></td>
                                <td>{member.id}</td><td>{member.department}</td><td>{member.team}</td><td>{member.role}</td>
                                <td><button className="btn btn-view" onClick={() => handleShowResultPopup(member.id)}>View Results</button></td>
                                <td><input type="checkbox" checked={selectedMemberIds.includes(member.id)} onChange={() => handleSelectMember(member.id)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="table-actions-footer">
                    <button className="btn btn-add" onClick={() => setShowAddMemberPopup(true)}>Add Member</button>
                    <button className="btn btn-add" style={{ marginLeft: '15px' }} onClick={() => setShowAddDepartmentPopup(true)}>Add Department/Team</button>
                </div>
            </div>

            {showWorkResultPopup && <WorkResultPopup memberInfo={popupMemberInfo} onClose={() => setShowWorkResultPopup(false)} />}
            {viewingMember && <MemberDetailPopup member={viewingMember} onClose={() => setViewingMember(null)} onSave={handleSaveMember} />}
            {showAddMemberPopup && <AddMemberPopup onClose={() => setShowAddMemberPopup(false)} onAddMember={() => { alert('Add member functionality in development'); setShowAddMemberPopup(false); }} />}
            {showAddDepartmentPopup && <AddDepartmentPopup onClose={() => setShowAddDepartmentPopup(false)} onAddDepartment={() => { alert('Add department functionality in development'); setShowAddDepartmentPopup(false); }} />}
        </div>
    );
}

export default UserPage;