import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/Header.css';
import { LogOut, Settings, Users, Gamepad2, ListTodo, Shield } from 'lucide-react';

function Header() {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();
const [avatar, setAvatar] = useState('https://i.pravatar.cc/150?img=32');

const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  }
};


  const togglePopup = () => setShowPopup(prev => !prev);

  // Đóng popup khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <nav>
        <ul className="navbar">
          <div className="nav-left">
            <li><NavLink to="/game" className={({ isActive }) => (isActive ? 'active-link' : '')}><Gamepad2 size={16}/> Game</NavLink></li>
            <li><NavLink to="/quiz" className={({ isActive }) => (isActive ? 'active-link' : '')}><ListTodo size={16}/> Quiz</NavLink></li>
            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}><Users size={16}/> Thành viên</NavLink></li>
            <li><NavLink to="/role" className={({ isActive }) => (isActive ? 'active-link' : '')}><Shield size={16}/> Phân quyền</NavLink></li>
          </div>
          <div className="nav-right">
            <li><NavLink to="/setting" className={({ isActive }) => (isActive ? 'active-link' : '')}><Settings size={16}/> Báo cáo</NavLink></li>
            <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}><LogOut size={16}/> Đăng xuất</NavLink></li>
            <li>
              <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="avatar" onClick={togglePopup} />
              {showPopup && (
                <div className="profile-popup" ref={popupRef}>
                  <div className="popup-content">
                    <div className="info-left">
                      <h4>Thông tin cá nhân</h4>
                      <p><strong>Mã nhân viên:</strong> 2211762</p>
                      <p><strong>Tên:</strong> Tuấn</p>
                      <p><strong>Họ:</strong> Trịnh Trần Phương</p>
                      <p><strong>SĐT:</strong> 344343334</p>
                      <p><strong>Email:</strong> tuantran@gmail.com</p>
                      <p><strong>Ngày đăng ký:</strong> 23/04/2025</p>
                      <p><strong>Role:</strong> User</p>
                      <div className="popup-actions">
                        <button className="save-btn">Lưu</button>
                        <button className="cancel-btn">Cancel</button>
                      </div>
                    </div>
<div className="info-right">
  <p>Chào mừng <strong>Tuấn</strong></p>
  <div className="avatar-preview">
    <img src={avatar} alt="avatar" className="avatar-large" />
    <label className="upload-label">
      Chọn ảnh
      <input type="file" onChange={handleAvatarChange} hidden />
    </label>
  </div>
</div>

                  </div>
                </div>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
