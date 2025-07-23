// src/components/SettingForm.jsx

import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/services';

const SettingForm = ({
  uid, 
  sound, setSound,
  theme, setTheme,
  music, setMusic,
  reportContent, setReportContent,
  handleSubmitReport, handleUploadMusic
}) => {
  const [language, setLanguage] = useState('Japanese');

  // Hàm cập nhật Firestore
  const updateSetting = async (field, value) => {
    if (!uid) {
      console.error('No member_id provided. Cannot update Firestore.');
      return;
    }
    try {
      const docRef = doc(db, 'user', uid); // Dùng đúng collection + member_id làm doc id
      await updateDoc(docRef, { [field]: value });
      console.log(`✅ Updated ${field} to ${value} in Firestore`);
    } catch (err) {
      console.error(`❌ Failed to update ${field}:`, err);
    }
  };

  return (
    <div className="setting-content">
      <div className="setting-video">
        <video src="/assets/images/setting.mp4" autoPlay muted loop playsInline />
      </div>

      <div className="setting-form">
        <div className="form-group">
          <label>Background Sound</label>
          <select
            value={sound}
            onChange={(e) => {
              const value = e.target.value;
              setSound(value);
              updateSetting('background_sound', value);
            }}
            className={`select-sound ${sound === 'On' ? 'sound-on' : 'sound-off'}`}
          >
            <option value="Off">Off</option>
            <option value="On">On</option>
          </select>
        </div>

        <div className="form-group">
          <label>Music</label>
          <div className="music-select-group">
            <select
              value={music}
              onChange={(e) => {
                const value = e.target.value;
                setMusic(value);
                updateSetting('music', value);
              }}
              className="music-select"
            >
              <option value="Thien Ly Oi">Thien Ly Oi</option>
              <option value="Dom Dom">Dom Dom</option>
              <option value="Hong Nhan">Hong Nhan</option>
            </select>
            <button className="upload-music-btn" onClick={handleUploadMusic}>Upload</button>
          </div>
        </div>

        <div className="form-group">
          <label>Language</label>
          <select
            value={language}
            onChange={(e) => {
              const value = e.target.value;
              setLanguage(value);
              updateSetting('language', value);
            }}
            className="language-select"
          >
            <option value="Japanese">Japanese</option>
            <option value="Vietnamese">Vietnamese</option>
          </select>
        </div>

        <div className="form-group">
          <label>Theme</label>
          <select
            value={theme}
            onChange={(e) => {
              const value = e.target.value;
              setTheme(value);
              updateSetting('theme', value);
            }}
            className={`select-theme ${theme === 'Light' ? 'theme-white' : 'theme-black'}`}
          >
            <option value="Dark">Dark</option>
            <option value="Light">Light</option>
          </select>
        </div>

        <div className="form-group">
          <label>Report</label>
          <input
            type="text"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="Enter report content"
          />
        </div>

        <div className="form-buttons">
          <button className="button-submit" onClick={handleSubmitReport}>Submit</button>
          <button className="button-cancel" onClick={() => setReportContent('')}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SettingForm;
