import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAz8Xb3CjsgkmW-HDUkA7-Do6Ehfj4OnQw",
    authDomain: "student-teacher-booking-7aa73.firebaseapp.com",
    projectId: "student-teacher-booking-7aa73",
    storageBucket: "student-teacher-booking-7aa73.firebasestorage.app",
    messagingSenderId: "788361141658",
    appId: "1:788361141658:web:7fded05e68d0bfff28ae23",
  };


const db = getFirestore(app);
const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");

let allTeachers = []; // Store all fetched teachers

// Fetch all teachers on page load
async function fetchTeachers() {
  const snapshot = await getDocs(collection(db, "teachers"));
  allTeachers = snapshot.docs.map(doc => doc.data());
  displayTeachers(allTeachers);
}

// Display filtered (or all) teachers
function displayTeachers(teachers) {
  resultsList.innerHTML = "";

  if (teachers.length === 0) {
    resultsList.innerHTML = `<li class="list-group-item text-muted text-center">No matching teachers found.</li>`;
    return;
  }

  teachers.forEach(data => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `<strong>${data.name}</strong> - ${data.subject} (${data.department})`;
    resultsList.appendChild(li);
  });
}

// Filter teachers as the user types
searchInput.addEventListener("input", () => {
  const queryText = searchInput.value.toLowerCase();

  const filtered = allTeachers.filter(data =>
    data.name?.toLowerCase().includes(queryText) ||
    data.subject?.toLowerCase().includes(queryText) ||
    data.department?.toLowerCase().includes(queryText)
  );

  displayTeachers(filtered);
});

// Initialize
fetchTeachers();
