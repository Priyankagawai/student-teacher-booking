import { db } from "../firebase-init.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Helper to escape user input
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[tag])
  );
}

const container = document.getElementById("messagesContainer");
const loading = document.getElementById("loading");

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (!user) {
    loading.innerHTML = `
      <p class="text-center text-danger">You must be logged in to view messages.</p>
    `;
    return;
  }

  const currentTeacherEmail = user.email;
  console.log("Logged in teacher email:", currentTeacherEmail);

  const q = query(
    collection(db, "messages"),
    where("teacherEmail", "==", currentTeacherEmail),
    orderBy("timestamp", "desc")
  );

  onSnapshot(q, (snapshot) => {
    loading.style.display = "none";
    container.innerHTML = "";

    if (snapshot.empty) {
      container.innerHTML = `
        <div class="col-12 text-center text-muted">
          <p>No messages from students yet.</p>
        </div>`;
      return;
    }

    snapshot.forEach((doc) => {
      const d = doc.data();
      const date = d.timestamp?.toDate()?.toLocaleString() ?? "Unknown";

      const studentName = d.studentName || "Unnamed Student";
      const studentEmail = d.studentEmail || "No email provided";
      const message = escapeHTML(d.message || "No message provided");

      container.insertAdjacentHTML("beforeend", `
        <div class="col-md-6 mb-3">
          <div class="card p-3">
            <h5 class="card-title mb-2">
              From: ${escapeHTML(studentName)} • <small>${escapeHTML(studentEmail)}</small>
            </h5>
            <p class="card-text">${message}</p>
            <p class="text-muted text-end mb-0"><small>${date}</small></p>
          </div>
        </div>`);
    });
  });
});
