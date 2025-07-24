const multer = require('multer');
const path = require('path');

const musicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/assets/images/music'));
  },
filename: (req, file, cb) => {
  cb(null, file.originalname); // ✅ giữ nguyên tên gốc
}
,
});

const uploadMusic = multer({ storage: musicStorage });
module.exports = uploadMusic;
