import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/services';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LogOut, Settings, Users, Gamepad2, ListTodo, Shield } from 'lucide-react';
import '../assets/css/Header.css';

function Header() {
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'user', '0001');
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const formatted = {
              id: data.member_id,
              firstName: data.middle_and_last_name,
              lastName: data.member_name,
              phone: data.phone_number,
              email: data.email,
              date: new Date(data.registration_date.seconds * 1000).toLocaleDateString('vi-VN'),
              role: data.manager ? 'Manager' : (data.leader ? 'Leader' : 'Member'),
              avatarId: data.avatar_id || 12
            };
            setUserData(formatted);
            setEditData(formatted);
          } else {
            console.error('User data not found in Firestore.');
          }
        } catch (err) {
          console.error('Lỗi khi lấy dữ liệu user:', err);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
        setIsEditing(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAvatarId = Math.floor(Math.random() * 70) + 1; // Random avatar (pravatar hỗ trợ 1-70)
      setEditData(prev => ({ ...prev, avatarId: newAvatarId }));
    }
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'user', '0001');
      await updateDoc(docRef, {
        member_name: editData.lastName,
        middle_and_last_name: editData.firstName,
        phone_number: editData.phone,
        email: editData.email,
        avatar_id: editData.avatarId
      });
      setUserData(editData);
      setIsEditing(false);
      alert('Cập nhật thông tin thành công!');
    } catch (err) {
      console.error('Lỗi khi cập nhật:', err);
      alert('Lỗi khi cập nhật thông tin.');
    }
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  if (!userData) return null;

  const avatar = `https://i.pravatar.cc/150?img=${editData.avatarId}`;

  return (
    <header className="header">
      <nav>
        <div className="navbar">
          <div className="nav-left">
            <li><NavLink to="/game"><Gamepad2 size={16}/> Game</NavLink></li>
            <li><NavLink to="/quiz"><ListTodo size={16}/> Quiz</NavLink></li>
            <li><NavLink to="/"><Users size={16}/> Thành viên</NavLink></li>
            <li><NavLink to="/role"><Shield size={16}/> Phân quyền</NavLink></li>
          </div>

          <div className="nav-right">
            <li><NavLink to="/setting"><Settings size={16}/> Báo cáo</NavLink></li>
            <li>
              <img src={avatar} alt="Avatar" className="avatar" onClick={() => setShowPopup(prev => !prev)} />
              {showPopup && (
                <div className="profile-popup" ref={popupRef}>
                  <div className="popup-content">
                    <div className="info-left">
                      <h4>Thông tin cá nhân</h4>
                      <p><strong>Mã nhân viên:</strong> {userData.id}</p>

                      {isEditing ? (
                        <>
                          <p><strong>Tên:</strong> <input name="lastName" value={editData.lastName} onChange={handleEditChange} /></p>
                          <p><strong>Họ và tên đệm:</strong> <input name="firstName" value={editData.firstName} onChange={handleEditChange} /></p>
                          <p><strong>SĐT:</strong> <input name="phone" value={editData.phone} onChange={handleEditChange} /></p>
                          <p><strong>Email:</strong> <input name="email" value={editData.email} onChange={handleEditChange} /></p>
                        </>
                      ) : (
                        <>
                          <p><strong>Tên:</strong> {userData.lastName}</p>
                          <p><strong>Họ và tên đệm:</strong> {userData.firstName}</p>
                          <p><strong>SĐT:</strong> {userData.phone}</p>
                          <p><strong>Email:</strong> {userData.email}</p>
                        </>
                      )}

                      <p><strong>Ngày đăng ký:</strong> {userData.date}</p>
                      <p><strong>Role:</strong> {userData.role}</p>

                      <div className="popup-actions">
                        {!isEditing ? (
                          <button className="save-btn" onClick={() => setIsEditing(true)}>Sửa</button>
                        ) : (
                          <>
                            <button className="save-btn" onClick={handleSave}>Lưu</button>
                            <button className="cancel-btn" onClick={handleCancel}>Hủy</button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="info-right">
                      <p>Chào mừng <strong>{userData.lastName}</strong></p>
                      <img src={avatar} alt="avatar" className="avatar-large" />
                      {isEditing && (
                        <label className="upload-label">
                          Chọn ảnh
                          <input type="file" onChange={handleAvatarChange} hidden />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="logout-section">
                    <button className="logout-btn" onClick={handleLogout}>
                      <LogOut size={16} style={{ marginRight: '6px' }} />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </li>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
