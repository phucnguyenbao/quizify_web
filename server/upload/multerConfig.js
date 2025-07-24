// server/upload/multerConfig.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/assets/images/image')); // tạo thư mục này nếu chưa có
  },
filename: (req, file, cb) => {
  cb(null, file.originalname); // ✅ giữ nguyên tên gốc
},
});

const upload = multer({ storage });
module.exports = upload;
