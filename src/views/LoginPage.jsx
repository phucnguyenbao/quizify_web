import React, { useState } from 'react';
import { auth } from '../firebase/services'; // Đảm bảo đường dẫn này chính xác
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

function LoginPage() {
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Đăng nhập thành công:", userCred.user);
      // Chuyển hướng người dùng đến trang chính sau khi đăng nhập thành công
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.message);
      alert("Lỗi đăng nhập: " + err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Một email khôi phục mật khẩu đã được gửi đến địa chỉ email của bạn!");
        setIsForgot(false); // Quay lại màn hình đăng nhập sau khi gửi email
      } catch (err) {
        console.error("Lỗi khi gửi email khôi phục:", err.message);
        alert("Lỗi: " + err.message);
      }
    } else {
      alert("Vui lòng nhập địa chỉ email của bạn.");
    }
  };

  // Hàm xử lý việc đổi mật khẩu (backend chưa tích hợp)
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và mật khẩu xác nhận không khớp!");
      return;
    }
    if (!email || !phone || !newPassword) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    // Nơi bạn sẽ gọi API backend để đổi mật khẩu
    alert('Xác nhận đổi mật khẩu (chức năng backend chưa được kết nối)');
  }

  // ---- STYLES ----
  const containerStyle = {
    position: 'relative',
    border: '1px solid blue',
    width: '90%',
    maxWidth: '900px',
    height: '400px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif'
  };

  const logoStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    fontWeight: 'bold'
  };

  const titleStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'blue',
    margin: 0
  };

  const formContainerStyle = {
    position: 'absolute',
    top: '80px',
    left: '20px',
  };

  const inputGroupStyle = {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    width: '400px'
  };

  const labelStyle = {
    width: '180px', // Đặt chiều rộng cố định cho label
    minWidth: '180px',
  };

  const footerStyle = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  };

  const buttonStyle = {
    padding: '8px 16px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e6f0ff',
    borderColor: 'orange'
  };

  const linkStyle = {
    color: 'blue',
    cursor: 'pointer',
    textDecoration: 'underline'
  }


  return (
    <div style={containerStyle}>
      <div style={logoStyle}>Logo</div>
      <h2 style={titleStyle}>{isForgot ? 'QUÊN MẬT KHẨU' : 'ĐĂNG NHẬP'}</h2>

      <div style={formContainerStyle}>
        {!isForgot ? (
          // --- Form Đăng nhập ---
          <>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Số điện thoại hoặc Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Nhập email hoặc số điện thoại"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Mật khẩu</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Nhập mật khẩu"
              />
            </div>
          </>
        ) : (
          // --- Form Quên mật khẩu ---
          <>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Nhập email đã đăng ký"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Số điện thoại</label>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Mật khẩu mới</label>
              <input
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                type="password"
                placeholder="Nhập mật khẩu mới"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Xác nhận mật khẩu mới</label>
              <input
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
            <a href="#" onClick={handleForgotPassword} style={{ ...linkStyle, marginLeft: '180px' }}>Gửi lại</a>
          </>
        )}
      </div>

      <div style={footerStyle}>
        {!isForgot ? (
          // --- Footer Đăng nhập ---
          <>
            <button onClick={handleLogin} style={primaryButtonStyle}>Xác nhận</button>
            <a href="#" onClick={() => setIsForgot(true)} style={linkStyle}>Quên mật khẩu</a>
          </>
        ) : (
          // --- Footer Quên mật khẩu ---
          <>
            <button onClick={handleChangePassword} style={primaryButtonStyle}>Xác nhận</button>
            <button onClick={() => setIsForgot(false)} style={buttonStyle}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;