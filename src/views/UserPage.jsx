import React, { useState, useEffect, useMemo } from 'react';
import '../assets/css/popupmem/UserPage.css';
import AddDepartmentPopup from './components/popupmem/AddDepartmentPopup';
import AddMemberPopup from './components/popupmem/AddMemberPopup';
import MemberDetailPopup from './components/popupmem/MemberDetailPopup';
import WorkResultPopup from './components/popupmem/WorkResultPopup';
import AdvancedStats from './components/popupmem/AdvancedStats';


// --- MOCK DATA ---
const mockMembersData = [{ id: '2301001', name: 'Minh Tuan', department: 'ODD', team: 'Team 1', role: 'Leader' }, { id: '2301002', name: 'Khanh An', department: 'ODD', team: 'Team 2', role: 'Manager' }, { id: '2301003', name: 'Phuc Lam', department: 'ODD', team: 'Team 1', role: 'User' }, { id: '2301004', name: 'Thu Trang', department: 'ODD', team: 'Team 3', role: 'Leader' }, { id: '2302001', name: 'Anh Thu', department: 'ABD', team: 'Team 4', role: 'Leader' }, { id: '2302002', name: 'Bao Han', department: 'ABD', team: 'Team 4', role: 'User' }, { id: '2302003', name: 'Gia Huy', department: 'ABD', team: 'Team 5', role: 'Leader' }, { id: '2303001', name: 'Hoai An', department: 'HR', team: 'Team 6', role: 'Leader' }, { id: '2303002', name: 'Manh Dung', department: 'HR', team: 'Team 6', role: 'User' }, { id: '2303003', name: 'Duc Minh', department: 'HR', team: 'Team 7', role: 'User' },];
const mockWorkResults = { '2301001': { name: 'Minh Tuan', completedGames: [/*...*/], attemptDetails: [/*...*/] }, '2302001': { name: 'Anh Thu', completedGames: [/*...*/], attemptDetails: [/*...*/] }, };


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

    // === FIX: SỬA LẠI LOGIC ĐỂ DÙNG BIẾN 'members' ===
    // Tự động tạo danh sách cho các ô lựa chọn từ dữ liệu thành viên *hiện tại*
    const { departments, teams, roles } = useMemo(() => {
        const departments = [...new Set(members.map(m => m.department))];
        const teams = [...new Set(members.map(m => m.team))];
        const roles = [...new Set(members.map(m => m.role))];
        return { departments, teams, roles };
    }, [members]); // Bây giờ dependency 'members' đã hoàn toàn chính xác


    // Cập nhật logic lọc để hoạt động chính xác với các ô lựa chọn
    useEffect(() => {
        let tempMembers = members.filter(m =>
            (m.name.toLowerCase().includes(filters.name.toLowerCase())) &&
            (m.id.includes(filters.code)) &&
            (filters.department === "" || m.department === filters.department) &&
            (filters.team === "" || m.team === filters.team) &&
            (filters.role === "" || m.role === filters.role)
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

    const resetFilters = () => {
        setFilters({ name: '', code: '', department: '', team: '', role: '' });
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
        resetFilters();
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
            <AdvancedStats />

            <div className="glass-card" style={{ marginTop: '20px' }}>

                <div className="filter-section">
                    <input type="text" name="name" value={filters.name} onChange={handleFilterChange} placeholder="Name" className="filter-input" />
                    <input type="text" name="code" value={filters.code} onChange={handleFilterChange} placeholder="Code" className="filter-input" />

                    <select name="department" value={filters.department} onChange={handleFilterChange} className="filter-select">
                        <option value="">Department</option>
                        {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>

                    <select name="team" value={filters.team} onChange={handleFilterChange} className="filter-select">
                        <option value="">Team</option>
                        {teams.map(team => <option key={team} value={team}>{team}</option>)}
                    </select>

                    <select name="role" value={filters.role} onChange={handleFilterChange} className="filter-select">
                        <option value="">Role</option>
                        {roles.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>

                    <div className="button-group">
                        <button className="btn btn-primary">Search</button>
                        <button className="btn btn-secondary" onClick={resetFilters}>Reset</button>
                    </div>
                </div>

                <div className="actions-toolbar">
                    <span className="action-link" onClick={(e) => { e.preventDefault(); const cb = document.getElementById('select-all-cb'); cb.checked = !cb.checked; handleSelectAll({ target: cb }); }}>Select All</span>
                    <span className="action-link" onClick={handleDeleteSelected}>Delete</span>
                    <span className="action-link" onClick={handleFetch}>Fetch</span>
                    <span className="action-link" onClick={handleExport}>Export</span>
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
                                <td>{member.id}</td>
                                <td>{member.department}</td>
                                <td>{member.team}</td>
                                <td>{member.role}</td>
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