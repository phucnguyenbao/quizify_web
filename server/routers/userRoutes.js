// server/routers/userRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../upload/multerConfig');
const uploadMusic = require('../upload/multerMusic');
// Route upload avatar
router.post('/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  res.status(200).json({
    success: true,
    filename: req.file.filename,
  });
});

router.post('/upload-music', uploadMusic.single('music'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  res.status(200).json({
    success: true,
    filename: req.file.filename,
  });
});
const fs = require('fs');
const path = require('path');

// Đường dẫn đến thư mục chứa nhạc
const musicDir = path.join(__dirname, '../../public/assets/images/music');

// Route lấy danh sách file nhạc
router.get('/music-list', (req, res) => {
  fs.readdir(musicDir, (err, files) => {
    if (err) {
      console.error('❌ Không thể đọc thư mục nhạc:', err);
      return res.status(500).json({ success: false, message: 'Không thể tải danh sách nhạc' });
    }

    // Lọc ra các file có đuôi .mp3
    const mp3Files = files.filter(file => file.toLowerCase().endsWith('.mp3'));
    res.status(200).json({ success: true, songs: mp3Files });
  });
});

module.exports = router;
