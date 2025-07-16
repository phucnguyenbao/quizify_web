import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/Header.css';
import { LogOut, Settings, Users, Gamepad2, ListTodo, Shield } from 'lucide-react'; // Sử dụng Lucide icon

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="navbar">
          <div className="nav-left">
            <li>
              <NavLink to="/game" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                <Gamepad2 size={16}/> Game
              </NavLink>
            </li>
            <li>
              <NavLink to="/quiz" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                <ListTodo size={16}/> Quiz
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                <Users size={16}/> Thành viên
              </NavLink>
            </li>
            <li>
              <NavLink to="/role" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                <Shield size={16}/> Phân quyền
              </NavLink>
            </li>
          </div>
          <div className="nav-right">
            <li>
              <NavLink to="/setting" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                <Settings size={16}/> Báo cáo
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                <LogOut size={16}/> Đăng xuất11111
              </NavLink>
            </li>
            <li>
              <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="avatar" />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
