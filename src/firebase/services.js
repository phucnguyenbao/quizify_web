import app from './config';
import { getAuth } from 'firebase/auth';

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    runTransaction, 
    increment 
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    runTransaction,
    increment
};