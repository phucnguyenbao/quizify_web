// src/components/LoginForm.jsx
import React from 'react';

const LoginForm = ({ email, setEmail, password, setPassword, onLogin, onForgot }) => {
  return (
    <>
      <div className="form-group">
        <label>Email / Phone</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email or phone number"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      <div className="action-group">
        <button className="primary-btn" onClick={onLogin}>Confirm</button>
        <button className="link-button" onClick={onForgot}>Forgot password?</button>
      </div>
    </>
  );
};

export default LoginForm;
