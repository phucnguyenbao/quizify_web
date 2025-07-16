import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/Header.css';
import { LogOut, Settings, Users, Gamepad2, ListTodo, Shield } from 'lucide-react';

function Header() {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();
const [avatar, setAvatar] = useState('https://i.pravatar.cc/150?img=32');
const [isEditing, setIsEditing] = useState(false);
const [profile, setProfile] = useState({
  id: '2211762',
  firstName: 'Trịnh Trần Phương',
  lastName: 'Tuấn',
  phone: '344343334',
  email: 'tuantran@gmail.com',
  date: '23/04/2025',
  role: 'User'
});
const handleChange = (e) => {
  const { name, value } = e.target;
  setProfile(prev => ({
    ...prev,
    [name]: value
  }));
};

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
            {/* <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}><LogOut size={16}/> Đăng xuất</NavLink></li> */}
            <li>
              <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="avatar" onClick={togglePopup} />
              {showPopup && (
                <div className="profile-popup" ref={popupRef}>
                  <div className="popup-content">
                    <div className="popup-content">
  <div className="info-left">
    <h4>Thông tin cá nhân</h4>
    <p><strong>Mã nhân viên:</strong> {profile.id}</p>

    {isEditing ? (
      <>
        <p><strong>Tên:</strong> <input name="lastName" value={profile.lastName} onChange={handleChange} /></p>
        <p><strong>Họ và tên đệm:</strong> <input name="firstName" value={profile.firstName} onChange={handleChange} /></p>
        <p><strong>SĐT:</strong> <input name="phone" value={profile.phone} onChange={handleChange} /></p>
        <p><strong>Email:</strong> <input name="email" value={profile.email} onChange={handleChange} /></p>
      </>
    ) : (
      <>
        <p><strong>Tên:</strong> {profile.lastName}</p>
        <p><strong>Họ và tên đệm:</strong> {profile.firstName}</p>
        <p><strong>SĐT:</strong> {profile.phone}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </>
    )}

    <p><strong>Ngày đăng ký:</strong> {profile.date}</p>
    <p><strong>Role:</strong> {profile.role}</p>

    <div className="popup-actions">
      {!isEditing ? (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Sửa</button>
      ) : (
        <>
          <button className="save-btn" onClick={() => setIsEditing(false)}>Lưu</button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>Hủy</button>
        </>
      )}
    </div>
    <div className="logout-section">
  <NavLink to="/login" className="logout-btn">
    <LogOut size={16} style={{ marginRight: '6px' }} />
    Đăng xuất
  </NavLink>
</div>

  </div>

<div className="info-right">
  <p>Chào mừng <strong>{profile.lastName}</strong></p>
  <div className="avatar-preview">
    <img src={avatar} alt="avatar" className="avatar-large" />
    {isEditing && (
      <label className="upload-label">
        Chọn ảnh
        <input type="file" onChange={handleAvatarChange} hidden />
      </label>
    )}
  </div>
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
