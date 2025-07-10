// src/views/TestFirebase.jsx
import React, { useState } from 'react';
import { auth } from '../firebase/services';
import { signInWithEmailAndPassword } from 'firebase/auth';

function TestFirebase() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setMsg("✅ Đăng nhập thành công! User ID: " + userCred.user.uid);
    } catch (err) {
      setMsg("❌ Lỗi: " + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Test Firebase Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /><br />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" /><br />
      <button onClick={handleLogin}>Đăng nhập test</button>
      <p>{msg}</p>
    </div>
  );
}

export default TestFirebase;
