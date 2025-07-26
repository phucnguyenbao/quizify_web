import React, { useState, useEffect } from 'react';
import SettingForm from './components/popupsetting/SettingForm';
import ReportTable from './components/popupsetting/ReportTable';
import '../assets/css/SettingPage.css';
import { db } from '../firebase/services';
import { doc, updateDoc, collection, getDocs, Timestamp, query, where, addDoc, limit, orderBy } from 'firebase/firestore';
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
  const [searchReportId, setSearchReportId] = useState('');
const [searchReceiver, setSearchReceiver] = useState('');
const [searchReplyContent, setSearchReplyContent] = useState('');
const [searchStatus, setSearchStatus] = useState('');
  const [filterReplyDate, setFilterReplyDate] = useState('');
  const [reportsFromRepo, setReportsFromRepo] = useState([]);

  const currentMemberId = user?.member_id;

  // ===== Load settings từ Firestore =====
  useEffect(() => {
    if (user) {
      const { music: uMusic, background_sound, language: uLang } = user;
      if (uMusic) setMusic(uMusic);
      if (background_sound) setSound(background_sound);
      if (uLang) setLanguage(uLang);
    }
  }, [user]);

  // ===== Lấy report liên quan và enrich với team, dept =====
  useEffect(() => {
    fetchReportsWithTeamDept();
  }, [currentMemberId]);

  const fetchReportsWithTeamDept = async () => {
    if (!currentMemberId) return;

    try {
      const repoSnap = await getDocs(collection(db, 'repo'));
      const allReports = repoSnap.docs.map(doc => ({ docId: doc.id, ...doc.data() }));

      const relatedReports = allReports.filter(
        r => r.Sender_id === currentMemberId || r.Receiver_id === currentMemberId
      );

      const userSnap = await getDocs(collection(db, 'user'));
      const users = userSnap.docs.map(doc => doc.data());

      const teamSnap = await getDocs(collection(db, 'team'));
      const teams = teamSnap.docs.map(doc => doc.data());

      const deptSnap = await getDocs(collection(db, 'dept'));
      const depts = deptSnap.docs.map(doc => doc.data());

      const enrichedReports = relatedReports.map(report => {
        const senderUser = users.find(u => u.member_id === report.Sender_id);
        const team = teams.find(t => t.Team_id === senderUser?.team_id);
        const department = depts.find(d => d.Department_id === team?.Department_id);

        return {
          docId: report.docId, // Firestore doc ID
          Report_id: report.Report_id,
          Status: report.Status,
          Sender_id: report.Sender_id,
          Receiver_id: report.Receiver_id,
          Creation_date: report.Creation_date,
          Response_date: report.Response_date,
          Report_content: report.Report_content,
          Reply_content: report.Response_content,
          Team: team?.Team_name || 'N/A',
          Department: department?.Department_name || 'N/A',
        };
      });

      setReportsFromRepo(enrichedReports);
    } catch (err) {
      console.error('❌ Lỗi khi load report:', err);
    }
  };

  // ===== Bộ lọc báo cáo =====
  const convertToISO = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

const filteredReports = reportsFromRepo.filter(r =>
  (r.Report_id?.toString() || '').includes(searchReportId) &&
  (r.Status || '').toLowerCase().includes(searchStatus.toLowerCase()) &&
  (r.Sender_id || '').toLowerCase().includes(searchUser.toLowerCase()) &&
  (r.Receiver_id || '').toLowerCase().includes(searchReceiver.toLowerCase()) &&
  (r.Report_content || '').toLowerCase().includes(searchReport.toLowerCase()) &&
  (r.Response_content || '').toLowerCase().includes(searchReplyContent.toLowerCase()) &&
  (r.Team || '').toLowerCase().includes(searchTeam.toLowerCase()) &&
  (r.Department || '').toLowerCase().includes(searchBan.toLowerCase()) &&
  (filterCreateDate === '' || (r.Creation_date && convertToISO(r.Creation_date.toDate?.() || r.Creation_date) === filterCreateDate)) &&
  (filterReplyDate === '' || (r.Response_date && convertToISO(r.Response_date.toDate?.() || r.Response_date) === filterReplyDate))
);


  const resetFilters = () => {
    setSearchReport('');
    setFilterCreateDate('');
    setSearchUser('');
    setSearchBan('');
    setSearchTeam('');
    setFilterReplyDate('');
  };

  // ===== Gửi phản hồi =====
 const handleSendReply = async (reportId, replyText) => {
  try {
    const now = new Date();
    const q = query(collection(db, 'repo'), where('Report_id', '==', reportId));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const docRef = snap.docs[0].ref;

      await updateDoc(docRef, {
        Response_content: replyText,
        Response_date: Timestamp.fromDate(now),
        Status: 'has been processed',
      });

      setReportsFromRepo(prev =>
        prev.map(r =>
          r.Report_id === reportId
            ? {
                ...r,
                Reply_content: replyText,
                Response_date: now,
                Status: 'has been processed',
              }
            : r
        )
      );

      console.log(`✅ Đã phản hồi report ${reportId}`);
    } else {
      console.warn(`⚠️ Không tìm thấy report với Report_id = ${reportId}`);
    }
  } catch (err) {
    console.error(`❌ Gửi phản hồi thất bại cho report ${reportId}:`, err);
  }
};


  // ===== Gửi báo cáo (nếu cần) =====
