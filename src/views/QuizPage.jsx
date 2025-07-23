import React, { useState } from 'react';
import "../assets/css/QuizPage.css";
import AddOptionModal from './components/popupquiz/AddOptionModal';
import UploadQuizModal from './components/popupquiz/UploadQuizModal';
import AIQuizModal from './components/popupquiz/AIQuizModal';
import ViewQuestionsModal from './components/popupquiz/ViewQuestionsModal';

const QuizManagement = () => {
  const initialFilters = {
    name: '', code: '', topic: '', date: '',
    score: '', count: '', numUsers: '', numChoices: ''
  };

  const [quizzes, setQuizzes] = useState([
    { name: 'Quiz 1', code: '234', topic: 'Animals', date: '2025-07-23', score: 8, count: 15, numUsers: 30, numChoices: 120, questions: ['What is a cat?', 'What is this?'] },
    { name: 'Quiz 2', code: '343', topic: 'Security', date: '2025-07-23', score: 8, count: 12, numUsers: 20, numChoices: 95, questions: ['What is HTTPS?', 'What is XSS?'] }
  ]);

  const [filters, setFilters] = useState(initialFilters);
  const [tempFilter, setTempFilter] = useState(initialFilters);

  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

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
    alert(`Exporting ${selected.length} quiz(es).`);
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
      <th>Actions</th><th>✓</th>
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
                  View Questions
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
      <br/>
      <button className="save-button"  onClick={() => setShowAddOptionModal(true)}>Add Quiz</button>

      {/* === Popups with overlay === */}
      {showAddOptionModal && (
        <>
          
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
          
          <UploadQuizModal onClose={() => setShowUploadModal(false)} />
        </>
      )}

      {showAIModal && (
        <>
          
          <AIQuizModal onClose={() => setShowAIModal(false)} />
        </>
      )}

      {showViewQuestionsModal && selectedQuiz && (
        <>
          
          <ViewQuestionsModal quiz={selectedQuiz} onClose={() => setShowViewQuestionsModal(false)} />
        </>
      )}
    </div>
  );
};

export default QuizManagement;
