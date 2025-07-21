import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/PlayPage.css';

// === UPDATE: Dữ liệu mẫu đã được cập nhật với 20 câu hỏi về Nhật Bản ===
const dummyQuiz = {
  title: 'Quiz about Japan',
  questions: [
    { id: 1, text: "What flower is Japan's national emblem?", options: { a: 'Rose', b: 'Lotus', c: 'Cherry Blossom', d: 'Chrysanthemum' }, answer: 'c' },
    { id: 2, text: 'Kimono is the traditional Japanese garment.', options: { a: 'True', b: 'False' }, answer: 'a' },
    { id: 3, text: "Who is commemorated during the Obon festival in Japan?", options: { a: 'Gods', b: "Ancestors' spirits", c: 'The Emperor', d: 'Patron saints' }, answer: 'b' },
    { id: 4, text: "What is Japan's most famous traditional dish worldwide?", options: { a: 'Mochi', b: 'Sushi', c: 'Takoyaki', d: 'Ramen' }, answer: 'b' },
    { id: 5, text: 'A Geisha is:', options: { a: 'A warrior', b: 'A theater actor', c: 'A traditional female artist', d: 'A queen' }, answer: 'c' },
    { id: 6, text: 'Sumo is a traditional sport originating from Japan.', options: { a: 'True', b: 'False' }, answer: 'a' },
    { id: 7, text: 'What is the suffix "-san" used for in Japanese?', options: { a: 'Informal address', b: 'A polite and respectful title', c: "A famous person's name", d: 'A profession' }, answer: 'b' },
    { id: 8, text: 'Which city is the former imperial capital of Japan?', options: { a: 'Tokyo', b: 'Osaka', c: 'Kyoto', d: 'Sapporo' }, answer: 'c' },
    { id: 9, text: 'What is the famous Japanese tea ceremony called?', options: { a: 'Chado (The Way of Tea)', b: 'Ikebana', c: 'Bon Odori', d: 'Noh' }, answer: 'a' },
    { id: 10, text: 'What is a "Torii" in Japanese culture?', options: { a: 'A type of food', b: 'A traditional shrine gate', c: 'A martial art', d: 'A costume' }, answer: 'b' },
    { id: 11, text: 'The Tanabata festival is associated with what story?', options: { a: 'The story of Altair and Vega', b: 'The legend of Mount Fuji', c: 'The Sun Goddess', d: 'The legend of a carp becoming a dragon' }, answer: 'a' },
    { id: 12, text: 'On what occasion do the Japanese typically eat soba noodles?', options: { a: 'Birthdays', b: 'Summer festivals', c: "New Year's Eve", d: 'Mid-Autumn festival' }, answer: 'c' },
    { id: 13, text: 'What does the culture of "Omotenashi" represent in Japan?', options: { a: 'Competition', b: 'Selfless hospitality', c: 'Conservatism', d: 'Business ethics' }, answer: 'b' },
    { id: 14, text: 'How many distinct seasons does Japan have?', options: { a: '2', b: '3', c: '4', d: '5' }, answer: 'c' },
    { id: 15, text: 'What is the art of "Ikebana"?', options: { a: 'Tea ceremony', b: 'Paper folding', c: 'Flower arrangement', d: 'Calligraphy' }, answer: 'c' },
    { id: 16, text: 'The Japanese typically bow when:', options: { a: 'Eating', b: 'Communicating and greeting', c: 'Going to sleep', d: 'Exercising' }, answer: 'b' },
    { id: 17, text: 'The Hanami festival is an occasion for:', options: { a: 'Eating free sushi', b: 'Watching fireworks', c: 'Viewing cherry blossoms', d: 'Giving gifts' }, answer: 'c' },
    { id: 18, text: 'Anime and Manga are characteristic of what aspect of Japanese culture?', options: { a: 'Ancient literature', b: 'Popular entertainment', c: 'Politics', d: 'Religion' }, answer: 'b' },
    { id: 19, text: 'The Japanese typically take off their shoes when entering a house.', options: { a: 'True', b: 'False' }, answer: 'a' },
    { id: 20, text: 'What is the name of the highest mountain in Japan?', options: { a: 'Mount Takao', b: 'Mount Fuji', c: 'Mount Aso', d: 'Mount Rokko' }, answer: 'b' }
  ]
};

// --- WAITING ROOM COMPONENT (Không thay đổi) ---
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


// --- QUIZ SCREEN COMPONENT (Logic không đổi) ---
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
          <h5 className="question-nav-title">Question List</h5>
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
                  {questionIndex + 1}
                </button>
              );
            })}
          </div>
          <div className="nav-pagination">
            <button onClick={() => setNavPage(p => Math.max(0, p - 1))} disabled={navPage === 0}>
              {'«'}
            </button>
            <span>Page {navPage + 1} of {pageCount}</span>
            <button onClick={() => setNavPage(p => Math.min(pageCount - 1, p + 1))} disabled={navPage === pageCount - 1}>
              {'»'}
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