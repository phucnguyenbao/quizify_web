import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestFirebase from './views/TestFirebase';
import SettingPage from './views/SettingPage'; // 👈 Thêm dòng này

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestFirebase />} />
        <Route path="/setting" element={<SettingPage />} /> {/* 👈 Thêm route mới */}
      </Routes>
    </Router>
  );
}

export default App;
