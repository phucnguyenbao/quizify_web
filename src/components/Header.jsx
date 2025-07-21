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
              date: new Date(data.registration_date.seconds * 1000).toLocaleDateString('en-US'),
              role: data.manager ? 'Manager' : (data.leader ? 'Leader' : 'Member'),
              avatarId: data.avatar_id || 12
            };
            setUserData(formatted);
            setEditData(formatted);
          } else {
            console.error('User data not found in Firestore.');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
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
      const newAvatarId = Math.floor(Math.random() * 70) + 1;
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

  const avatar = `https://i.pravatar.cc/150?img=${editData.avatarId}`;

  return (
    <header className="header">
      <nav>
        <div className="navbar">
          <div className="nav-left-group">
          <div className="nav-left">
    <li>
      <NavLink to="/game" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
        <img src="/assets/images/logo2.png" alt="Logo" className="game-logo" />
        <span className="logo-text">Quizify</span>
      </NavLink>
    </li>
          </div>
          <div className="nav-left">
    <li>
      <NavLink to="/game" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
        <ListTodo size={16}/> Game
      </NavLink>
    </li>
    <li>
      <NavLink to="/quiz" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
        <ListTodo size={16}/> Quiz
      </NavLink>
    </li>
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
</div>
          <div className="nav-right">
  <li>
    <NavLink to="/setting" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
      <Settings size={16}/> Reports
    </NavLink>
  </li>
            <li>
              <img src={avatar} alt="Avatar" className="avatar" onClick={() => setShowPopup(prev => !prev)} />
              {showPopup && (
                <div className="profile-popup" ref={popupRef}>
                  <div className="popup-content">
                    <div className="info-left">
                      <h4>Profile Information</h4>
                      <p><strong>Employee ID:</strong> {userData.id}</p>

                      {isEditing ? (
                        <>
                          <p><strong>Last Name:</strong> <input name="lastName" value={editData.lastName} onChange={handleEditChange} /></p>
                          <p><strong>First & Middle Name:</strong> <input name="firstName" value={editData.firstName} onChange={handleEditChange} /></p>
                          <p><strong>Phone:</strong> <input name="phone" value={editData.phone} onChange={handleEditChange} /></p>
                          <p><strong>Email:</strong> <input name="email" value={editData.email} onChange={handleEditChange} /></p>
                        </>
                      ) : (
                        <>
                          <p><strong>Last Name:</strong> {userData.lastName}</p>
                          <p><strong>First & Middle Name:</strong> {userData.firstName}</p>
                          <p><strong>Phone:</strong> {userData.phone}</p>
                          <p><strong>Email:</strong> {userData.email}</p>
                        </>
                      )}

                      <p><strong>Registration Date:</strong> {userData.date}</p>
                      <p><strong>Role:</strong> {userData.role}</p>

                      <div className="popup-actions">
                        {!isEditing ? (
                          <button className="save-btn" onClick={() => setIsEditing(true)}>Edit</button>
                        ) : (
                          <>
                            <button className="save-btn" onClick={handleSave}>Save</button>
                            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="info-right">
                      <p>Welcome <strong>{userData.lastName}</strong></p>
                      <img src={avatar} alt="avatar" className="avatar-large" />
                      {isEditing && (
                        <label className="upload-label">
                          Change Avatar
                          <input type="file" onChange={handleAvatarChange} hidden />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="logout-section">
                    <button className="logout-btn" onClick={handleLogout}>
                      <LogOut size={16} style={{ marginRight: '6px' }} />
                      Logout
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
