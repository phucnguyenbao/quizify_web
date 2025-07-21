import React, { useState } from 'react';
import { auth } from '../firebase/services';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css';

function LoginPage() {
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/game');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent!');
        setIsForgot(false);
      } catch (err) {
        alert('Error: ' + err.message);
      }
    } else {
      alert('Please enter your email.');
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match!');
      return;
    }
    if (!email || !phone || !newPassword) {
      alert('Please fill in all fields.');
      return;
    }
    alert('Password changed successfully (mock)');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">Your Logo</div>
        <h2>{isForgot ? 'FORGOT PASSWORD' : 'LOGIN'}</h2>

        <div className="form-container">
          {!isForgot ? (
            <>
              <div className="form-group">
                <label>Email / Phone</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email or phone number" />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your registered email" />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter your phone number" />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
              </div>

              <button className="link-button" onClick={handleForgotPassword}>Resend email</button>
            </>
          )}
        </div>

        <div className="action-group">
          {!isForgot ? (
            <>
              <button className="primary-btn" onClick={handleLogin}>Confirm</button>
              <button className="link-button" onClick={() => setIsForgot(true)}>Forgot password?</button>
            </>
          ) : (
            <>
              <button className="primary-btn" onClick={handleChangePassword}>Confirm</button>
              <button className="secondary-btn" onClick={() => setIsForgot(false)}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
