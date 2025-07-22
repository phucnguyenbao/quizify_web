// src/components/ProfilePopup.jsx
import React from 'react';
import { Camera, LogOut } from 'lucide-react';

const ProfilePopup = ({
  userData, editData, setEditData,
  isEditing, setIsEditing,
  handleEditChange, handleSave, handleCancel,
  handleAvatarChange, handleLogout
}) => {

  const avatar = `https://i.pravatar.cc/150?img=${editData.avatarId}`;

  return (
    <div className="profile-popup">

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
          <>
            <div className="avatar-upload">
              <input 
                type="file" 
                id="avatarUpload" 
                onChange={handleAvatarChange} 
                hidden 
              />
              <label htmlFor="avatarUpload" className="camera-icon">
                <Camera size={24} />
              </label>
            </div>

            <button
              className="library-button"
              onClick={() => {
                const newId = prompt("Enter avatar ID (1 - 70):", editData.avatarId);
                if (newId && +newId >= 1 && +newId <= 70) {
                  setEditData(prev => ({ ...prev, avatarId: +newId }));
                }
              }}
            >
              Choose
            </button>
          </>
        )}
      </div>

      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} style={{ marginRight: '6px' }} />
          Logout
        </button>
      </div>

    </div>
  );
};

export default ProfilePopup;
