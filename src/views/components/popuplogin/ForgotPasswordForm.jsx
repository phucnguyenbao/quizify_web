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

      <button className="link-button" onClick={onResendEmail}>Send email</button>

      <div className="action-group">
        <button className="secondary-btn" onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
