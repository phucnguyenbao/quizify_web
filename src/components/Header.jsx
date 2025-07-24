import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/services';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Settings, Gamepad2, Users, ListTodo, Shield } from 'lucide-react';
import '../assets/css/Header.css';
import ProfilePopup from './components/ProfilePopup';
import { useAuth } from '../views/AuthContext';

function Header() {
  const { user } = useAuth();
  const isManager = user?.manager === true;
  const isLeader = user?.leader === true;
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.member_id) return;

      try {
        const docRef = doc(db, 'user', user.member_id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const formatted = {
            id: data.member_id,
            firstName: data.middle_and_last_name,
            lastName: data.member_name,
            phone: data.phone_number,
            email: data.email,
            date: new Date(data.registration_date.seconds * 1000).toLocaleDateString('en-US'),
            role: data.manager ? 'Manager' : (data.leader ? 'Leader' : 'Member'),
            imageId: data.image_id || 'dolphin.png'
          };
          setUserData(formatted);
          setEditData(formatted);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, [user?.member_id]);

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

  // ✅ Xử lý upload ảnh lên server + set imageId
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", userData.id);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setEditData(prev => ({
          ...prev,
          imageId: data.filename
        }));
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'user', user.member_id);
      await updateDoc(docRef, {
        member_name: editData.lastName,
        middle_and_last_name: editData.firstName,
        phone_number: editData.phone,
        email: editData.email,
        image_id: editData.imageId
      });
      setUserData(editData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update profile.');
    }
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  if (!userData) return null;

  const image = `/assets/images/image/${isEditing ? editData.imageId : userData.imageId}`;

  return (
    <header className="header">
      <nav>
        <div className="navbar">
          <div className="nav-left-group">

            <div className="nav-left">
              <li>
                <NavLink to="/game">
                  <img src="/assets/images/logo2.png" alt="Logo" className="game-logo" />
                  <img src="/assets/images/quizify.png" alt="Quizify" className="game-quizify" />
                </NavLink>
              </li>
            </div>

            <div className="nav-left">
              <li>
                <NavLink to="/game" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
                  <Gamepad2 size={16}/> Game
                </NavLink>
              </li>
                {(isManager || isLeader) && (
                  <li>
                    <NavLink to="/quiz" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
                      <ListTodo size={16}/> Quiz
                    </NavLink>
                  </li>
                )}
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
                  <Users size={16}/> Members
                </NavLink>
              </li>
              <li>
                <NavLink to="/role" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
                  <Shield size={16}/> Roles
                </NavLink>
              </li>
            </div>

            <div className="navbar-center">
              <span className="welcome-text">Every click brings you closer to victory !</span>
            </div>
          </div>

          <div className="nav-right">
            <li>
              <NavLink to="/setting" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
                <Settings size={16}/> Reports
              </NavLink>
            </li>

            <li>
              <img
                src={image}
                alt="Avatar"
                className="avatar"
                onClick={() => setShowPopup(prev => !prev)}
              />
              {showPopup && (
                <div ref={popupRef}>
                  <ProfilePopup
                    userData={userData}
                    editData={editData}
                    setEditData={setEditData}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    handleEditChange={handleEditChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    handleLogout={handleLogout}
                    handleImageChange={handleAvatarUpload} // ✅ truyền function upload ảnh
                  />
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
