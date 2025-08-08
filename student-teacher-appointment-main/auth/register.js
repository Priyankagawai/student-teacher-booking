// ✅ IMPORT FIREBASE LIBRARIES
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ✅ YOUR FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyAz8Xb3CjsgkmW-HDUkA7-Do6Ehfj4OnQw",
    authDomain: "student-teacher-booking-7aa73.firebaseapp.com",
    projectId: "student-teacher-booking-7aa73",
    storageBucket: "student-teacher-booking-7aa73.firebasestorage.app",
    messagingSenderId: "788361141658",
    appId: "1:788361141658:web:7fded05e68d0bfff28ae23",
  };

// ✅ INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ REGISTRATION FORM LOGIC
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;
  const course = document.getElementById("course")?.value || ""; // optional
  const errorDiv = document.getElementById("error");

  errorDiv.innerText = "";

  // ✅ Validate passwords match
  if (password !== confirmPassword) {
    errorDiv.innerText = "Passwords do not match.";
    return;
  }

  try {
    // ✅ Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check the role of the user
    if (role === "student") {
      // ✅ Add to pending_students collection (await admin approval)
      await addDoc(collection(db, "pending_students"), {
        name,
        email,
        course,
        createdAt: new Date(),
        status: "pending"  // Added status field for better management
      });

      alert("Registration submitted for approval. Please wait for admin approval.");
      window.location.href = "../auth/student-login.html"; // Redirect to the student login page

    } else if (role === "teacher" || role === "admin") {
      // ✅ Add teacher/admin to the 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: new Date()
      });

      // ✅ Add teacher details to the 'teachers' collection if the role is teacher
      if (role === "teacher") {
        await addDoc(collection(db, "teachers"), {
          name,
          email,
          subject: course,  // You can store more specific teacher details here
          createdAt: new Date()
        });
      }

      alert("Registration successful!");
      window.location.href = "../auth/login.html"; // Redirect to the teacher/admin login page

    } else {
      throw new Error("Invalid role selected.");
    }

  } catch (error) {
    console.error("Error:", error);
    errorDiv.innerText = error.message;
  }
});
