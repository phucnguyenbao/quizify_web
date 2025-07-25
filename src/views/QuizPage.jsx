import React, { useState, useEffect } from 'react';
import "../assets/css/QuizPage.css";
import AddOptionModal from './components/popupquiz/AddOptionModal';
import UploadQuizModal from './components/popupquiz/UploadQuizModal';
import AIQuizModal from './components/popupquiz/AIQuizModal';
import ViewQuestionsModal from './components/popupquiz/ViewQuestionsModal';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/services';

const QuizManagement = () => {
  const { user } = useAuth();

  const initialFilters = {
    name: '', code: '', topic: '', date: '',
    score: '', count: '', numUsers: '', numChoices: ''
  };

  const [quizzes, setQuizzes] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [tempFilter, setTempFilter] = useState(initialFilters);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [showAddOptionModal, setShowAddOptionModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showViewQuestionsModal, setShowViewQuestionsModal] = useState(false);

  // 🔁 Fetch quiz từ Firestore nếu user.member_id có sẵn
useEffect(() => {
  const fetchQuizzes = async () => {
    if (!user?.member_id) return;

    try {
      // 1️⃣ Tìm tất cả người dùng có supervisor_id = member_id hiện tại
      const userQuery = query(
        collection(db, 'user'),
        where('supervisor_id', '==', user.member_id)
      );
      const userSnapshot = await getDocs(userQuery);

      // 2️⃣ Lấy ra danh sách member_id của những người cấp dưới
      const subordinateIds = userSnapshot.docs.map(doc => doc.data().member_id);

      // 3️⃣ Gộp với chính user.member_id
      const allowedCreatorIds = [user.member_id, ...subordinateIds];

      // 4️⃣ Lấy tất cả quiz có Creator_id thuộc danh sách đó
      const quizSnapshot = await getDocs(collection(db, 'quiz'));

      const data = quizSnapshot.docs
        .filter(doc => allowedCreatorIds.includes(doc.data().Creator_id))
        .map(doc => {
          const quiz = doc.data();
          return {
            docId: doc.id,
            name: quiz.Quiz_name || '',
            code: quiz.Quiz_id || '',
            topic: quiz.Topic || '',
            date: quiz.Creation_date || '',
            score: quiz.Average_score || 0,
            count: quiz.Question_count || 0,
            numUsers: quiz.Attempted_users || 0,
            numChoices: quiz.Selection_count || 0,
            questions: []
          };
        });

      setQuizzes(data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy quiz hoặc người dùng:", err);
    }
  };

  fetchQuizzes();
}, [user]);


  
  // ❗ Không có quyền → chuyển hướng về trang chủ
  if (!user || (!user.manager && !user.leader)) {
    return <Navigate to="/" />;
  }

  // ====== Filter & Actions ======
  const handleFilterChange = (field, value) => {
    setTempFilter(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => setFilters({ ...tempFilter });
  const handleCancel = () => {
    setTempFilter(initialFilters);
    setFilters(initialFilters);
  };

  const toggleCheckbox = (index) => {
    setSelectedIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const selectAll = () => setSelectedIndexes(quizzes.map((_, i) => i));

 const deleteSelected = async () => {
  const toDelete = quizzes.filter((_, i) => selectedIndexes.includes(i));

  try {
    await Promise.all(toDelete.map(async (quiz) => {
      // Xóa toàn bộ câu hỏi liên quan tới quiz này
      const quesQuery = query(collection(db, 'ques'), where('Quiz_id', '==', quiz.code));
      const quesSnapshot = await getDocs(quesQuery);

      const deleteQuesPromises = quesSnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deleteQuesPromises);

      // Xóa quiz
      await deleteDoc(doc(db, 'quiz', quiz.docId));
    }));

    // Xóa khỏi local state
    setQuizzes(prev => prev.filter((_, i) => !selectedIndexes.includes(i)));
    setSelectedIndexes([]);
    alert(`✅ Đã xóa ${toDelete.length} quiz và toàn bộ câu hỏi liên quan.`);
  } catch (err) {
    console.error("❌ Lỗi khi xóa quiz hoặc câu hỏi:", err);
    alert("❌ Xóa thất bại. Xem console để biết chi tiết.");
  }
};



const exportSelected = async () => {
  const selected = quizzes.filter((_, i) => selectedIndexes.includes(i));
  if (selected.length === 0) {
    alert("⚠️ Vui lòng chọn ít nhất một quiz để export.");
    return;
  }

  try {
    const allRows = [];

for (let i = 0; i < selected.length; i++) {
  const quiz = selected[i];

  const q = query(
    collection(db, 'ques'),
    where('Quiz_id', '==', quiz.code)
  );
  const snapshot = await getDocs(q);
  const questions = snapshot.docs.map(doc => doc.data());

  // ✅ Nếu không có câu hỏi, vẫn export dòng trống với info quiz
  if (questions.length === 0) {
    allRows.push({
      Topic: quiz.topic,
      Quiz_name: quiz.name,
      Question_count: quiz.count,
      Question_image: '',
      Question_content: '',
      Question_type: '',
      Answer_1: '',
      Answer_2: '',
      Answer_3: '',
      Answer_4: '',
      Answer_5: '',
      Correct_answer: ''
    });
  } else {
    for (const ques of questions) {
      allRows.push({
        Topic: quiz.topic,
        Quiz_name: quiz.name,
        Question_count: quiz.count,
        Question_image: ques.Question_image || '',
        Question_content: ques.Question_content || '',
        Question_type: ques.Question_type || '',
        Answer_1: ques.Answer_1 || '',
        Answer_2: ques.Answer_2 || '',
        Answer_3: ques.Answer_3 || '',
        Answer_4: ques.Answer_4 || '',
        Answer_5: ques.Answer_5 || '',
        Correct_answer: ques.Correct_answer || ''
      });
    }
  }

  // ✅ Cách ra 1 hàng giữa các quiz (nếu chưa phải quiz cuối)
  if (i < selected.length - 1) {
    allRows.push({
      Topic: '',
      Quiz_name: '',
      Question_count: '',
      Question_image: '',
      Question_content: '',
      Question_type: '',
      Answer_1: '',
      Answer_2: '',
      Answer_3: '',
      Answer_4: '',
      Answer_5: '',
      Correct_answer: ''
    });
  }
}


    // Tạo workbook và worksheet
    const ws = XLSX.utils.json_to_sheet(allRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Quiz Export");

    // Ghi file
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, `quiz_export_${new Date().toISOString().slice(0,10)}.xlsx`);

    alert(`✅ Export thành công ${selected.length} quiz.`);
  } catch (err) {
    console.error("❌ Export thất bại:", err);
    alert("❌ Export thất bại. Xem console để biết chi tiết.");
  }
};

  const filteredQuizzes = quizzes.filter(q => (
    q.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    q.code.toLowerCase().includes(filters.code.toLowerCase()) &&
    q.topic.toLowerCase().includes(filters.topic.toLowerCase()) &&
    (filters.date === '' || q.date === filters.date) &&
    (filters.score === '' || q.score.toString().includes(filters.score)) &&
    (filters.count === '' || q.count.toString().includes(filters.count)) &&
    (filters.numUsers === '' || q.numUsers.toString().includes(filters.numUsers)) &&
    (filters.numChoices === '' || q.numChoices.toString().includes(filters.numChoices))
  ));

  return (
    <div className="quiz-management">
      <h2>Quiz Management</h2>

      {/* Filter */}
      <div className="filter-row">
        <input value={tempFilter.name} onChange={(e) => handleFilterChange("name", e.target.value)} placeholder="Name" />
        <input value={tempFilter.code} onChange={(e) => handleFilterChange("code", e.target.value)} placeholder="Code" />
        <input value={tempFilter.topic} onChange={(e) => handleFilterChange("topic", e.target.value)} placeholder="Topic" />
        <input type="date" value={tempFilter.date} onChange={(e) => handleFilterChange("date", e.target.value)} />
        <input value={tempFilter.score} onChange={(e) => handleFilterChange("score", e.target.value)} placeholder="Score" />
        <input value={tempFilter.count} onChange={(e) => handleFilterChange("count", e.target.value)} placeholder="Questions" />
        <input value={tempFilter.numUsers} onChange={(e) => handleFilterChange("numUsers", e.target.value)} placeholder="Participants" />
        <input value={tempFilter.numChoices} onChange={(e) => handleFilterChange("numChoices", e.target.value)} placeholder="Total Choices" />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleCancel}>Reset</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th colSpan="10" style={{ textAlign: 'right', padding: '10px 20px' }}>
              <div className="table-action-buttons">
                <span className="action-link" onClick={selectAll}>Select All</span>
                <span className="action-link" onClick={deleteSelected}>Delete</span>
                <span className="action-link" onClick={() => alert("Fetching quiz!")}>Fetch</span>
                <span className="action-link" onClick={exportSelected}>Export</span>
              </div>
            </th>
          </tr>
          <tr>
            <th>Name</th><th>Code</th><th>Topic</th><th>Date</th>
            <th>Score</th><th>Questions</th><th>Participants</th><th>Total Choices</th>
            {/* <th>Actions</th> */}
            <th>✓</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuizzes.map((quiz, idx) => (
            <tr key={idx}>
              <td>{quiz.name}</td>
              <td>{quiz.code}</td>
              <td>{quiz.topic}</td>
              <td>{quiz.date}</td>
              <td>{quiz.score}</td>
              <td>{quiz.count}</td>
              <td>{quiz.numUsers}</td>
              <td>{quiz.numChoices}</td>
              {/* <td>
                <button onClick={() => {
                  setSelectedQuiz(quiz);
                  setShowViewQuestionsModal(true);
                }}>
                  View Questions
                </button>
              </td> */}
              <td>
                <input type="checkbox" checked={selectedIndexes.includes(idx)} onChange={() => toggleCheckbox(idx)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Quiz */}
      <br />
      <button className="save-button" onClick={() => setShowAddOptionModal(true)}>Add Quiz</button>

      {/* === Popups === */}
      {showAddOptionModal && (
        <AddOptionModal
          onClose={() => setShowAddOptionModal(false)}
          onSelect={(type) => {
            setShowAddOptionModal(false);
            if (type === 'upload') setShowUploadModal(true);
            if (type === 'ai') setShowAIModal(true);
          }}
        />
      )}
      {showUploadModal && (
  <UploadQuizModal
    onClose={() => setShowUploadModal(false)}
    user={user} // ✅ truyền member_id
  />
)}

      {showAIModal && <AIQuizModal onClose={() => setShowAIModal(false)} />}
      {showViewQuestionsModal && selectedQuiz && (
        <ViewQuestionsModal
          quiz={selectedQuiz}
          onClose={() => setShowViewQuestionsModal(false)}
        />
      )}
    </div>
  );
};

export default QuizManagement;
