import React, { useState } from 'react';
import SettingForm from './components/popupsetting/SettingForm';
import ReportTable from './components/popupsetting/ReportTable';
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
      <div className="section">
        <h3>Settings Management</h3>
        <SettingForm
          sound={sound} setSound={setSound}
          theme={theme} setTheme={setTheme}
          music={music} setMusic={setMusic}
          reportContent={reportContent} setReportContent={setReportContent}
          handleSubmitReport={handleSubmitReport}
          handleUploadMusic={handleUploadMusic}
        />
      </div>

      <ReportTable
        searchReport={searchReport} setSearchReport={setSearchReport}
        filterCreateDate={filterCreateDate} setFilterCreateDate={setFilterCreateDate}
        searchUser={searchUser} setSearchUser={setSearchUser}
        searchBan={searchBan} setSearchBan={setSearchBan}
        searchTeam={searchTeam} setSearchTeam={setSearchTeam}
        filterReplyDate={filterReplyDate} setFilterReplyDate={setFilterReplyDate}
        resetFilters={resetFilters}
        filteredReports={filteredReports}
      />
    </div>
  );
};

export default SettingPage;
