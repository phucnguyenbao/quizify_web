import React from 'react';
import "../../assets/css/QuizPage.css";

const ViewQuestionsModal = ({ quiz, onClose }) => {
  return (
    <div className="view-quiz-modal">
      <h4 className="quiz-section-title">Xem câu hỏi</h4>
      <table className="quiz-table">
        <thead>
          <tr>
            <th>Tên quiz</th>
            <th>Mã quiz</th>
            <th>Chủ đề quiz</th>
            <th>Ngày tạo</th>
            <th>Điểm trung bình</th>
            <th>Số lượng câu hỏi</th>
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
            <th>STT</th>
            <th>Câu hỏi</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
            <th>Đáp án</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {quiz.questions.map((q, index) => (
            <tr key={index}>
              <td>Câu {index + 1}</td>
              <td>{q.question}</td>
              <td>{q.a}</td>
              <td>{q.b}</td>
              <td>{q.c}</td>
              <td>{q.d}</td>
              <td>{q.e}</td>
              <td>{q.answer}</td>
              <td className="delete-link">Xóa</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="quiz-action-links">
        <span className="action-link">Sửa</span>
        <span className="action-link">Thêm câu hỏi</span>
        <span className="cancel-link" onClick={onClose}>Cancel</span>
      </div>

      <div className="confirm-wrapper">
        <button className="confirm-button">Xác nhận</button>
      </div>
    </div>
  );
};

export default ViewQuestionsModal;
