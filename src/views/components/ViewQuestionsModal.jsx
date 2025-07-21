import React from 'react';
import "../../assets/css/QuizPage.css";

const ViewQuestionsModal = ({ quiz, onClose }) => {
  return (
    <div className="view-quiz-modal">
      <h4 className="quiz-section-title">View Questions</h4>
      <table className="quiz-table">
        <thead>
          <tr>
            <th>Quiz Name</th>
            <th>Quiz Code</th>
            <th>Topic</th>
            <th>Created Date</th>
            <th>Average Score</th>
            <th>Number of Questions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz.name}</td>
            <td>{quiz.code}</td>
            <td>{quiz.topic}</td>
            <td>{quiz.date}</td>
            <td>{quiz.averageScore}</td>
            <td>{quiz.questions.length}</td>
          </tr>
        </tbody>
      </table>

      <table className="quiz-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Question</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
            <th>Answer</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {quiz.questions.map((q, index) => (
            <tr key={index}>
              <td>Q{index + 1}</td>
              <td>{q.question}</td>
              <td>{q.a}</td>
              <td>{q.b}</td>
              <td>{q.c}</td>
              <td>{q.d}</td>
              <td>{q.e}</td>
              <td>{q.answer}</td>
              <td className="delete-link">Delete</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="quiz-action-links">
        <span className="action-link">Edit</span>
        <span className="action-link">Add Question</span>
        <span className="cancel-link" onClick={onClose}>Cancel</span>
      </div>

      <div className="confirm-wrapper">
        <button className="confirm-button">Confirm</button>
      </div>
    </div>
  );
};

export default ViewQuestionsModal;
