// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/services';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return setUser(null);

      try {
        const q = query(
          collection(db, 'user'),
          where('email', '==', firebaseUser.email)
        );
        const snapshot = await getDocs(q);

        let member_id = null;

        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          member_id = docData.member_id ?? null;
          console.log("✅ [Firestore] member_id:", member_id);
        } else {
          console.warn("⚠️ Không tìm thấy document với email:", firebaseUser.email);
        }

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          member_id: member_id,
        });
      } catch (error) {
        console.error("❌ Lỗi khi lấy member_id từ Firestore:", error);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          member_id: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
