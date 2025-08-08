// student.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAz8Xb3CjsgkmW-HDUkA7-Do6Ehfj4OnQw",
    authDomain: "student-teacher-booking-7aa73.firebaseapp.com",
    projectId: "student-teacher-booking-7aa73",
    storageBucket: "student-teacher-booking-7aa73.firebasestorage.app",
    messagingSenderId: "788361141658",
    appId: "1:788361141658:web:7fded05e68d0bfff28ae23",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fetch and display student name
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const userDoc = await getDoc(doc(db, "students", uid));

    if (userDoc.exists()) {
      const studentData = userDoc.data();
      const title = document.querySelector('.dashboard-title');
      if (title) {
        title.textContent = `Welcome, ${studentData.name}!`;
      }
    } else {
      console.log("No such student found in database.");
    }
  } else {
    // Redirect to login if not authenticated
    window.location.href = "../login.html";
  }
});
