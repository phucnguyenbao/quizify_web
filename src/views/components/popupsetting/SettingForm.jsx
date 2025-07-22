// src/components/SettingForm.jsx

import React from 'react';

const SettingForm = ({
  sound, setSound, theme, setTheme, music, setMusic,
  reportContent, setReportContent, handleSubmitReport, handleUploadMusic
}) => {
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
            onChange={(e) => setSound(e.target.value)}
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
              onChange={(e) => setMusic(e.target.value)}
              className="music-select"
            >
              <option value="">Choose music</option>
              <option value="Thien Ly Oi">Thien Ly Oi</option>
              <option value="Dom Dom">Dom Dom</option>
              <option value="Hong Nhan">Hong Nhan</option>
            </select>
            <button className="upload-music-btn" onClick={handleUploadMusic}>Upload</button>
          </div>
        </div>

        <div className="form-group">
          <label>Language</label>
          <select>
            <option>Japanese</option>
            <option>Vietnamese</option>
          </select>
        </div>

        <div className="form-group">
          <label>Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
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
