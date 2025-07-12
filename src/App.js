import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestFirebase from './views/TestFirebase';
import QuizPage from './views/QuizPage';
import RolePage from './views/RolePage';
import SettingPage from './views/SettingPage';
import Header from './components/Header';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TestFirebase />} />
        <Route path="/quiz" element={<QuizPage />} /> 
        <Route path="/role" element={<RolePage />} /> 
        <Route path="/setting" element={<SettingPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
