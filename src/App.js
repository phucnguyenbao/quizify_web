import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
function App() {
  return (
    <AuthProvider> 
      <Router>
        <Header />
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
                <SettingPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
