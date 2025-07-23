import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/services';
import { useTranslation } from 'react-i18next';

const SettingForm = ({
  uid, sound, setSound,
  music, setMusic,
  language, setLanguage,
  reportContent, setReportContent,
  handleSubmitReport, handleUploadMusic
}) => {
  const { t, i18n } = useTranslation();
  const [availableSongs] = useState([
    "yoursmile.mp3",
    "simplelove.mp3",
  ]);

  // 🔁 Tự đổi ngôn ngữ khi chọn language
  useEffect(() => {
    if (language === 'Vietnamese') i18n.changeLanguage('vi');
    else if (language === 'Japanese') i18n.changeLanguage('ja');
    else i18n.changeLanguage('en');
  }, [language, i18n]);

  const updateSetting = async (field, value) => {
    if (!uid) return;
    try {
      const docRef = doc(db, 'user', uid);
      await updateDoc(docRef, { [field]: value });
    } catch (err) {
      console.error(`Update failed:`, err);
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    updateSetting('language', lang);

    if (lang === 'Vietnamese') i18n.changeLanguage('vi');
    else if (lang === 'Japanese') i18n.changeLanguage('ja');
    else i18n.changeLanguage('en');
  };

  return (
    <div className="setting-content">
      <div className="setting-video">
        <video src="/assets/images/setting.mp4" autoPlay muted loop playsInline />
      </div>

      <div className="setting-form">
        {/* Sound select */}
        <div className="form-group">
          <label>{t('backgroundSound')}</label>
          <button
            onClick={() => {
              const newSound = sound === 'On' ? 'Off' : 'On';
              setSound(newSound);
              updateSetting('background_sound', newSound);
            }}
            className={`toggle-sound-btn ${sound === 'On' ? 'active' : ''}`}
          >
            {sound === 'On' ? t('on') : t('off')}
          </button>
        </div>

        {/* Music select */}
        <div className="form-group">
          <label>{t('music')}</label>
          <div className="music-select-group">
            <select
              value={availableSongs.includes(music) ? music : ''}
              onChange={(e) => {
                const value = e.target.value;
                setMusic(value);
                updateSetting('music', value);
              }}
            >
              <option value="">{t('selectMusic')}</option>
              {availableSongs.map((song) => (
                <option key={song} value={song}>
                  {song.replace('.mp3', '')}
                </option>
              ))}
            </select>
            <button onClick={handleUploadMusic}>{t('upload')}</button>
          </div>
        </div>

        {/* Language select */}
        <div className="form-group">
          <label>{t('language')}</label>
          <select
            value={language || 'Japanese'}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="Japanese">Japanese</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="English">English</option>
          </select>
        </div>

        {/* Report input */}
        <div className="form-group">
          <label>{t('report')}</label>
          <input
            type="text"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder={t('enterReport')}
          />
        </div>

        {/* Submit buttons */}
        <div className="form-buttons">
          <button onClick={handleSubmitReport}>{t('submit')}</button>
          <button onClick={() => setReportContent('')}>{t('cancel')}</button>
        </div>
      </div>
    </div>
  );
};

export default SettingForm;
