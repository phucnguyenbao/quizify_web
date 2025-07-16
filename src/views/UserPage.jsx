import React from 'react';

// --- DỮ LIỆU GIẢ (MOCK DATA) ---
const mockMembers = [
    { id: '2301001', name: 'Minh', department: 'ODD', team: 'Team 1', role: 'Leader' },
    { id: '2301002', name: 'Khánh', department: 'ODD', team: 'Team 2', role: 'Manager' },
    { id: '2301003', name: 'Phúc', department: 'ODD', team: 'Team 3', role: 'user' },
];

const mockDepartments = [
    { id: 'dep1', name: 'ODD', leader: 'Minh', members: 10, games: 3 },
    { id: 'dep2', name: 'ABD', leader: 'Khánh', members: 5, games: 2 },
];

const mockGames = [
    { id: 1, name: 'Game 1', openDate: '23/07/2025' },
    { id: 2, name: 'Game 2', openDate: '23/07/2025' },
    { id: 3, name: 'Game 3', openDate: '23/07/2025' },
];


function MemManage() {

    // --- STYLES ---
    const styles = {
        // --- Layout chung ---
        container: { fontFamily: 'Arial, sans-serif', padding: '15px', fontSize: '14px', backgroundColor: '#fff' },
        topNav: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' },
        navLinks: { display: 'flex', gap: '20px', alignItems: 'center' },
        navLink: { textDecoration: 'none', color: '#333' },
        activeNavLink: { textDecoration: 'none', color: '#e0007a', fontWeight: 'bold' },

        // --- Bố cục 2 cột chính ---
        mainLayout: { display: 'flex', gap: '30px', marginTop: '20px', alignItems: 'flex-start' },
        leftColumn: { flex: '2 1 65%' }, // Chiếm nhiều không gian hơn
        rightColumn: { flex: '1 1 35%', display: 'flex', flexDirection: 'column', gap: '20px' },

        // --- Thành phần ---
        toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' },
        searchBox: { display: 'flex', alignItems: 'center', gap: '10px' },
        filterButtons: { display: 'flex', gap: '10px' },
        bulkActions: { display: 'flex', alignItems: 'center', gap: '15px' },
        table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px', backgroundColor: '#fff' },
        th: { border: '1px solid #ddd', padding: '10px 8px', textAlign: 'left', backgroundColor: '#f7f7f7', fontWeight: 'bold' },
        td: { border: '1px solid #ddd', padding: '10px 8px', verticalAlign: 'middle' },
        select: { border: '1px solid #ccc', padding: '5px', width: '100%' },
        button: { padding: '6px 12px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#f0f0f0' },
        link: { color: '#007bff', textDecoration: 'underline', cursor: 'pointer' },
        actionLinksContainer: { marginTop: '15px', display: 'flex', gap: '30px' },
        section: { border: '2px solid orange', padding: '15px', borderRadius: '5px' },
        sectionTitle: { fontWeight: 'bold', marginBottom: '10px', fontSize: '1em' },
    };

    return (
        <div style={styles.container}>
            {/* ==================== THANH ĐIỀU HƯỚNG TRÊN CÙNG ==================== */}
            

            {/* ==================== NỘI DUNG CHÍNH ==================== */}

            {/* --- Thanh công cụ tìm kiếm và lọc --- */}
            <div style={styles.toolbar}>
                <div style={styles.searchBox}>
                    <span>Tìm kiếm:</span>
                    <input type="text" style={{ padding: '5px', width: '250px' }} />
                    <button style={styles.button}>Tìm</button>
                </div>
                <div style={styles.filterButtons}>
                    <button style={styles.button}>Lọc theo ngày đăng ký</button>
                    <button style={styles.button}>Lọc theo phòng ban</button>
                    <button style={styles.button}>Lọc theo team</button>
                </div>
                <div style={styles.bulkActions}>
                    <span style={styles.link}>Chọn hết</span>
                    <span style={styles.link}>Export</span>
                    <select style={{ ...styles.select, width: 'auto', padding: '6px' }}><option>Xóa</option></select>
                </div>
            </div>

            {/* --- Bảng danh sách thành viên --- */}
            <div>
                <p><b>Manager phòng ban: ODD / Leader nhóm 1 - ABD</b></p>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            {/* THAY ĐỔI Ở ĐÂY: Cột checkbox đã được di chuyển từ đây... */}
                            <th style={styles.th}>Mã nhân viên</th>
                            <th style={styles.th}>Tên</th>
                            <th style={styles.th}>Phòng ban</th>
                            <th style={styles.th}>Team</th>
                            <th style={styles.th}>Role</th>
                            <th style={styles.th}>Hành động</th>
                            {/* ...ra vị trí cuối cùng này */}
                            <th style={{ ...styles.th, width: '30px' }}><input type="checkbox" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockMembers.map(member => (
                            <tr key={member.id}>
                                {/* THAY ĐỔI Ở ĐÂY: Dữ liệu cột được sắp xếp lại */}
                                <td style={styles.td}>{member.id}</td>
                                <td style={styles.td}>{member.name}</td>
                                <td style={styles.td}><select style={styles.select} defaultValue={member.department}><option>ODD</option></select></td>
                                <td style={styles.td}><select style={styles.select} defaultValue={member.team}><option>Team 1</option><option>Team 2</option><option>Team 3</option></select></td>
                                <td style={styles.td}><select style={styles.select} defaultValue={member.role}><option>Leader</option><option>Manager</option><option>user</option></select></td>
                                <td style={styles.td}><span style={styles.link}>Xem bài làm</span></td>
                                {/* Cột checkbox giờ nằm ở cuối cùng */}
                                <td style={styles.td}><input type="checkbox" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={styles.actionLinksContainer}>
                    <span style={styles.link}>Chi tiết thành viên</span>
                    <span style={styles.link}>Thêm thành viên</span>
                    <span style={styles.link}>Thêm phòng/team</span>
                </div>
            </div>

            {/* ==================== KHU VỰC DƯỚI (2 CỘT) ==================== */}
            <div style={styles.mainLayout}>
                {/* --- CỘT BÊN TRÁI --- */}
                <div style={styles.leftColumn}>
                    <div style={styles.section}>
                        <p style={styles.sectionTitle}>Thống kê phòng ban/team</p>
                        <table style={{ ...styles.table, marginTop: 0 }}>
                            <thead><tr><th style={styles.th}>Phòng ban</th><th style={styles.th}>Tên</th><th style={styles.th}>Leader</th><th style={styles.th}>Số thành viên</th><th style={styles.th}>Số lượng game</th><th style={styles.th}>Hành động</th></tr></thead>
                            <tbody>
                                {mockDepartments.map(dep => (
                                    <tr key={dep.id}>
                                        <td style={styles.td}></td>
                                        <td style={styles.td}><span style={styles.link}>{dep.name}</span></td>
                                        <td style={styles.td}>{dep.leader}</td>
                                        <td style={styles.td}>{dep.members}</td>
                                        <td style={styles.td}>{dep.games}</td>
                                        <td style={styles.td}><span style={styles.link}>Sửa</span> <span style={styles.link}>Cancel</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- CỘT BÊN PHẢI --- */}
                <div style={styles.rightColumn}>
                    <div>
                        <p>Chart thống kê điểm trung bình giữa các phòng ban/team theo game</p>
                        <div style={{ border: '1px solid #ccc', padding: '20px', backgroundColor: '#333', color: 'white', textAlign: 'center', minHeight: '150px' }}>
                            The image you are<br />requesting does not exist<br />or is no longer available.
                        </div>
                    </div>
                    <div style={styles.section}>
                        <table style={{ ...styles.table, marginTop: 0 }}>
                            <thead><tr><th style={styles.th}>Game</th><th style={styles.th}>Ngày mở</th></tr></thead>
                            <tbody>
                                {mockGames.map(game => (
                                    <tr key={game.id}>
                                        <td style={styles.td}>{game.id}. <span style={styles.link}>Chọn</span></td>
                                        <td style={styles.td}>{game.openDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ textAlign: 'right', marginTop: '10px' }}><span style={styles.link}>Xem</span> <span style={styles.link}>Cancel</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default MemManage;