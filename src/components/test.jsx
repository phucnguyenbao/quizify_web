import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/services';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LogOut, Settings, Users, Gamepad2, ListTodo, Shield } from 'lucide-react';
import '../assets/css/Header.css';

function Header() {
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'user', '0001', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              id: data.member_id,
              firstName: data.middle_and_last_name,
              lastName: data.member_name,
              phone: data.phone_number,
              email: data.email,
              date: new Date(data.registration_date.seconds * 1000).toLocaleDateString(),
              role: data.manager ? 'Manager' : (data.leader ? 'Leader' : 'Member'),
              avatarId: data.avatar_id || 12
            });
          }
        } catch (err) {
          console.error("Lỗi khi lấy dữ liệu user:", err);
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
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (!userData) return null; // Khi chưa login, không hiển thị Header

  const avatar = `https://i.pravatar.cc/150?img=${userData.avatarId}`;

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
                      <p><strong>Tên:</strong> {userData.lastName}</p>
                      <p><strong>Họ và tên đệm:</strong> {userData.firstName}</p>
                      <p><strong>SĐT:</strong> {userData.phone}</p>
                      <p><strong>Email:</strong> {userData.email}</p>
                      <p><strong>Ngày đăng ký:</strong> {userData.date}</p>
                      <p><strong>Role:</strong> {userData.role}</p>
                    </div>

                    <div className="info-right">
                      <p>Chào mừng <strong>{userData.lastName}</strong></p>
                      <img src={avatar} alt="avatar" className="avatar-large" />
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
