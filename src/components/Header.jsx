import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/Header.css';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="navbar">
          <div className="nav-left">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/game" className={({ isActive }) => (isActive ? 'active-link' : '')}>Quản lý game</NavLink>
            </li>
            <li>
              <NavLink to="/quiz" className={({ isActive }) => (isActive ? 'active-link' : '')}>Quản lý quiz</NavLink>
            </li>
            <li>
              <NavLink to="/user" className={({ isActive }) => (isActive ? 'active-link' : '')}>Quản lý thành viên</NavLink>
            </li>
            <li>
              <NavLink to="/role" className={({ isActive }) => (isActive ? 'active-link' : '')}>Quản lý phân quyền</NavLink>
            </li>
          </div>
          <div className="nav-right">
            <li>
              <NavLink to="/setting" className={({ isActive }) => (isActive ? 'active-link' : '')}>Quản lý báo cáo và cài đặt</NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>Đăng xuất</NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
