// src/firebase/services.js
import app from './config';
import { getAuth } from 'firebase/auth';
// UPDATE: Thêm các hàm cần thiết cho transaction
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    runTransaction, // <--- THÊM MỚI
    increment // <--- THÊM MỚI
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
// UPDATE: Export thêm các hàm mới
export {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    runTransaction,
    increment
};