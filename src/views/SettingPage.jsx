import React, { useState } from 'react';
import '../assets/css/SettingPage.css';

const SettingPage = () => {
    const [reportContent, setReportContent] = useState('');
    const [musicModalOpen, setMusicModalOpen] = useState(false);
    const [sound, setSound] = useState('Off');
    const [theme, setTheme] = useState('Sáng');

    const reports = [
        { id: 1, title: 'Báo cáo 1', status: 'Đã xử lý', date: '23/06/2025', user: 'Minh', team: 'ODD', replyDate: '23/06/2025' },
        { id: 2, title: 'Báo cáo 2', status: 'Chưa xem', date: '23/06/2025', user: 'Khánh', team: 'ABD', replyDate: '24/06/2025' },
        { id: 3, title: 'Báo cáo 3', status: 'Đang xử lý', date: '23/06/2025', user: 'Phúc', team: 'ODD', replyDate: '25/06/2025' },
        { id: 4, title: 'Báo cáo 4', status: 'Chưa xem', date: '23/06/2025', user: 'Khải', team: 'ABD', replyDate: '26/06/2025' },
    ];

  return (
    <div className="setting-container">
      <div className="section">
        <h3>Quản lý cài đặt</h3>
        <div className="setting-form">
          <div className="form-group">
            <label>Âm thanh nền</label>
           
     <select
        value={sound}
        onChange={(e) => setSound(e.target.value)}
        style={{
            backgroundColor: sound === 'On' ? '#a10000' : 'black', // đỏ đậm & xám đậm giống Excel
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontWeight: 'bold',
            appearance: 'none', // ẩn mũi tên native (optional)
        }}
        >
        <option
            value="Off"
            style={{ backgroundColor: 'black', color: 'white' }}
        >
            Off
        </option>
        <option
            value="On"
            style={{ backgroundColor: '#a10000', color: 'white' }}
        >
            On
        </option>
        </select>

          </div>
          <div className="form-group">
            <label>Nhạc</label>
            <button
            style={{ color: 'green' }}
            onClick={() => setMusicModalOpen(true)}
            >
            Chọn nhạc
            </button>
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
                style={{
                backgroundColor: theme === 'Tối' ? '#000' : '#fff',
                color: theme === 'Tối' ? '#fff' : '#000',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontWeight: 'bold',
                }}
            >
                <option value="Sáng" style={{ backgroundColor: '#fff', color: '#000' }}>Sáng</option>
                <option value="Tối" style={{ backgroundColor: '#000', color: '#fff' }}>Tối</option>
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
  <button className="button-submit">Gửi</button>
  <button className="button-cancel">Cancel</button>
</div>

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
          <div style={{ display: 'flex' }}>
  <input
    placeholder="Tìm kiếm..."
    style={{
      border: '1px solid #ccc',
      borderRight: 'none',
      borderRadius: '4px 0 0 4px',
      padding: '6px 10px',
      outline: 'none'
    }}
  />
  <button
    style={{
      backgroundColor: 'gray',
      color: 'white',
      border: '1px solid #ccc',
      borderLeft: 'none',
      borderRadius: '0 4px 4px 0',
      padding: '6px 12px',
      cursor: 'pointer'
    }}
  >
    Tìm
  </button>
</div>

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
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <input
      type="text"
      placeholder="Nhập phản hồi..."
      style={{
        flex: 1,
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
      }}
    />
    <button
      style={{
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        padding: '6px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        whiteSpace: 'nowrap'
      }}
    >
      Gửi
    </button>
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
