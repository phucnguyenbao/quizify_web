import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/PlayPage.css';

// Dữ liệu mẫu không đổi
const dummyQuiz = {
  title: 'General Knowledge Quiz',
  questions: [
    { id: 1, text: 'What is the capital of France?', options: { a: 'London', b: 'Berlin', c: 'Paris', d: 'Madrid' } },
    { id: 2, text: 'Which planet is known as the Red Planet?', options: { a: 'Earth', b: 'Mars', c: 'Jupiter', d: 'Venus' } },
    ...Array.from({ length: 18 }, (_, i) => ({
      id: i + 3,
      text: `This is sample question number ${i + 3}?`,
      options: { a: `Option A${i + 3}`, b: `Option B${i + 3}`, c: `Option C${i + 3}`, d: `Option D${i + 3}` }
    }))
  ]
};

// --- WAITING ROOM COMPONENT (Không thay đổi logic) ---
export const WaitingRoom = ({ game, onStartQuiz, onExit }) => {
  const [soundOn, setSoundOn] = useState(true);
  if (!game) return null;
  return (
    <div className="waiting-room">
      <h3 className="page-title">Game Lobby</h3>
      <div className="game-settings-box">
        <div className="settings-header">
          <div className="setting-item"><label>Choose Avatar</label><button className="btn-list">Image List</button></div>
          <div className="setting-item"><span>Sound Effects</span><button className={`btn-toggle ${soundOn ? 'on' : 'off'}`} onClick={() => setSoundOn(!soundOn)}><span>{soundOn ? 'On' : 'Off'}</span></button></div>
          <div className="setting-item"><img src="https://i.pravatar.cc/50" alt="avatar" className="avatar-preview" /></div>
        </div>
        <div className="game-info">
          <div className="info-row"><span>Time Limit</span><span>30 minutes</span></div>
          <div className="info-row"><span>Attempts Made / Allowed</span><span>7/8</span></div>
          <div className="info-row"><span>Highest Score</span><span>9</span></div>
        </div>
        <div className="start-game-actions">
          <button className="btn btn-primary" onClick={onStartQuiz}>Start</button>
          <button className="btn-secondary" onClick={onExit}>Back</button>
        </div>
      </div>
    </div>
  );
};


// --- QUIZ SCREEN COMPONENT (Đã thêm logic tự động chuyển trang) ---
export const QuizScreen = ({ game, onFinish }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [navPage, setNavPage] = useState(0);
  const TIME_PER_QUESTION = 15;
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const QUESTIONS_PER_PAGE = 10;

  const handleSelectAnswer = (qIndex, optionKey) => {
    setAnswers(prev => ({ ...prev, [qIndex]: optionKey }));
  };

  const handleNextQuestion = useCallback(() => {
    if (currentQ < dummyQuiz.questions.length - 1) {
      setCurrentQ(prevQ => prevQ + 1);
    } else {
      alert('Quiz finished!');
      onFinish();
    }
  }, [currentQ, onFinish]);

  useEffect(() => {
    setTimeLeft(TIME_PER_QUESTION);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQ, handleNextQuestion]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyMap = { '1': 'a', '2': 'b', '3': 'c', '4': 'd' };
      if (keyMap[event.key]) {
        handleSelectAnswer(currentQ, keyMap[event.key]);
        return;
      }
      if (event.key === 'Enter') {
        handleNextQuestion();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentQ, handleNextQuestion]);

  // === UPDATE: Tự động chuyển trang điều hướng khi câu hỏi thay đổi ===
  useEffect(() => {
    const newPage = Math.floor(currentQ / QUESTIONS_PER_PAGE);
    if (newPage !== navPage) {
      setNavPage(newPage);
    }
  }, [currentQ, navPage, QUESTIONS_PER_PAGE]);


  const formatTime = (seconds) => `00:${seconds.toString().padStart(2, '0')}`;
  const getTimerBarColor = () => {
    const percentage = timeLeft / TIME_PER_QUESTION;
    if (percentage <= 0.2) return 'timer-bar-red';
    if (percentage <= 0.6) return 'timer-bar-yellow';
    return 'timer-bar-green';
  };
  const progress = (timeLeft / TIME_PER_QUESTION) * 100;
  const pageCount = Math.ceil(dummyQuiz.questions.length / QUESTIONS_PER_PAGE);
  const startIdx = navPage * QUESTIONS_PER_PAGE;
  const endIdx = startIdx + QUESTIONS_PER_PAGE;
  const visibleQuestions = dummyQuiz.questions.slice(startIdx, endIdx);

  return (
    <div className="quiz-screen">
      {/* Bố cục này không có header */}
      <div className="timer-bar-container">
        <div className={`timer-bar ${getTimerBarColor()}`} style={{ width: `${progress}%` }}></div>
        <span>{formatTime(timeLeft)}</span>
      </div>

      <div className="quiz-body">
        <div className="question-area">
          <h4>Question {currentQ + 1}: {dummyQuiz.questions[currentQ].text}</h4>
          <div className="options-grid">
            {Object.entries(dummyQuiz.questions[currentQ].options).map(([key, value]) => (
              <div
                key={key}
                className={`option-box ${answers[currentQ] === key ? 'selected' : ''}`}
                onClick={() => handleSelectAnswer(currentQ, key)}
              >
                <span>{key})</span><p>{value}</p>
              </div>
            ))}
          </div>
          <div className="question-footer">
            <button className="next-question-btn" onClick={handleNextQuestion}>
              Next Question
            </button>
          </div>
        </div>

        <div className="question-nav">
          <div className="nav-grid">
            {visibleQuestions.map((_, index) => {
              const questionIndex = startIdx + index;
              const isAnswered = answers.hasOwnProperty(questionIndex);
              const isCurrent = currentQ === questionIndex;
              const buttonClasses = ['nav-button'];
              if (isAnswered) { buttonClasses.push('answered'); }
              if (isCurrent) { buttonClasses.push('current'); }

              return (
                <button
                  key={questionIndex}
                  className={buttonClasses.join(' ')}
                  onClick={() => setCurrentQ(questionIndex)}
                >
                  Question {questionIndex + 1}
                </button>
              );
            })}
          </div>
          <div className="nav-pagination">
            <button onClick={() => setNavPage(p => Math.max(0, p - 1))} disabled={navPage === 0}>
              {'<<'}
            </button>
            <span>Page {navPage + 1} of {pageCount}</span>
            <button onClick={() => setNavPage(p => Math.min(pageCount - 1, p + 1))} disabled={navPage === pageCount - 1}>
              {'>>'}
            </button>
          </div>
          <div className="nav-footer">
            <button className="btn-submit" onClick={() => { alert('Quiz submitted successfully!'); onFinish(); }}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};