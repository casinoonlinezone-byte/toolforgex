// js/notifications.js
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const notifyRef = collection(db, "notifications");

// ---------------------------
// GET ALL NOTIFICATIONS (ordered)
// ---------------------------
export async function loadNotifications() {
  const q = query(notifyRef, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  let list = [];

  snapshot.forEach((d) => {
    list.push({ id: d.id, ...d.data() });
  });

  // UPDATE UI
  renderNotifications(list);
}

// ---------------------------
// ADD A NEW NOTIFICATION
// ---------------------------
export async function addNotification(message) {
  const now = Date.now(); // timestamp number (perfect for ordering)

  await addDoc(notifyRef, {
    message,
    timestamp: now,
    read: false
  });
}

// ---------------------------
// MARK NOTIFICATION AS READ
// ---------------------------
export async function markRead(id) {
  const ref = doc(db, "notifications", id);
  await updateDoc(ref, { read: true });
}

// ---------------------------
// DELETE ONE OR ALL NOTIFICATIONS
// ---------------------------
export async function clearAllNotifications() {
  const snapshot = await getDocs(notifyRef);

  for (const d of snapshot.docs) {
    await deleteDoc(doc(db, "notifications", d.id));
  }
}

// ---------------------------
// RENDER UI
// ---------------------------
function renderNotifications(list) {
  const box = document.getElementById("notificationsBox");
  if (!box) return;

  box.innerHTML = "";

  list.forEach((n) => {
    const row = document.createElement("div");
    row.className = "notify-item";

    row.innerHTML = `
      <p>${n.message}</p>
      <small>${new Date(n.timestamp).toLocaleString("en-US", {
        timeZone: "Asia/Karachi"
      })}</small>
      <button onclick="markRead('${n.id}')">Mark Read</button>
    `;

    box.appendChild(row);
  });
}

// 👇 Expose markRead globally (for button calls)
window.markRead = markRead;
