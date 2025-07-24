// src/firebase/services.js

// Import 'app' MỘT LẦN DUY NHẤT từ file config
import app from './config';
import { getAuth } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc, // Thêm updateDoc để dùng ở các component khác
    query,
    orderBy,
    limit,
    writeBatch
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Khởi tạo các service
export const auth = getAuth(app);
export const db = getFirestore(app); // Sử dụng 'db' thay vì 'firestore' để đồng nhất
export const storage = getStorage(app);
export const firestore = getFirestore(app); // Thêm dòng này

// Export các hàm để sử dụng trong toàn bộ dự án
export {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc, // Thêm updateDoc vào export
    query,
    orderBy,
    limit,
    writeBatch
};