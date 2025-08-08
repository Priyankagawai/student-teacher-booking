import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ✅ Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAz8Xb3CjsgkmW-HDUkA7-Do6Ehfj4OnQw",
    authDomain: "student-teacher-booking-7aa73.firebaseapp.com",
    projectId: "student-teacher-booking-7aa73",
    storageBucket: "student-teacher-booking-7aa73.firebasestorage.app",
    messagingSenderId: "788361141658",
    appId: "1:788361141658:web:7fded05e68d0bfff28ae23",
  };

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Wait for DOM to fully load
window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("studentLoginForm");
  if (!loginForm) {
    console.error("Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorDiv = document.getElementById("error");

    errorDiv.innerText = "";
    console.log("Form submitted");

    try {
      // ✅ Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");

      const user = userCredential.user;

      // ✅ Query Firestore 'students' collection by email
      const studentsRef = collection(db, "students");
      const q = query(studentsRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Student record not found.");
      }

      const studentDoc = querySnapshot.docs[0];
      const studentData = studentDoc.data();

      if (studentData.role !== "student") {
        throw new Error("You are not registered as a student.");
      }

      // ✅ Redirect to student dashboard
      console.log("Redirecting...");
      window.location.href = "../student/student.html";
    } catch (error) {
      console.error("Login Error:", error);
      errorDiv.innerText = error.message;
    }
  });
});
