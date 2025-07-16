import React from 'react';

// Để vẽ biểu đồ, bạn sẽ cần một thư viện như 'react-chartjs-2' hoặc 'recharts'
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// ChartJS.register(ArcElement, Tooltip, Legend);

// --- DỮ LIỆU GIẢ (MOCK DATA) ---
const mockMembers = [
    { id: '2301001', name: 'Minh', department: 'ODD', team: 'Team 1', role: 'Leader' },
    { id: '2301002', name: 'Khánh', department: 'ODD', team: 'Team 2', role: 'Manager' },
    { id: '2301003', name: 'Phúc', department: 'ODD', team: 'Team 3', role: 'user' },
];

const mockDepartments = [
    { name: 'ODD', leader: 'Minh', members: 10, games: 3 },
    { name: 'ABD', leader: 'Khánh', members: 5, games: 2 },
];

const mockTeams = [
    { name: '1', leader: 'Khải', members: 10, games: 3 },
    { name: '2', leader: 'Trí', members: 5, games: 2 },
];

const mockGames = [
    { id: 1, name: 'Game 1', openDate: '23/07/2025' },
    { id: 2, name: 'Game 2', openDate: '23/07/2025' },
    { id: 3, name: 'Game 3', openDate: '23/07/2025' },
]

// Dữ liệu cho biểu đồ tròn (placeholder)
const pieChartData = {
    labels: ['Marketing', 'Sales', 'Finance', 'Human Resources', 'IT', 'Operations'],
    datasets: [{
        data: [15.2, 18.2, 12.1, 9.1, 24.2, 21.2],
        backgroundColor: ['#4e73df', '#f6c23e', '#e74a3b', '#fd7e14', '#1cc88a', '#36b9cc'],
    }],
};


