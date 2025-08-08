import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Config
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

// Elements
const teachersBody = document.getElementById("teachersBody");
const status = document.getElementById("status");

const editFormContainer = document.getElementById("editFormContainer");
const editForm = document.getElementById("editTeacherForm");
const cancelEditBtn = document.getElementById("cancelEdit");

const editName = document.getElementById("editName");
const editDepartment = document.getElementById("editDepartment");
const editSubject = document.getElementById("editSubject");
const editId = document.getElementById("editId");

async function loadTeachers() {
  const snapshot = await getDocs(collection(db, "teachers"));
  teachersBody.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const teacher = docSnap.data();
    const id = docSnap.id;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${teacher.name}</td>
      <td>${teacher.department}</td>
      <td>${teacher.subject}</td>
      <td>
        <button class="btn-secondary" onclick="editTeacher('${id}', '${teacher.name}', '${teacher.department}', '${teacher.subject}')">Edit</button>
        <button class="btn-danger" onclick="deleteTeacher('${id}')">Delete</button>
      </td>
    `;
    teachersBody.appendChild(row);
  });
}

window.deleteTeacher = async function (id) {
  await deleteDoc(doc(db, "teachers", id));
  status.innerText = "✅ Teacher deleted!";
  loadTeachers();
};

window.editTeacher = function (id, name, department, subject) {
  editFormContainer.classList.remove("hidden");
  editName.value = name;
  editDepartment.value = department;
  editSubject.value = subject;
  editId.value = id;
};

cancelEditBtn.addEventListener("click", () => {
  editFormContainer.classList.add("hidden");
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = editId.value;
  await updateDoc(doc(db, "teachers", id), {
    name: editName.value,
    department: editDepartment.value,
    subject: editSubject.value
  });
  status.innerText = "✅ Teacher updated!";
  editFormContainer.classList.add("hidden");
  loadTeachers();
});

loadTeachers();