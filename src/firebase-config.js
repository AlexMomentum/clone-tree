// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth'; // If you're using Firebase Auth
import { getFirestore } from 'firebase/firestore'; // If you're using Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDochNwADV3RP32eDeSryks9u2YL7RlY80",
  authDomain: "clonetree-c99a5.firebaseapp.com",
  projectId: "clonetree-c99a5",
  storageBucket: "clonetree-c99a5.appspot.com",
  messagingSenderId: "576067889559",
  appId: "1:576067889559:web:ed2dbe1269d0dc9779fcd2",
  measurementId: "G-ND61S3CYRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Auth
const firestore = getFirestore(app); // Initialize Firestore

export { app, analytics, auth, firestore };