// src/components/ForgotPasswordForm.jsx
import React from 'react';

const ForgotPasswordForm = ({
  email, setEmail, phone, setPhone, newPassword, setNewPassword,
  confirmPassword, setConfirmPassword, onChangePassword, onResendEmail, onCancel
}) => {
  return (
    <>
      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your registered email"
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
        />
      </div>

      <button className="link-button" onClick={onResendEmail}>Resend email</button>

      <div className="action-group">
        <button className="primary-btn" onClick={onChangePassword}>Confirm</button>
        <button className="secondary-btn" onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
