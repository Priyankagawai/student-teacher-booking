import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { db } from "../firebase-init.js"; // Import Firestore instance

document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get values from the form inputs
  const studentName  = document.getElementById("studentName").value.trim();
  const studentEmail = document.getElementById("studentEmail").value.trim();
  const teacherName  = document.getElementById("teacherName").value.trim();
  const teacherEmail = document.getElementById("teacherEmail").value.trim();
  const message      = document.getElementById("message").value.trim();

  // Send message data to Firestore
  try {
    await addDoc(collection(db, "messages"), {
      studentName,
      studentEmail,
      teacherName,
      teacherEmail,
      message,
      timestamp: serverTimestamp() // Automatically add timestamp to the message
    });
    alert("Message sent!");
    e.target.reset(); // Reset the form
  } catch (error) {
    console.error("Error sending message: ", error);
  }
});
