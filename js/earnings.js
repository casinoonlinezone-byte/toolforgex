// js/earnings.js (Firebase Version)

import { db } from "./firebase.js";
import { logActivity } from "./activity.js";
import { safeParse, downloadBlob } from "./helpers.js";
import { 
  collection, 
  addDoc, 
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy 
} from "firebase/firestore";

export let earnings = [];

/* -----------------------------
   Load Earnings From Firestore
----------------------------- */
export async function loadEarnings(userId) {
  earnings = [];

  const q = query(
    collection(db, "users", userId, "earnings"),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);
  snapshot.forEach(docSnap => {
    earnings.push({ id: docSnap.id, ...docSnap.data() });
  });

  return earnings;
}

/* -----------------------------
   Add Earning (Firestore)
----------------------------- */
export async function addEarning(userId, entry) {
  const docRef = await addDoc(
    collection(db, "users", userId, "earnings"),
    entry
  );

  logActivity("earnings", `Added earning: ${entry.amount}`);

  return docRef.id;
}

/* -----------------------------
   Delete Earning
----------------------------- */
export async function deleteEarning(userId, id) {
  await deleteDoc(doc(db, "users", userId, "earnings", id));
}

/* -----------------------------
   Export CSV (Firebase version)
----------------------------- */
export function exportEarningsCSV() {
  let csv = "Date,Source,Category,Clicks,Conversions,Amount\n";

  earnings.forEach(e => {
    csv += `${e.date},${e.source},${e.category},${e.clicks},${e.conversions},${e.amount}\n`;
  });

  downloadBlob("earnings.csv", csv);
}

/* -----------------------------
   Monthly Totals
----------------------------- */
export function getMonthlyTotals() {
  const map = {};

  earnings.forEach(e => {
    const m = e.date.slice(0, 7);
    map[m] = (map[m] || 0) + Number(e.amount);
  });

  const labels = Object.keys(map).sort();
  const data = labels.map(k => map[k]);

  return { labels, data };
}

/* -----------------------------
   Category Totals
----------------------------- */
export function getCategoryTotals() {
  const map = {};

  earnings.forEach(e => {
    map[e.category] = (map[e.category] || 0) + Number(e.amount);
  });

  const labels = Object.keys(map);
  const data = labels.map(k => map[k]);

  return { labels, data };
}

/* -----------------------------
   Render Table
----------------------------- */
export function renderEarningsTable(tbody) {
  tbody.innerHTML = "";

  earnings.forEach(e => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${e.date}</td>
      <td>${e.source}</td>
      <td>${e.category}</td>
      <td>${e.clicks}</td>
      <td>${e.conversions}</td>
      <td>${e.amount}</td>
      <td>
        <button class="btn btn-secondary small" data-id="${e.id}">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}
