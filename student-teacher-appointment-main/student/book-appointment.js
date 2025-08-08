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

document.getElementById("appointmentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const studentName = document.getElementById("studentName").value;
  const studentEmail = document.getElementById("studentEmail").value;
  const teacherName = document.getElementById("teacherName").value;
  const requestedDate = document.getElementById("requestedDate").value;
  const message = document.getElementById("message").value;

  await addDoc(collection(db, "appointment_requests"), {
    studentName,
    studentEmail,
    teacherName,
    requestedDate,
    message,
    status: "pending"
  });

  alert("Appointment request submitted!");
  e.target.reset();
});