const handleSubmitReport = async () => {
  if (!reportContent.trim()) return;

  try {
    // 1. Truy vấn user có member_id = currentMemberId
    const userQuery = query(collection(db, 'user'), where('member_id', '==', currentMemberId));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      alert('Không tìm thấy thông tin người dùng!');
      return;
    }

    const userData = userSnapshot.docs[0].data();
    const supervisor_id = userData.supervisor_id;

    if (!supervisor_id) {
      alert('Không tìm thấy supervisor cho user này!');
      return;
    }

    // 2. Lấy Report_id lớn nhất hiện tại trong bảng repo
    const repoQuery = query(collection(db, 'repo'), orderBy('Report_id', 'desc'), limit(1));
    const repoSnapshot = await getDocs(repoQuery);

    let newReportId = 1;
    if (!repoSnapshot.empty) {
      const lastReport = repoSnapshot.docs[0].data();
      newReportId = (lastReport.Report_id || 0) + 1;
    }

    // 3. Thêm báo cáo mới vào bảng repo
    await addDoc(collection(db, 'repo'), {
      Report_id: newReportId,
      Report_content: reportContent.trim(),
      Creation_date: new Date(),
      Receiver_id: supervisor_id,
      Sender_id: currentMemberId,
      Status: 'not read',
      Response_content: '',
      Response_date: null,
    });

    alert('✅ Gửi báo cáo thành công!');
    setReportContent('');

  } catch (err) {
    console.error('❌ Gửi báo cáo thất bại:', err);
    alert('Gửi báo cáo thất bại. Vui lòng thử lại sau.');
  }
};
const handleStatusChange = async (reportId, newStatus) => {
  try {
    const q = query(collection(db, 'repo'), where('Report_id', '==', reportId));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const docRef = snap.docs[0].ref;
      await updateDoc(docRef, {
        Status: newStatus,
      });

      // Cập nhật vào local state
      setReportsFromRepo(prev =>
        prev.map(r =>
          r.Report_id === reportId ? { ...r, Status: newStatus } : r
        )
      );
      console.log(`✅ Đã cập nhật status report ${reportId} => ${newStatus}`);
    }
  } catch (err) {
    console.error(`❌ Lỗi khi cập nhật status cho ${reportId}:`, err);
  }
};


  // ===== Upload nhạc =====
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
          await updateDoc(doc(db, 'user', user.docId), { music: newFilename });
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
          searchReportId={searchReportId} setSearchReportId={setSearchReportId}
  searchReceiver={searchReceiver} setSearchReceiver={setSearchReceiver}
  searchReplyContent={searchReplyContent} setSearchReplyContent={setSearchReplyContent}
  searchStatus={searchStatus} setSearchStatus={setSearchStatus}
        filterReplyDate={filterReplyDate} setFilterReplyDate={setFilterReplyDate}
        resetFilters={resetFilters}
        filteredReports={filteredReports}
        currentMemberId={currentMemberId}
        handleSendReply={handleSendReply}
        handleStatusChange={handleStatusChange}
        
      />
    </div>
  );
};

export default SettingPage;
