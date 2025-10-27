// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDo3BtLFoYt8Uv5Nbfls_J17H3Epqw7Kpg",
    authDomain: "molecular-genetic-curriculum.firebaseapp.com",
    projectId: "molecular-genetic-curriculum",
    storageBucket: "molecular-genetic-curriculum.firebasestorage.app",
    messagingSenderId: "1065657693983",
    appId: "1:1065657693983:web:369dcb74b3625ce8fda22a",
    measurementId: "G-R7LFX0ZBBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