function MemManage() {
    // --- CÁC HÀM XỬ LÝ (PLACEHOLDER) ---
    const handleAction = (action, value = '') => alert(`Thực hiện: ${action} ${value}`);

    // --- STYLES ---
    const styles = {
        container: { fontFamily: 'Arial, sans-serif', padding: '15px', fontSize: '14px' },
        // Bố cục chính
        mainLayout: { display: 'flex', gap: '20px', marginTop: '20px' },
        leftColumn: { flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' },
        rightColumn: { flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' },
        // Các thành phần
        toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' },
        searchBox: { display: 'flex', alignItems: 'center', gap: '10px' },
        filterButtons: { display: 'flex', gap: '10px' },
        bulkActions: { display: 'flex', alignItems: 'center', gap: '15px' },
        table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
        th: { border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' },
        td: { border: '1px solid #ddd', padding: '8px', verticalAlign: 'middle' },
        select: { border: '1px solid #ccc', padding: '4px' },
        button: { padding: '5px 10px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#f0f0f0' },
        link: { color: '#007bff', textDecoration: 'underline', cursor: 'pointer' },
        actionLinksContainer: { marginTop: '10px', display: 'flex', gap: '30px' },
        section: { border: '2px solid orange', padding: '15px', borderRadius: '5px' },
        sectionTitle: { fontWeight: 'bold', marginBottom: '10px' },
    };

    return (
        <div style={styles.container}>
            {/* ==================== KHU VỰC TRÊN CÙNG ==================== */}

            {/* --- Thanh công cụ tìm kiếm và lọc --- */}
            <div style={styles.toolbar}>
                <div style={styles.searchBox}>
                    <span>Tìm kiếm:</span>
                    <input type="text" style={{ padding: '4px' }} />
                    <button style={styles.button} onClick={() => handleAction('Tìm kiếm')}>Tìm</button>
                </div>
                <div style={styles.filterButtons}>
                    <button style={styles.button}>Lọc theo ngày đăng ký</button>
                    <button style={styles.button}>Lọc theo phòng ban</button>
                    <button style={styles.button}>Lọc theo team</button>
                </div>
                <div style={styles.bulkActions}>
                    <span style={styles.link}>Chọn hết</span>
                    <button style={styles.button} onClick={() => handleAction('Export')}>Export</button>
                    <select style={styles.select} onChange={() => handleAction('Xóa các mục đã chọn')}>
                        <option>Xóa</option>
                    </select>
                </div>
            </div>

            {/* --- Bảng danh sách thành viên chính --- */}
            <div>
                <p><b>Manager phòng ban: ODD / Leader nhóm 1 - ABD</b></p>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}></th>
                            <th style={styles.th}>Mã nhân viên</th>
                            <th style={styles.th}>Tên</th>
                            <th style={styles.th}>Phòng ban</th>
                            <th style={styles.th}>Team</th>
                            <th style={styles.th}>Role</th>
                            <th style={styles.th}></th>
                            <th style={styles.th}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockMembers.map(member => (
                            <tr key={member.id}>
                                <td style={styles.td}><input type="checkbox" /></td>
                                <td style={styles.td}>{member.id}</td>
                                <td style={styles.td}>{member.name}</td>
                                <td style={styles.td}><select style={styles.select} defaultValue={member.department}><option>ODD</option></select></td>
                                <td style={styles.td}><select style={styles.select} defaultValue={member.team}><option>Team 1</option><option>Team 2</option><option>Team 3</option></select></td>
                                <td style={styles.td}><select style={styles.select} defaultValue={member.role}><option>Leader</option><option>Manager</option><option>user</option></select></td>
                                <td style={styles.td}><span style={styles.link} onClick={() => handleAction('Xem bài làm của', member.name)}>Xem bài làm</span></td>
                                <td style={styles.td}><span style={{ ...styles.link, color: 'red' }} onClick={() => handleAction('Xóa', member.name)}>x</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* --- Các link hành động dưới bảng --- */}
                <div style={styles.actionLinksContainer}>
                    <span style={styles.link} onClick={() => handleAction('Xem chi tiết thành viên')}>Chi tiết thành viên</span>
                    <span style={styles.link} onClick={() => handleAction('Thêm thành viên')}>Thêm thành viên</span>
                    <span style={styles.link} onClick={() => handleAction('Thêm phòng/team')}>Thêm phòng/team</span>
                </div>
            </div>

            {/* ==================== KHU VỰC DƯỚI (2 CỘT) ==================== */}
            <div style={styles.mainLayout}>
                {/* --- CỘT BÊN TRÁI (THỐNG KÊ) --- */}
                <div style={styles.leftColumn}>
                    {/* Thống kê phòng ban */}
                    <div style={styles.section}>
                        <p style={styles.sectionTitle}>Thống kê phòng ban/team</p>
                        <table style={{ ...styles.table, marginTop: 0 }}>
                            <thead><tr><th style={styles.th}>Phòng ban</th><th style={styles.th}>Tên</th><th style={styles.th}>Leader</th><th style={styles.th}>Số thành viên</th><th style={styles.th}>Số lượng game</th><th style={styles.th}>Hành động</th></tr></thead>
                            <tbody>
                                {mockDepartments.map(dep => (
                                    <tr key={dep.name}>
                                        <td style={styles.td}></td>
                                        <td style={styles.td}>{dep.name}</td>
                                        <td style={styles.td}>{dep.leader}</td>
                                        <td style={styles.td}>{dep.members}</td>
                                        <td style={styles.td}>{dep.games}</td>
                                        <td style={styles.td}><span style={styles.link}>Sửa</span> <span style={styles.link}>Cancel</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Thống kê team */}
                    <div style={styles.section}>
                        <table style={{ ...styles.table, marginTop: 0 }}>
                            <thead><tr><th style={styles.th}>Team</th><th style={styles.th}>Leader</th><th style={styles.th}>Số thành viên</th><th style={styles.th}>Số lượng game</th><th style={styles.th}>Hành động</th></tr></thead>
                            <tbody>
                                {mockTeams.map(team => (
                                    <tr key={team.name}>
                                        <td style={styles.td}>{team.name}</td>
                                        <td style={styles.td}>{team.leader}</td>
                                        <td style={styles.td}>{team.members}</td>
                                        <td style={styles.td}>{team.games}</td>
                                        <td style={styles.td}>
                                            <span style={styles.link}>Sửa</span> <span style={styles.link}>Cancel</span> <span style={styles.link} onClick={() => handleAction('Chọn game cho team', team.name)}>Chọn game</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- CỘT BÊN PHẢI (BIỂU ĐỒ & CHỌN GAME) --- */}
                <div style={styles.rightColumn}>
                    <div>
                        <p>Chart thống kê điểm trung bình giữa các phòng ban/team theo game</p>
                        {/* Thay thế bằng component biểu đồ thật, ví dụ <Pie data={pieChartData} /> */}
                        <img src="https://i.imgur.com/8pP4T7T.png" alt="Biểu đồ tròn mẫu" style={{ width: '100%', maxWidth: '300px', margin: 'auto', display: 'block' }} />
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
                        <div style={{ textAlign: 'right', marginTop: '10px' }}>
                            <span style={styles.link}>Xem</span> <span style={styles.link}>Cancel</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemManage; 