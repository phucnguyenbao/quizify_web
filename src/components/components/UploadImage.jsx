import React, { useState } from 'react';
import { useAuth } from '../../views/AuthContext';

const ImageUploader = ({ onUploadSuccess }) => {
   const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        onUploadSuccess(data.filename); // gửi filename lên cha
        alert('Upload thành công!');
      } else {
        alert('Upload thất bại.');
      }
    } catch (err) {
      console.error('Lỗi upload:', err);
      alert('Lỗi kết nối server.');
    }
  };

  return (
    <div className="upload-box">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;
