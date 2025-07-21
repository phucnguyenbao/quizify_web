import React, { useState } from "react";
import "../assets/css/LoginPage.css"; // Import file CSS mới
import { auth } from "../firebase/services";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

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

  // Chuyển đổi giữa các form
  const toggleForm = (showForgot) => {
    setIsForgot(showForgot);
    setError(""); // Xóa lỗi khi chuyển form
    // Reset các trường input
    setEmail('');
    setPhone('');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Đăng nhập thành công:", userCred.user);
      // Chuyển hướng người dùng sau khi đăng nhập thành công
    } catch (err) {
      setError("Email hoặc mật khẩu không chính xác. Vui lòng thử lại.");
      console.error("Lỗi đăng nhập:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Vui lòng nhập email đã đăng ký.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      // Logic cho việc reset mật khẩu với SĐT và Mật khẩu mới (cần backend)
      if (newPassword !== confirmPassword) {
        setError("Mật khẩu mới và mật khẩu xác nhận không khớp!");
        setIsLoading(false);
        return;
      }
      console.log("Đang xử lý yêu cầu đổi mật khẩu cho:", { email, phone });
      alert("Chức năng đổi mật khẩu đang được phát triển!");
      // Nơi bạn sẽ gọi API backend
      // Sau khi thành công:
      // toggleForm(false);

    } catch (err) {
      setError("Đã xảy ra lỗi khi cố gắng đổi mật khẩu.");
      console.error("Lỗi đổi mật khẩu:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm này chỉ để gửi email reset, tách biệt với form đổi mật khẩu
  const sendResetEmail = async () => {
    if (!email) {
      alert("Vui lòng nhập email vào ô Email để nhận link khôi phục.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert(`Một email khôi phục mật khẩu đã được gửi đến ${email}!`);
    } catch (err) {
      alert("Lỗi khi gửi email: " + err.message);
    }
  }


  return (
    <div className="page-container">
      <div className="form-box">
        <div className="form-header">
          <span className="logo">Logo</span>
          <h2 className="title">{isForgot ? 'QUÊN MẬT KHẨU' : 'ĐĂNG NHẬP'}</h2>
        </div>

        {/* --- Form content --- */}
        <div className="form-content">
          {!isForgot ? (
            // --- Form Đăng nhập ---
            <>
              <div className="form-group">
                <label>Số điện thoại hoặc Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Nhập email hoặc số điện thoại"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  disabled={isLoading}
                />
              </div>
            </>
          ) : (
            // --- Form Quên mật khẩu ---
            <>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Nhập email đã đăng ký"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  disabled={isLoading}
                />
              </div>
              <div className="resend-link-container">
                <button onClick={sendResetEmail} className="link-button">Gửi lại link qua Email</button>
              </div>
            </>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>

        {/* --- Footer buttons --- */}
        <div className="form-footer">
          {!isForgot ? (
            <>
              <button onClick={() => toggleForm(true)} className="link-button">
                Quên mật khẩu
              </button>
              <button onClick={handleLogin} className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Xác nhận"}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => toggleForm(false)} className="btn btn-secondary" disabled={isLoading}>
                Cancel
              </button>
              <button onClick={handlePasswordReset} className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Xác nhận"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;