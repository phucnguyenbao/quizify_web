import React, { useState } from 'react';
import "../assets/css/QuizPage.css";
import AddOptionModal from './components/AddOptionModal';
import UploadQuizModal from './components/UploadQuizModal';
import AIQuizModal from './components/AIQuizModal';
import ViewQuestionsModal from './components/ViewQuestionsModal';

const QuizManagement = () => {
  const initialFilters = {
    name: '', code: '', topic: '', date: '',
    score: '', count: '', numUsers: '', numChoices: ''
  };

  const [quizzes, setQuizzes] = useState([
    { name: 'Quiz 1', code: '234', topic: 'Động vật', date: '2025-07-23', score: 8, count: 15, numUsers: 30, numChoices: 120, questions: ['Con mèo là?', 'Đây là gì?'] },
    { name: 'Quiz 2', code: '343', topic: 'Security', date: '2025-07-23', score: 8, count: 12, numUsers: 20, numChoices: 95, questions: ['HTTPS là gì?', 'XSS là gì?'] }
  ]);

  const [filters, setFilters] = useState(initialFilters);
  const [tempFilter, setTempFilter] = useState(initialFilters);

  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Popup State
  const [showAddOptionModal, setShowAddOptionModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showViewQuestionsModal, setShowViewQuestionsModal] = useState(false);

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

  const deleteSelected = () => {
    setQuizzes(quizzes.filter((_, i) => !selectedIndexes.includes(i)));
    setSelectedIndexes([]);
  };

  const exportSelected = () => {
    const selected = quizzes.filter((_, i) => selectedIndexes.includes(i));
    alert(`Export ${selected.length} quiz(es).`);
  };

  // ====== Filtered Data ======
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
      <h2>Quản lý Quiz</h2>

      {/* Filter */}
      <div className="filter-row">
        <input value={tempFilter.name} onChange={(e) => handleFilterChange("name", e.target.value)} placeholder="Tên" />
        <input value={tempFilter.code} onChange={(e) => handleFilterChange("code", e.target.value)} placeholder="Mã" />
        <input value={tempFilter.topic} onChange={(e) => handleFilterChange("topic", e.target.value)} placeholder="Chủ đề" />
        <input type="date" value={tempFilter.date} onChange={(e) => handleFilterChange("date", e.target.value)} />
        <input value={tempFilter.score} onChange={(e) => handleFilterChange("score", e.target.value)} placeholder="Điểm" />
        <input value={tempFilter.count} onChange={(e) => handleFilterChange("count", e.target.value)} placeholder="Câu hỏi" />
        <input value={tempFilter.numUsers} onChange={(e) => handleFilterChange("numUsers", e.target.value)} placeholder="Người làm" />
        <input value={tempFilter.numChoices} onChange={(e) => handleFilterChange("numChoices", e.target.value)} placeholder="Lượt chọn" />
        <button onClick={handleSearch}>Tìm</button>
        <button onClick={handleCancel}>Hủy</button>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <span className="action-link" onClick={selectAll}>Chọn hết</span>
        <span className="action-link" onClick={deleteSelected}>Xóa</span>
        <span className="action-link" onClick={() => alert("Lấy quiz!")}>Lấy</span>
        <span className="action-link" onClick={exportSelected}>Export</span>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Tên</th><th>Mã</th><th>Chủ đề</th><th>Ngày</th>
            <th>Điểm</th><th>Câu hỏi</th><th>Người làm</th><th>Lượt chọn</th>
            <th>Hành động</th><th>✓</th>
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
              <td>
                <button onClick={() => {
                  setSelectedQuiz(quiz);
                  setShowViewQuestionsModal(true);
                }}>
                  Xem câu hỏi
                </button>
              </td>
              <td>
                <input type="checkbox" checked={selectedIndexes.includes(idx)} onChange={() => toggleCheckbox(idx)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Quiz */}
      <br></br>
      <button className="add-button" onClick={() => setShowAddOptionModal(true)}>Thêm Quiz</button>

      {/* === Popups with overlay === */}
      {showAddOptionModal && (
        <>
          <div className="modal-overlay"></div>
          <AddOptionModal
            onClose={() => setShowAddOptionModal(false)}
            onSelect={(type) => {
              setShowAddOptionModal(false);
              if (type === 'upload') setShowUploadModal(true);
              if (type === 'ai') setShowAIModal(true);
            }}
          />
        </>
      )}

      {showUploadModal && (
        <>
          <div className="modal-overlay"></div>
          <UploadQuizModal onClose={() => setShowUploadModal(false)} />
        </>
      )}

      {showAIModal && (
        <>
          <div className="modal-overlay"></div>
          <AIQuizModal onClose={() => setShowAIModal(false)} />
        </>
      )}

      {showViewQuestionsModal && selectedQuiz && (
        <>
          <div className="modal-overlay"></div>
          <ViewQuestionsModal quiz={selectedQuiz} onClose={() => setShowViewQuestionsModal(false)} />
        </>
      )}
    </div>
  );
};

export default QuizManagement;
