import React, { useState } from 'react';
import './SettingPage.css';

const SettingPage = () => {
  const [reportContent, setReportContent] = useState('');
  const [musicModalOpen, setMusicModalOpen] = useState(false);

  const reports = [
    { id: 1, title: 'Báo cáo 1', status: 'Đã xử lý', date: '23/06/2025', user: 'Minh', team: 'ODD', replyDate: '23/06/2025' },
    { id: 2, title: 'Báo cáo 2', status: 'Chưa xem', date: '23/06/2025', user: 'Khánh', team: 'ABD', replyDate: '24/06/2025' },
    { id: 3, title: 'Báo cáo 3', status: 'Đang xử lý', date: '23/06/2025', user: 'Phúc', team: 'ODD', replyDate: '25/06/2025' },
    { id: 4, title: 'Báo cáo 4', status: 'Chưa xem', date: '23/06/2025', user: 'Khải', team: 'ABD', replyDate: '26/06/2025' },
  ];

  return (
    <div className="setting-container">
      <div className="header">
        <span className="title">Quản lý cài đặt và báo cáo</span>
        <span className="logout">Đăng xuất</span>
      </div>

      <div className="section">
        <h3>Quản lý cài đặt</h3>
        <div className="setting-form">
          <div className="form-group">
            <label>Âm thanh nền</label>
            <select>
              <option>Off</option>
              <option>On</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nhạc</label>
            <button onClick={() => setMusicModalOpen(true)}>Chọn nhạc</button>
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
            <select>
              <option>Sáng</option>
              <option>Tối</option>
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
          <button>Gửi</button>
          <button>Cancel</button>
        </div>
      </div>

      {musicModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Chọn nhạc</h4>
            <ul>
              <li>Thiên lý ơi</li>
              <li>Đom đóm</li>
              <li>Hồng nhan</li>
              <li><a href="#">Tải lên</a></li>
            </ul>
            <p><a href="#">Upload ảnh</a></p>
            <button onClick={() => setMusicModalOpen(false)}>Thoát</button>
          </div>
        </div>
      )}

      <div className="section">
        <h3>Quản lý báo cáo</h3>
        <div className="filter-group">
          <input placeholder="Tìm kiếm..." />
          <input placeholder="Tìm" />
          <select>
            <option>Lọc theo trạng thái</option>
            <option>Đã xử lý</option>
            <option>Chưa xem</option>
            <option>Đang xử lý</option>
          </select>
          <button>Lọc theo ngày tạo</button>
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
            {reports.map((r) => (
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
                <td>{r.team}</td>
                <td>{r.team}</td>
                <td>{r.replyDate}</td>
                <td>
                  <a href="#">Nội dung</a> | <a href="#">Gửi phản hồi</a>
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
