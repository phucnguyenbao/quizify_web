import React, { useState } from 'react';
import "../assets/css/QuizPage.css";
import AddOptionModal from './components/AddOptionModal';
import UploadQuizModal from './components/UploadQuizModal';
import AIQuizModal from './components/AIQuizModal';
import ViewQuestionsModal from './components/ViewQuestionsModal';

const QuizManagement = () => {
const [quizzes, setQuizzes] = useState([
  {
    name: 'Quiz 1',
    code: '234',
    topic: 'Động vật',
    date: '23/07/2025',
    score: 8,
    count: 15,
    numUsers: 30,
    numChoices: 120,
    questions: ['Con mèo là?', 'Đây là gì?']
  },
  {
    name: 'Quiz 2',
    code: '343',
    topic: 'Security',
    date: '23/07/2025',
    score: 8,
    count: 12,
    numUsers: 20,
    numChoices: 95,
    questions: ['HTTPS là gì?', 'XSS là gì?']
  }
]);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showAddOptionModal, setShowAddOptionModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showViewQuestionsModal, setShowViewQuestionsModal] = useState(false);
const [selectedIndexes, setSelectedIndexes] = useState([]);


  const toggleCheckbox = (index) => {
    setSelectedIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const selectAll = () => {
    setSelectedIndexes(quizzes.map((_, i) => i));
  };

  const deselectAll = () => {
    setSelectedIndexes([]);
  };

  const deleteSelected = () => {
    setQuizzes(prev => prev.filter((_, i) => !selectedIndexes.includes(i)));
    setSelectedIndexes([]);
  };

  const exportSelected = () => {
    const selected = quizzes.filter((_, i) => selectedIndexes.includes(i));
    console.log("Exporting:", selected);
    alert(`Export ${selected.length} quiz(es). (Xử lý backend sau)`);
  };

  return (
    <div className="quiz-management">
      <h2>Quản lý Quiz</h2>
      <div className="action-buttons">
        <span className="action-link" onClick={selectAll}>Chọn hết</span>
        <span className="action-link" onClick={deleteSelected}>Xóa</span>
        <span className="action-link" onClick={() => alert("Lấy quiz!")}>Lấy</span>
        <span className="action-link" onClick={exportSelected}>Export</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Tên quiz</th>
            <th>Mã quiz</th>
            <th>Chủ đề quiz</th>
            <th>Ngày tạo</th>
            <th>Điểm trung bình</th>
            <th>Số lượng câu hỏi</th>
            <th>Số người làm</th>
            <th>Số lượt chọn</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
        {quizzes.map((quiz, idx) => (
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
                <button onClick={() => { setSelectedQuiz(quiz); setShowViewQuestionsModal(true); }}>Xem câu hỏi</button>
            </td>
            <td>
                <input
                  type="checkbox"
                  checked={selectedIndexes.includes(idx)}
                  onChange={() => toggleCheckbox(idx)}
                />
              </td>
            </tr>
        ))}
        </tbody>

      </table>
      
      <br />
      <button className="add-button" onClick={() => setShowAddOptionModal(true)}>Thêm quiz</button>
      {showAddOptionModal && (
        <AddOptionModal
          onClose={() => setShowAddOptionModal(false)}
          onSelect={(type) => {
            setShowAddOptionModal(false);
            if (type === 'upload') setShowUploadModal(true);
            else if (type === 'ai') setShowAIModal(true);
          }}
        />
      )}

      {showUploadModal && <UploadQuizModal onClose={() => setShowUploadModal(false)} />}
      {showAIModal && <AIQuizModal onClose={() => setShowAIModal(false)} />}
      {showViewQuestionsModal && selectedQuiz && (
        <ViewQuestionsModal quiz={selectedQuiz} onClose={() => setShowViewQuestionsModal(false)} />
      )}
    </div>
  );
};

export default QuizManagement;
