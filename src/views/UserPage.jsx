// src/views/UserPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import '../assets/css/popupmem/UserPage.css';
import AddDeptTeamPopup from './components/popupmem/AddDeptTeamPopup';
import AddMemberPopup from './components/popupmem/AddMemberPopup';
import MemberDetailPopup from './components/popupmem/MemberDetailPopup';
import AdvancedStats from './components/popupmem/AdvancedStats';
import GameHistory from './components/popupmem/GameHistory';

// NEW: Import các hàm của Firebase
import {
    db,
    collection,
    getDocs,
    doc,
    deleteDoc,
    query,       // <- Mới
    orderBy,     // <- Mới
    limit,       // <- Mới
    writeBatch   // <- Mới
} from '../firebase/services';
function UserPage() {
    // UPDATE: Khởi tạo state rỗng, sẽ được load từ Firebase
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);

    // Các state khác giữ nguyên
    const [selectedMemberIds, setSelectedMemberIds] = useState([]);
    const [filters, setFilters] = useState({ name: '', code: '', department: '', team: '', role: '' });
    const [viewingMember, setViewingMember] = useState(null);
    const [showAddMemberPopup, setShowAddMemberPopup] = useState(false);
    const [showAddDeptTeamPopup, setShowAddDeptTeamPopup] = useState(false);
    const [popupMode, setPopupMode] = useState('department');
    const [showGameHistory, setShowGameHistory] = useState(false);
    const [viewingUserForHistory, setViewingUserForHistory] = useState(null);
    const handleAddMembersFromFile = async (membersData) => {
        if (!membersData || membersData.length === 0) {
            alert("Không có dữ liệu hợp lệ để thêm.");
            return;
        }

        try {
            // 1. Tìm member_id lớn nhất hiện có
            const usersRef = collection(db, 'user');
            const q = query(usersRef, orderBy("member_id", "desc"), limit(1));
            const querySnapshot = await getDocs(q);

            let lastId = 0; // Mặc định là 0 nếu collection rỗng
            if (!querySnapshot.empty) {
                const lastUser = querySnapshot.docs[0].data();
                // Chuyển đổi chuỗi "0000xx" thành số
                lastId = parseInt(lastUser.member_id, 10);
            }

            // 2. Chuẩn bị ghi hàng loạt (Write Batch)
            const batch = writeBatch(db);

            membersData.forEach(member => {
                // Tăng và định dạng ID
                lastId++;
                const newMemberId = String(lastId).padStart(6, '0');

                // Dữ liệu thành viên mới
                const newMemberData = {
                    ...member,
                    member_id: newMemberId
                };

                // Tạo một tham chiếu document mới và thêm vào batch
                const newUserRef = doc(collection(db, 'user'));
                batch.set(newUserRef, newMemberData);
            });

            // 3. Thực thi ghi hàng loạt
            await batch.commit();

            alert(`Hoàn thành! Đã thêm thành công ${membersData.length} thành viên.`);
            setShowAddMemberPopup(false);
            fetchMembers(); // Tải lại danh sách

        } catch (error) {
            console.error("Lỗi khi thêm thành viên: ", error);
            alert("Đã xảy ra lỗi trong quá trình thêm thành viên. Vui lòng thử lại.");
        }
    };
    // NEW: Hàm tải danh sách thành viên từ Firestore
    const fetchMembers = async () => {
        try {
            const usersCollectionRef = collection(db, 'user');
            const querySnapshot = await getDocs(usersCollectionRef);
            const membersData = querySnapshot.docs.map(doc => ({
                id: doc.id, // Sử dụng doc.id của Firestore
                ...doc.data(),
                // Ánh xạ lại các trường để phù hợp với bảng
                name: doc.data().member_name,
                department: doc.data().department || 'N/A', // Giả sử có trường department
                team: `Team ${doc.data().team_id}`,
                role: doc.data().manager ? 'Manager' : (doc.data().leader ? 'Leader' : 'User'),
            }));
            setMembers(membersData);
            setFilteredMembers(membersData);
        } catch (error) {
            console.error("Error fetching users: ", error);
            alert("Không thể tải danh sách thành viên.");
        }
    };
    // UPDATE: Hoàn thiện hàm xóa các thành viên đã chọn
    const handleDeleteSelected = async () => {
        if (selectedMemberIds.length === 0) {
            alert("Vui lòng chọn thành viên để xóa.");
            return;
        }

        // Thêm hộp thoại xác nhận để tránh xóa nhầm
        if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedMemberIds.length} thành viên đã chọn?`)) {
            try {
                // Tạo một mảng các promise xóa
                const deletePromises = selectedMemberIds.map(id => {
                    const userDocRef = doc(db, 'user', id);
                    return deleteDoc(userDocRef);
                });

                // Chờ tất cả các promise hoàn thành
                await Promise.all(deletePromises);

                alert(`Đã xóa thành công ${selectedMemberIds.length} thành viên.`);
                fetchMembers(); // Tải lại danh sách thành viên
                setSelectedMemberIds([]); // Reset lại danh sách đã chọn
            } catch (error) {
                console.error("Error deleting users: ", error);
                alert("Đã xảy ra lỗi trong quá trình xóa thành viên.");
            }
        }
    };

    // NEW: Hàm xóa một thành viên duy nhất
    const handleDeleteSingleMember = async (memberId, memberName) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa thành viên "${memberName}"?`)) {
            try {
                const userDocRef = doc(db, 'user', memberId);
                await deleteDoc(userDocRef);

                alert(`Đã xóa thành công thành viên ${memberName}.`);
                fetchMembers(); // Tải lại danh sách
            } catch (error) {
                console.error("Error deleting single user: ", error);
                alert("Đã xảy ra lỗi khi xóa thành viên.");
            }
        }
    };

    // NEW: Tải dữ liệu khi component được mount
    useEffect(() => {
        fetchMembers();
    }, []);

    // ... các hàm xử lý khác giữ nguyên ...

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setViewingMember(null);
                setShowAddMemberPopup(false);
                setShowAddDeptTeamPopup(false);
                setShowGameHistory(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const { departments, teams, roles } = useMemo(() => {
        const departments = [...new Set(members.map(m => m.department))];
        const teams = [...new Set(members.map(m => m.team))];
        const roles = [...new Set(members.map(m => m.role))];
        return { departments, teams, roles };
    }, [members]);

    const handleOpenAddPopup = (mode) => {
        setPopupMode(mode);
        setShowAddDeptTeamPopup(true);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        setFilteredMembers(members);
    }, [members]);

    // ... các hàm handleFilterChange, resetFilters, handleSearch, handleSelectMember, ... giữ nguyên
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => {
        setFilters({ name: '', code: '', department: '', team: '', role: '' });
        setFilteredMembers(members);
    };

    const handleSearch = () => {
        const { name, code, department, team, role } = filters;
        const filtered = members.filter(m =>
            (name === '' || m.name.toLowerCase().includes(name.toLowerCase())) &&
            (code === '' || m.id.includes(code)) &&
            (department === '' || m.department === department) &&
            (team === '' || m.team === team) &&
            (role === '' || m.role === role)
        );
        setFilteredMembers(filtered);
    };

    const handleSelectMember = (memberId) => {
        setSelectedMemberIds(prev =>
            prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
        );
    };

    const handleSelectAll = (e) => {
        setSelectedMemberIds(e.target.checked ? filteredMembers.map(m => m.id) : []);
    };



    const handleShowHistory = (member) => {
        window.scrollTo(0, 0);
        setViewingUserForHistory(member);
        setShowGameHistory(true);
    };

    const handleExport = () => {
        if (selectedMemberIds.length === 0) {
            alert('Please select members to export.');
            return;
        }
        alert(`Exporting data for ${selectedMemberIds.length} selected member(s)...`);
    };

    // NEW: Hàm xử lý thêm thành viên từ file
    

    return (
        <div className="management-container">
            <h1 className="management-title">USER MANAGEMENT</h1>
            <AdvancedStats onOpenAddPopup={handleOpenAddPopup} />
            <div className="glass-card" style={{ marginTop: '20px' }}>
                {/* ...Phần filter và table giữ nguyên... */}
                {/* JSX for filters, table header, table body remains the same */}

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
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                        <button className="btn btn-secondary" onClick={resetFilters}>Reset</button>
                    </div>
                </div>

                <div className="actions-toolbar">
                    <span className="action-link" onClick={handleDeleteSelected}>Delete</span>
                    <span className="action-link" onClick={handleExport}>Export</span>
                </div>

                <table className="management-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Department</th>
                            <th>Team</th>
                            <th>Role</th>
                            <th>Actions</th>
                            <th>
                                <input id="select-all-cb" type="checkbox" onChange={handleSelectAll}
                                    checked={filteredMembers.length > 0 && selectedMemberIds.length === filteredMembers.length} />
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredMembers.map((member, index) => (
                            <tr key={member.id}>
                                <td>{index + 1}</td>
                                <td><span className="action-link" onClick={() => setViewingMember(member)}>{member.name}</span></td>
                                {/* Sử dụng member.id thay vì member.code từ mock */}
                                <td>{member.member_id}</td>
                                <td>{member.department}</td>
                                <td>{member.team}</td>
                                <td>{member.role}</td>
                                <td><button className="btn btn-view" onClick={() => handleShowHistory(member)}>View Results</button></td>
                                <td><input type="checkbox" checked={selectedMemberIds.includes(member.id)} onChange={() => handleSelectMember(member.id)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* ...Kết thúc phần table... */}

                <div className="table-actions-footer">
                    <button className="btn btn-add" onClick={() => {
                        window.scrollTo(0, 0);
                        setShowAddMemberPopup(true);
                    }}>
                        Add Member
                    </button>
                </div>
            </div>

            {viewingMember && <MemberDetailPopup member={viewingMember} onClose={() => setViewingMember(null)} onSave={() => { }} />}
            {/* UPDATE: Truyền hàm handleAddMembersFromFile vào popup */}
            {showAddMemberPopup && <AddMemberPopup onClose={() => setShowAddMemberPopup(false)} onAddMember={handleAddMembersFromFile} />}
            {showAddDeptTeamPopup && <AddDeptTeamPopup mode={popupMode} onClose={() => setShowAddDeptTeamPopup(false)} onAdd={() => { alert('Add functionality in development'); setShowAddDeptTeamPopup(false); }} />}
            {showGameHistory && <GameHistory user={viewingUserForHistory} onClose={() => setShowGameHistory(false)} />}
        </div>
    );
}

export default UserPage;