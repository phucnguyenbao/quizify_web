import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePage from './views/GamePage';
import QuizPage from './views/QuizPage';
import RolePage from './views/RolePage';
import SettingPage from './views/SettingPage';
import Header from './components/Header';
import LoginPage from './views/LoginPage'; // 1. Import LoginPage
import UserPage from './views/UserPage'; // Import UserPage nếu cần
function App() {
  return (
    <Router>
      {/* Header có thể được hiển thị có điều kiện tùy thuộc vào việc người dùng đã đăng nhập hay chưa */}
      <Header /> 
      <Routes>
        {/* 2. Thêm Route cho trang đăng nhập */}
        <Route path="/login" element={<LoginPage />} />1
        {/* Các Route hiện có của bạn */}
        <Route path="/user" element={<UserPage />} /> 

        <Route path="/game" element={<GamePage />} /> 
        <Route path="/quiz" element={<QuizPage />} /> 
        <Route path="/role" element={<RolePage />} /> 
        <Route path="/setting" element={<SettingPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;