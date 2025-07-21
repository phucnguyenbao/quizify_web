import React, { useState, useEffect } from 'react';
import '../assets/css/PlayPage.css';

const dummyQuiz = {
  title: 'Kiểm tra kiến thức chung',
  questions: [
    { id: 1, text: 'Cách làm bài tập về nhà hiệu quả', options: { a: 'Đáp án A', b: 'Đáp án B', c: 'Đáp án C', d: 'Đáp án D' }, },
    { id: 2, text: 'Thủ đô của Pháp là gì?', options: { a: 'London', b: 'Berlin', c: 'Paris', d: 'Madrid' }, },
    ...Array.from({ length: 18 }, (_, i) => ({
      id: i + 3, text: `Đây là câu hỏi số ${i + 3}?`, options: { a: `Lựa chọn A${i + 3}`, b: `Lựa chọn B${i + 3}`, c: `Lựa chọn C${i + 3}`, d: `Lựa chọn D${i + 3}` }
    }))
  ]
};

export const WaitingRoom = ({ game, onStartQuiz, onExit }) => {
  const [soundOn, setSoundOn] = useState(true);
  if (!game) return null;
  return (
    <div className="waiting-room">
      <h3 className="page-title">Trang chờ vào game</h3>
      <div className="game-settings-box">
        <div className="settings-header">
          <div className="setting-item"><label>Chọn ảnh đại diện</label><button className="btn-list">List ảnh</button></div>
          <div className="setting-item"><span>Hiệu ứng âm thanh</span><button className={`btn-toggle ${soundOn ? 'on' : 'off'}`} onClick={() => setSoundOn(!soundOn)}>{soundOn ? 'On' : 'Off'}</button></div>
          <div className="setting-item"><img src="https://i.pravatar.cc/50" alt="avatar" className="avatar-preview" /></div>
        </div>
        <div className="game-info">
          <div className="info-row"><span>Thời gian làm bài</span><span>{game.timeLimit} phút</span></div>
          <div className="info-row"><span>Số lần đã làm/ Số lần được cho phép</span><span>{game.attempts}</span></div>
          <div className="info-row"><span>Điểm cao nhất</span><span>{game.maxScore}</span></div>
        </div>
        <div className="start-game-actions">
          <button className="btn btn-primary" onClick={onStartQuiz}>Bắt đầu</button>
          <button className="btn-secondary" onClick={onExit}>Quay lại</button>
        </div>
      </div>
    </div>
  );
};

export const QuizScreen = ({ game, onFinish }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState((game?.timeLimit || 30) * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSelectAnswer = (qIndex, optionKey) =>
    setAnswers(prev => ({ ...prev, [qIndex]: optionKey }));

  const progress = ((timeLeft / ((game?.timeLimit || 30) * 60)) * 100);

  return (
    <div className="quiz-screen">
      <div className="header-nav"><span>{game?.name || "Game Quiz"}</span><div className="user-actions"><span>Quản lý, cài đặt và báo cáo</span><span>Đăng xuất</span></div></div>
      <div className="timer-bar-container"><div className="timer-bar" style={{ width: `${100 - progress}%` }}></div><span>{formatTime(timeLeft)}</span></div>
      <div className="quiz-body">
        <div className="question-area">
          <h4>Câu hỏi {currentQ + 1}: {dummyQuiz.questions[currentQ].text}</h4>
          <div className="options-grid">
            {Object.entries(dummyQuiz.questions[currentQ].options).map(([key, value]) => (
              <div key={key} className={`option-box ${answers[currentQ] === key ? 'selected' : ''}`} onClick={() => handleSelectAnswer(currentQ, key)}>
                <span>{key})</span><p>{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="question-nav">
          <div className="nav-grid">
            {dummyQuiz.questions.map((_, index) => (
              <button key={index} className={`nav-button ${currentQ === index ? 'current' : ''} ${answers[index] ? 'answered' : ''}`} onClick={() => setCurrentQ(index)}>
                Câu {index + 1}
              </button>
            ))}
          </div>
          <div className="nav-footer">
            <button className="btn-submit" onClick={() => { alert('Nộp bài thành công!'); onFinish(); }}>Nộp bài</button>
          </div>
        </div>
      </div>
    </div>
  );
};
