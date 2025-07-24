import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../../firebase/services';
import { setPersistence, browserSessionPersistence, onAuthStateChanged } from 'firebase/auth';

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const applyPersistenceAndCheckAuth = async () => {
      try {
        // ✅ Set session-only persistence (chỉ giữ trong tab hiện tại)
        await setPersistence(auth, browserSessionPersistence);

        // ✅ Sau đó theo dõi đăng nhập
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('❌ Failed to set session persistence:', error);
        setLoading(false);
      }
    };

    const unsubscribePromise = applyPersistenceAndCheckAuth();

    // Cleanup nếu cần
    return () => {
      unsubscribePromise.then((unsub) => typeof unsub === 'function' && unsub());
    };
  }, []);

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
