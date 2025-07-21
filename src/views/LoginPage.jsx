import React, { useState } from 'react';
import { auth } from '../firebase/services';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Login.css';

const LoginPage = () => {
  const [isForgot, setIsForgot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // States for form fields
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 const navigate = useNavigate();
const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Đăng nhập thành công!');
    navigate('/game'); // Chuyển đến trang /game
  } catch (err) {
    alert('Lỗi đăng nhập: ' + err.message);
  }
}

  const handleForgotPassword = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert('Đã gửi email khôi phục!');
        setIsForgot(false);
      } catch (err) {
        alert('Lỗi: ' + err.message);
      }
    } else {
      alert('Vui lòng nhập email.');
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận không khớp!');
      return;
    }
    if (!email || !phone || !newPassword) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    alert('Đổi mật khẩu thành công (mô phỏng)');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">Your Logo</div>
        <h2>{isForgot ? 'QUÊN MẬT KHẨU' : 'ĐĂNG NHẬP'}</h2>

        <div className="form-container">

          {!isForgot ? (
            <>
              <div className="form-group">
                <label>Email / SĐT</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Nhập email hoặc số điện thoại" />
              </div>

              <div className="form-group">
                <label>Mật khẩu</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Nhập mật khẩu" />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Nhập email đã đăng ký" />
              </div>

              <div className="form-group">
                <label>SĐT</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Nhập số điện thoại" />
              </div>

              <div className="form-group">
                <label>Mật khẩu mới</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Nhập mật khẩu mới" />
              </div>

              <div className="form-group">
                <label>Xác nhận</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu mới" />
              </div>

              <button className="link-button" onClick={handleForgotPassword}>Gửi lại email</button>
            </>
          )}
        </div>

        <div className="action-group">
          {!isForgot ? (
            <>
              <button className="primary-btn" onClick={handleLogin}>Xác nhận</button>
              <button className="link-button" onClick={() => setIsForgot(true)}>Quên mật khẩu?</button>
            </>
          ) : (
            <>
              <button className="primary-btn" onClick={handleChangePassword}>Xác nhận</button>
              <button className="secondary-btn" onClick={() => setIsForgot(false)}>Huỷ</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
