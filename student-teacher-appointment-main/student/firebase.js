// Import Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAz8Xb3CjsgkmW-HDUkA7-Do6Ehfj4OnQw",
    authDomain: "student-teacher-booking-7aa73.firebaseapp.com",
    projectId: "student-teacher-booking-7aa73",
    storageBucket: "student-teacher-booking-7aa73.firebasestorage.app",
    messagingSenderId: "788361141658",
    appId: "1:788361141658:web:7fded05e68d0bfff28ae23",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the Firestore database instance
export { db };
