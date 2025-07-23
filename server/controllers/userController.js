const uploadAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  return res.status(200).json({ success: true, filename: req.file.filename });
};

module.exports = { uploadAvatar };
