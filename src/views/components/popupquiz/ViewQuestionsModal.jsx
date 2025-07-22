import React, { useEffect, useState } from 'react';
import '../../../assets/css/popupgamequiz/AddGame.css';
import { Trash } from 'lucide-react';

const ViewQuestionsModal = ({ quiz, onClose }) => {
    const [topPosition, setTopPosition] = useState(0);
useEffect(() => {
  // Khóa scroll nền
  document.body.style.overflow = 'hidden';

  // Scroll về đầu trang để viewport hiển thị hết modal
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  return () => {
    document.body.style.overflow = 'auto';
  };
}, []);


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                style={{
                    top: `${topPosition}px`,
                    left: '50%',
                     transform: 'translate(-50%, -50%)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
        <h2 className="modal-title">View Questions</h2>

        <table className="detail-table">
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Quiz Code</th>
              <th>Topic</th>
              <th>Created Date</th>
              <th>Average Score</th>
              <th>Number</th>
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
 <div class="table-wrapper">
        <table className="detail-table">
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
                <td>
                <button className="delete-icon">
                  <Trash size={18} />
                </button>
</td>
              </tr>
            ))}
          </tbody>
                    <tfoot>
    <tr>
      <td colSpan="9">
          <div className="quiz-action-links left-align">
            <span className="action-link">Edit</span>
            <span className="action-link">Add Question</span>
        </div>
      </td>
    </tr>
  </tfoot>
        </table>

</div>

        <div className="modal-footer">
          <button className="gradient-button">Confirm</button>
          <button className="secondary-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestionsModal;
