// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "resume-tool-637db.firebaseapp.com",
    projectId: "resume-tool-637db",
    storageBucket: "resume-tool-637db.appspot.com",
    messagingSenderId: "141697035353",
    appId: "1:141697035353:web:e574b8b318ae61d2b11548"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)