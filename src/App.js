import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GamePage from './views/GamePage';
import QuizPage from './views/QuizPage';
import RolePage from './views/RolePage';
import SettingPage from './views/SettingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './views/LoginPage';
import UserPage from './views/UserPage';
import PrivateRoute from './views/components/popuplogin/PrivateRouter';
import { AuthProvider } from './views/AuthContext';

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const [sound, setSound] = useState('Off');
  const [music, setMusic] = useState('');
  const [language, setLanguage] = useState('English');
  const [reportContent, setReportContent] = useState('');

  const handleSubmitReport = () => {
    console.log('Report submitted:', reportContent);
  };

  const handleUploadMusic = () => {
    console.log('Upload music clicked');
  };

  return (
    <>
      {/* ✅ Hiển thị Header nếu KHÔNG phải trang login */}
      {!isLoginPage && <Header />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/game"
          element={
            <PrivateRoute>
              <GamePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/role"
          element={
            <PrivateRoute>
              <RolePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/setting"
          element={
            <PrivateRoute>
              <SettingPage
                sound={sound}
                setSound={setSound}
                music={music}
                setMusic={setMusic}
                language={language}
                setLanguage={setLanguage}
                reportContent={reportContent}
                setReportContent={setReportContent}
                handleSubmitReport={handleSubmitReport}
                handleUploadMusic={handleUploadMusic}
              />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* ✅ Footer cũng ẩn ở trang login nếu muốn */}
      {!isLoginPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
