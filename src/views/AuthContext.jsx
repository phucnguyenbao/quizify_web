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

        if (!snapshot.empty) {
          const docSnap = snapshot.docs[0];
          const docData = docSnap.data();

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            docId: docSnap.id,
            member_id: docData.member_id ?? null,
            member_name: docData.member_name ?? '',
            middle_and_last_name: docData.middle_and_last_name ?? '',
            phone_number: docData.phone_number ?? '',
            supervisor_id: docData.supervisor_id ?? '',
            team_id: docData.team_id ?? null,
            theme: docData.theme ?? 'Light',

            leader: docData.leader ?? false,
            manager: docData.manager ?? false,
            avatar_id: docData.image_id ?? '',

            music: docData.music || '',
            background_sound: docData.background_sound || '',
            language: docData.language || '',
          });

          console.log("✅ [Firestore] User loaded:", docData);
        } else {
          console.warn("⚠️ Không tìm thấy document với email:", firebaseUser.email);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            docId: null,
            member_id: null,
          });
        }

      } catch (error) {
        console.error("❌ Lỗi khi lấy user từ Firestore:", error);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          docId: null,
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
