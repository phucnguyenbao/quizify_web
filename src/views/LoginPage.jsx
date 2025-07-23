import React, { useState } from 'react';
import { auth } from '../firebase/services';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css';

import LoginForm from './components/popuplogin/LoginForm';
import ForgotPasswordForm from './components/popuplogin/ForgotPasswordForm';

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
        alert('Password reset email sent! Please check your inbox.');
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
        <div className="logo-container">
          <img src="/assets/images/logo2.png" alt="Logo" className="game-logo" />
          <img src="/assets/images/quizify.png" alt="Quizify" className="game-quizify" />
        </div>

        <h2>{isForgot ? 'FORGOT PASSWORD' : 'LOGIN'}</h2>

        <div className="form-container">
          {isForgot ? (
            <ForgotPasswordForm
              email={email} setEmail={setEmail}
              phone={phone} setPhone={setPhone}
              newPassword={newPassword} setNewPassword={setNewPassword}
              confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
              onChangePassword={handleChangePassword}
              onResendEmail={handleForgotPassword}
              onCancel={() => setIsForgot(false)}
            />
          ) : (
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onLogin={handleLogin}
              onForgot={() => setIsForgot(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
