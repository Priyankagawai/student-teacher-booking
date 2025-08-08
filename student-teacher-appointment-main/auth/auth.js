import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

// ✅ Login Form Handler
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const selectedRole = document.getElementById("role").value;
  const errorDiv = document.getElementById("error");
  errorDiv.innerText = "";

  try {
    // Sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user role and name from Firestore
    const docRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      throw new Error("User data not found.");
    }

    const userData = userDoc.data();

    // Check selected role vs registered role
    if (userData.role !== selectedRole) {
      throw new Error(`You're registered as '${userData.role}', not '${selectedRole}'.`);
    }

    // ✅ Save user name in localStorage
    localStorage.setItem("adminName", userData.name); // assuming the Firestore doc has a 'name' field

    // ✅ Redirect based on role
    if (selectedRole === "teacher") {
      window.location.href = "../teacher/teacher.html";
    } else if (selectedRole === "admin") {
      window.location.href = "../admin/admin.html";
    } else {
      throw new Error("Invalid role selection.");
    }

  } catch (error) {
    console.error(error);
    errorDiv.innerText = error.message;
  }
});
