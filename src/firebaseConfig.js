// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDsYk3Y7RyZaMHccrAEA2f_6i0OS1lJf_8",
    authDomain: "ecommerce-c97fb.firebaseapp.com",
    projectId: "ecommerce-c97fb",
    storageBucket: "ecommerce-c97fb.appspot.com",
    messagingSenderId: "668677823428",
    appId: "1:668677823428:web:6d3a1459bb495728a66291",
    measurementId: "G-4ZZGCZEQZY"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };







