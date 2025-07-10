import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Header.css';  // nếu có CSS riêng

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/game">Quản lý game</Link></li>
            <li><Link to="/quiz">Quản lý quiz</Link></li>
            <li><Link to="/user">Quản lý thành viên</Link></li>
            <li><Link to="/role">Quản lý phân quyền</Link></li>
            <li><Link to="/setting">Quản lý báo cáo và cài đặt</Link></li>
            <li><Link to="/login">Đăng xuất</Link></li>


          
        </ul>
      </nav>
    </header>
  );
}

export default Header;
