import React, { useState } from 'react';
import '../assets/css/SettingPage.css';

const SettingPage = () => {
  const [filterCreateDate, setFilterCreateDate] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [musicModalOpen, setMusicModalOpen] = useState(false);
  const [sound, setSound] = useState('Off');
  const [theme, setTheme] = useState('Sáng');
  const [searchReport, setSearchReport] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [searchBan, setSearchBan] = useState('');
  const [searchTeam, setSearchTeam] = useState('');
  const [filterReplyDate, setFilterReplyDate] = useState('');

  // Thêm ban vào dữ liệu
  const reports = [
    { id: 1, title: 'Báo cáo 1', status: 'Đã xử lý', date: '23/06/2025', user: 'Minh', ban: 'Kỹ thuật', team: 'ODD', replyDate: '2025-06-23' },
    { id: 2, title: 'Báo cáo 2', status: 'Chưa xem', date: '23/06/2025', user: 'Khánh', ban: 'Vận hành', team: 'ABD', replyDate: '2025-06-24' },
    { id: 3, title: 'Báo cáo 3', status: 'Đang xử lý', date: '23/06/2025', user: 'Phúc', ban: 'Kỹ thuật', team: 'ODD', replyDate: '2025-06-25' },
    { id: 4, title: 'Báo cáo 4', status: 'Chưa xem', date: '23/06/2025', user: 'Khải', ban: 'Vận hành', team: 'ABD', replyDate: '2025-06-26' },
  ];

  const convertToISO = (dateStr) => {
    const [d, m, y] = dateStr.split('/');
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  };

  const filteredReports = reports.filter(r =>
    r.title.toLowerCase().includes(searchReport.toLowerCase()) &&
    r.user.toLowerCase().includes(searchUser.toLowerCase()) &&
    r.team.toLowerCase().includes(searchTeam.toLowerCase()) &&
    r.ban.toLowerCase().includes(searchBan.toLowerCase()) &&
    (filterReplyDate === '' || r.replyDate === filterReplyDate) &&
    (filterCreateDate === '' || convertToISO(r.date) === filterCreateDate)
  );

  const resetFilters = () => {
    setSearchReport('');
    setFilterCreateDate('');
    setSearchUser('');
    setSearchBan('');
    setSearchTeam('');
    setFilterReplyDate('');
  };

  const handleSubmitReport = () => {
    if (reportContent.trim() === '') {
      alert('Vui lòng nhập nội dung báo cáo');
      return;
    }
    console.log('Đã gửi báo cáo:', reportContent);
    setReportContent('');
  };

  const handleUploadMusic = () => {
    alert('Tính năng upload nhạc đang được phát triển!');
  };

  return (
    <div className="setting-container">
      {/* Section 1: Settings */}
      <div className="section">
        <h3>Quản lý cài đặt</h3>
        <div className="setting-form">
          <div className="form-group">
            <label>Âm thanh nền</label>
            <select
              value={sound}
              onChange={(e) => setSound(e.target.value)}
              className={`select-sound ${sound === 'On' ? 'sound-on' : 'sound-off'}`}
            >
              <option value="Off">Off</option>
              <option value="On">On</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nhạc</label>
            <button className="button-music" onClick={() => setMusicModalOpen(true)}>Chọn nhạc</button>
          </div>

          <div className="form-group">
            <label>Ngôn ngữ</label>
            <select>
              <option>Tiếng Nhật</option>
              <option>Tiếng Việt</option>
            </select>
          </div>

          <div className="form-group">
            <label>Giao diện</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={`select-theme ${theme === 'Sáng' ? 'theme-white' : 'theme-black'}`}
            >
              <option value="Tối">Tối</option>
              <option value="Sáng">Sáng</option>
            </select>
          </div>

          <div className="form-group">
            <label>Báo cáo</label>
            <input
              type="text"
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder="Nội dung báo cáo"
            />
          </div>

          <div className="form-buttons">
            <button className="button-submit" onClick={handleSubmitReport}>Gửi</button>
            <button className="button-cancel" onClick={() => setReportContent('')}>Cancel</button>
          </div>
        </div>
      </div>

      {/* Modal chọn nhạc */}
      {musicModalOpen && (
        <div className="modal">
              <div className="popup-label">Chọn nhạc</div>
              <div className="popup-content music-list">
                <div>Thiên lý ơi</div>
                <div>Đom đóm</div>
                <div>Hồng nhan</div>
                <button className="upload-music" onClick={handleUploadMusic}>Tải nhạc lên</button>
                 <button className="exit-button" onClick={() => setMusicModalOpen(false)}>Thoát</button>
              </div>
        </div>
      )}

      {/* Section 2: Quản lý báo cáo */}
      <div className="section">
        <h3>Quản lý báo cáo</h3>
        <div className="filter-group">
          <input placeholder="Tìm tên báo cáo" value={searchReport} onChange={(e) => setSearchReport(e.target.value)} />
                    <select>
            <option>Lọc theo trạng thái</option>
            <option>Đã xử lý</option>
            <option>Chưa xem</option>
            <option>Đang xử lý</option>
          </select>
          <input type="date" value={filterCreateDate} onChange={(e) => setFilterCreateDate(e.target.value)} />
          <input placeholder="Người tạo" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
          <input placeholder="Ban" value={searchBan} onChange={(e) => setSearchBan(e.target.value)} />
          <input placeholder="Team" value={searchTeam} onChange={(e) => setSearchTeam(e.target.value)} />
          <input type="date" value={filterReplyDate} onChange={(e) => setFilterReplyDate(e.target.value)} />
          <button onClick={() => {}}>Tìm</button>
          <button onClick={resetFilters}>Reset</button>
        </div>

        <table className="report-table">
          <thead>
            <tr>
              <th>Báo cáo</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Người tạo</th>
              <th>Ban</th>
              <th>Team</th>
              <th>Ngày phản hồi</th>
              <th>Nội dung phản hồi</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((r) => (
              <tr key={r.id}>
                <td>{r.title}</td>
                <td>
                  <select defaultValue={r.status}>
                    <option>Đã xử lý</option>
                    <option>Chưa xem</option>
                    <option>Đang xử lý</option>
                  </select>
                </td>
                <td>{r.date}</td>
                <td>{r.user}</td>
                <td>{r.ban}</td>
                <td>{r.team}</td>
                <td>{r.replyDate}</td>
                <td>
                  <div className="reply-input-group">
                    <input type="text" placeholder="Nhập phản hồi..." />
                    <button>Gửi</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettingPage;
