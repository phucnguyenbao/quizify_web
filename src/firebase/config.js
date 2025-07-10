// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvOpQdF1qITEMAxeppRh3eADIjxXSxMnU",
  authDomain: "quizify-85595.firebaseapp.com",
  projectId: "quizify-85595",
  storageBucket: "quizify-85595.firebasestorage.app",
  messagingSenderId: "244812419750",
  appId: "1:244812419750:web:1e30c85570a4ab2dce9a67",
  measurementId: "G-HVZJ9PB1RQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
