// src/firebase/services.js
import app from './config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
