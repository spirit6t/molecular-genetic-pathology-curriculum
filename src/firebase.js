// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
// Get these values from: https://console.firebase.google.com/ → Project Settings → General
// The message about "Firebase-provisioned API key... automatically restricted" is CORRECT and expected!
const firebaseConfig = {
    apiKey: "AIzaSyDo3BtLFoYt8Uv5Nbfls_J17H3Epqw7Kpg",                    // Copy from Firebase Console
    authDomain: "molecular-genetic-curriculum.firebaseapp.com",  // Copy from Firebase Console
    projectId: "molecular-genetic-curriculum",              // Copy from Firebase Console
    storageBucket: "molecular-genetic-curriculum.firebasestorage.app",     // Copy from Firebase Console
    messagingSenderId: "1065657693983",   // Copy from Firebase Console
    appId: "1:1065657693983:web:369dcb74b3625ce8fda22a"                       // Copy from Firebase Console
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;

