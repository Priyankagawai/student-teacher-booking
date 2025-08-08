import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAz8Xb3CjsgkmW-HDUkA7-Do6Ehfj4OnQw",
    authDomain: "student-teacher-booking-7aa73.firebaseapp.com",
    projectId: "student-teacher-booking-7aa73",
    storageBucket: "student-teacher-booking-7aa73.firebasestorage.app",
    messagingSenderId: "788361141658",
    appId: "1:788361141658:web:7fded05e68d0bfff28ae23",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("addTeacherForm");
const msg = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const department = document.getElementById("department").value.trim();
    const subject = document.getElementById("subject").value.trim();

    try {
      await addDoc(collection(db, "teachers"), { name, department, subject });
      msg.innerText = "✅ Teacher added successfully!";
      msg.style.color = "green";
      form.reset();
    } catch (err) {
      msg.innerText = "❌ Error: " + err.message;
      msg.style.color = "red";
    }
  });
}
