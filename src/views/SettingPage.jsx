import React, { useState, useEffect } from 'react';
import SettingForm from './components/popupsetting/SettingForm';
import ReportTable from './components/popupsetting/ReportTable';
import '../assets/css/SettingPage.css';
import { db } from '../firebase/services';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const SettingPage = () => {
  const { user } = useAuth();
  const [music, setMusic] = useState('');
  const [language, setLanguage] = useState('');
  const [sound, setSound] = useState('Off');
  const [reportContent, setReportContent] = useState('');
  const [filterCreateDate, setFilterCreateDate] = useState('');
  const [searchReport, setSearchReport] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [searchBan, setSearchBan] = useState('');
  const [searchTeam, setSearchTeam] = useState('');
  const [filterReplyDate, setFilterReplyDate] = useState('');

  useEffect(() => {
    // Nếu user có data thì set mặc định các giá trị
    if (user) {
      const { music: uMusic, background_sound, language: uLang } = user;
      if (uMusic) setMusic(uMusic);
      if (background_sound) setSound(background_sound);
      if (uLang) setLanguage(uLang);
    }
  }, [user]);

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

  const handleUploadMusic = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.mp3';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file || !user?.member_id) {
        alert('⚠️ Hệ thống chưa tải xong thông tin người dùng.');
        return;
      }

      const formData = new FormData();
      formData.append('music', file);

      try {
        const res = await fetch('http://localhost:5000/upload-music', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.success && data.filename) {
          const newFilename = data.filename;
          setMusic(newFilename);

const docRef = doc(db, 'user', user.docId);
await updateDoc(docRef, { music: newFilename });


          window.location.reload();
        } else {
          alert('Upload failed');
        }
      } catch (err) {
        console.error('Upload error:', err);
        alert('Upload error');
      }
    };
    input.click();
  };

  return (
    <div className="setting-container">
      <div className="section">
        <h3>Settings Management</h3>
        <SettingForm
          uid={user?.member_id}
          sound={sound} setSound={setSound}
          music={music} setMusic={setMusic}
          language={language} setLanguage={setLanguage}
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
