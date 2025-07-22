import React, { useState } from 'react';
import '../assets/css/SettingPage.css';

const SettingPage = () => {
  const [filterCreateDate, setFilterCreateDate] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [music, setMusic] = useState('');

  const [sound, setSound] = useState('Off');
  const [theme, setTheme] = useState('Light');
  const [searchReport, setSearchReport] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [searchBan, setSearchBan] = useState('');
  const [searchTeam, setSearchTeam] = useState('');
  const [filterReplyDate, setFilterReplyDate] = useState('');

  const reports = [
    { id: 1, title: 'Report 1', status: 'Processed', date: '23/06/2025', user: 'Minh', ban: 'Technical', team: 'ODD', replyDate: '2025-06-23' },
    { id: 2, title: 'Report 2', status: 'Unread', date: '23/06/2025', user: 'Khánh', ban: 'Operation', team: 'ABD', replyDate: '2025-06-24' },
    { id: 3, title: 'Report 3', status: 'Processing', date: '23/06/2025', user: 'Phúc', ban: 'Technical', team: 'ODD', replyDate: '2025-06-25' },
    { id: 4, title: 'Report 4', status: 'Unread', date: '23/06/2025', user: 'Khải', ban: 'Operation', team: 'ABD', replyDate: '2025-06-26' },
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
      alert('Please enter report content.');
      return;
    }
    console.log('Report submitted:', reportContent);
    setReportContent('');
  };

  const handleUploadMusic = () => {
    alert('Music upload feature is under development!');
  };

  return (
    <div className="setting-container">
      {/* Section 1: Settings */}
      <div className="section">
        <h3>Settings Management</h3>
        <div className="setting-content">
          <div className="setting-video">
  <video 
    src="/assets/images/setting.mp4" 
    autoPlay 
    muted 
    loop 
    playsInline
  />
</div>
        <div className="setting-form">
          <div className="form-group">
            <label>Background Sound</label>
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
  <label>Music</label>
  <div className="music-select-group">
    <select
      value={music}
      onChange={(e) => setMusic(e.target.value)}
      className="music-select"
    >
      <option value="">Choose music</option>
      <option value="Thien Ly Oi">Thien Ly Oi</option>
      <option value="Dom Dom">Dom Dom</option>
      <option value="Hong Nhan">Hong Nhan</option>
    </select>
    <button className="upload-music-btn" onClick={handleUploadMusic}>Upload</button>
  </div>
</div>


          <div className="form-group">
            <label>Language</label>
            <select>
              <option>Japanese</option>
              <option>Vietnamese</option>
            </select>
          </div>

          <div className="form-group">
            <label>Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={`select-theme ${theme === 'Light' ? 'theme-white' : 'theme-black'}`}
            >
              <option value="Dark">Dark</option>
              <option value="Light">Light</option>
            </select>
          </div>

          <div className="form-group">
            <label>Report</label>
            <input
              type="text"
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder="Enter report content"
            />
          </div>

          <div className="form-buttons">
            <button className="button-submit" onClick={handleSubmitReport}>Submit</button>
            <button className="button-cancel" onClick={() => setReportContent('')}>Cancel</button>
          </div>
        </div>
      </div>

</div>


     
      {/* Section 2: Report Management */}
      <div className="section">
        <h3>Report Management</h3>
        <div className="filter-group">
          <input placeholder="Search report name" value={searchReport} onChange={(e) => setSearchReport(e.target.value)} />
          <select>
            <option>Filter by Status</option>
            <option>Processed</option>
            <option>Unread</option>
            <option>Processing</option>
          </select>
          <input type="date" value={filterCreateDate} onChange={(e) => setFilterCreateDate(e.target.value)} />
          <input placeholder="Creator" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
          <input placeholder="Department" value={searchBan} onChange={(e) => setSearchBan(e.target.value)} />
          <input placeholder="Team" value={searchTeam} onChange={(e) => setSearchTeam(e.target.value)} />
          <input type="date" value={filterReplyDate} onChange={(e) => setFilterReplyDate(e.target.value)} />
          <button onClick={() => {}}>Search</button>
          <button onClick={resetFilters}>Reset</button>
        </div>

        <table className="report-table">
          <thead>
            <tr>
              <th>Report</th>
              <th>Status</th>
              <th>Create Date</th>
              <th>Creator</th>
              <th>Department</th>
              <th>Team</th>
              <th>Reply Date</th>
              <th>Reply Content</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((r) => (
              <tr key={r.id}>
                <td>{r.title}</td>
                <td>
                  <select defaultValue={r.status}>
                    <option>Processed</option>
                    <option>Unread</option>
                    <option>Processing</option>
                  </select>
                </td>
                <td>{r.date}</td>
                <td>{r.user}</td>
                <td>{r.ban}</td>
                <td>{r.team}</td>
                <td>{r.replyDate}</td>
                <td>
                  <div className="reply-input-group">
                    <input type="text" placeholder="Enter reply..." />
                    <button>Send</button>
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
