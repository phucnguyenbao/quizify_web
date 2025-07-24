import React, { useState, useEffect, useCallback } from 'react';
import '../../../assets/css/PlayPage.css';

export const QuizScreen = ({ game, onFinish }) => {
  useEffect(() => {
    document.body.classList.remove('start-transition');
  }, []);
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
    if (currentQ < game.questions.length - 1) {
      setCurrentQ(prevQ => prevQ + 1);
    } else {
      alert('Quiz finished!');
      onFinish();
    }
  }, [currentQ, game.questions.length, onFinish]);

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
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQ, handleNextQuestion]);

  useEffect(() => {
    const newPage = Math.floor(currentQ / QUESTIONS_PER_PAGE);
    if (newPage !== navPage) {
      setNavPage(newPage);
    }
  }, [currentQ, navPage]);

  const formatTime = (seconds) => `00:${seconds.toString().padStart(2, '0')}`;
  const getTimerBarColor = () => {
    const percentage = timeLeft / TIME_PER_QUESTION;
    if (percentage <= 0.2) return 'timer-bar-red';
    if (percentage <= 0.6) return 'timer-bar-yellow';
    return 'timer-bar-green';
  };

  const progress = (timeLeft / TIME_PER_QUESTION) * 100;
  const pageCount = Math.ceil(game.questions.length / QUESTIONS_PER_PAGE);
  const startIdx = navPage * QUESTIONS_PER_PAGE;
  const endIdx = startIdx + QUESTIONS_PER_PAGE;
  const visibleQuestions = game.questions.slice(startIdx, endIdx);

  return (
    <div className="quiz-screen">
      <div className="timer-bar-container">
        <div className={`timer-bar ${getTimerBarColor()}`} style={{ width: `${progress}%` }}></div>
        <span>{formatTime(timeLeft)}</span>
      </div>

      <div className="quiz-body">
        <div className="question-area">
          <h4>Question {currentQ + 1}: {game.questions[currentQ].text}</h4>
          <div className="options-grid">
            {Object.entries(game.questions[currentQ].options).map(([key, value]) => (
              <div
                key={key}
                className={`option-box ${answers[currentQ] === key ? 'selected' : ''}`}
                onClick={() => handleSelectAnswer(currentQ, key)}
              >
                <span>{key}</span><p>{value}</p>
              </div>
            ))}
          </div>
          <div className="question-footer">
            <button className="next-question-btn" onClick={handleNextQuestion}>Next Question</button>
          </div>
        </div>

        <div className="question-nav">
          <h5 className="question-nav-title">Question List</h5>
          <div className="nav-grid">
            {visibleQuestions.map((_, index) => {
              const questionIndex = startIdx + index;
              const isAnswered = answers.hasOwnProperty(questionIndex);
              const isCurrent = currentQ === questionIndex;
              const buttonClasses = ['nav-button'];
              if (isAnswered) buttonClasses.push('answered');
              if (isCurrent) buttonClasses.push('current');

              return (
                <button
                  key={questionIndex}
                  className={buttonClasses.join(' ')}
                  onClick={() => setCurrentQ(questionIndex)}
                >
                  {questionIndex + 1}
                </button>
              );
            })}
          </div>
          <div className="nav-pagination">
            <button onClick={() => setNavPage(p => Math.max(0, p - 1))} disabled={navPage === 0}>{'«'}</button>
            <span>Page {navPage + 1} of {pageCount}</span>
            <button onClick={() => setNavPage(p => Math.min(pageCount - 1, p + 1))} disabled={navPage === pageCount - 1}>{'»'}</button>
          </div>
          <div className="nav-footer">
            <button className="btn-submit" onClick={() => { alert('Quiz submitted successfully!'); onFinish(); }}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
