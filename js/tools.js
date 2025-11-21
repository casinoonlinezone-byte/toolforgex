// js/tools.js
import { auth, db } from "./firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ------------------------------
// DEFAULT STATIC TOOLS LIST
// ------------------------------
export const tools = [
  {name: 'Inventra', category: 'amazon', description: 'Inventory management tool', icon: 'fa-box'},
  {name: 'PriceNovaX', category: 'amazon', description: 'Price tracking tool', icon: 'fa-tags'},
  {name: 'SEORank', category: 'seo', description: 'SEO ranking tool', icon: 'fa-chart-line'},
  {name: 'AdVanta', category: 'amazon', description: 'Advanced ad optimization tool', icon: 'fa-bullhorn'},
  {name: 'Trendoria', category: 'marketing', description: 'Trend analysis tool', icon: 'fa-line-chart'},
  {name: 'MarketInsight', category: 'research', description: 'Market research tool', icon: 'fa-search'}
];


// ------------------------------
// USER VARIABLES (Loaded From Firebase)
// ------------------------------
export let usageCounts = {};
export let favorites = [];


// ------------------------------
// LOAD USER DATA (Realtime)
// ------------------------------
export function loadTools() {

  const user = auth.currentUser;
  if (!user) {
    console.warn("⚠ User not logged in — tools not loaded");
    return;
  }

  const ref = doc(db, "users", user.uid, "data", "toolsData");

  onSnapshot(ref, (snap) => {
    if (!snap.exists()) return;

    const data = snap.data();

    usageCounts = data.usageCounts || {};
    favorites = data.favorites || [];

    console.log("🔥 Tools Synced From Firebase:", data);

    renderToolsUI();
  });
}


// ------------------------------
// INITIAL SETUP (If first time)
// ------------------------------
async function ensureUserToolsData() {

  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "data", "toolsData");

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      usageCounts: generateDefaultUsage(),
      favorites: []
    });
  }
}

function generateDefaultUsage() {
  const map = {};
  tools.forEach(t => map[t.name] = 0);
  return map;
}


// ------------------------------
// SAVE — USAGE COUNT
// ------------------------------
export async function incrementUsage(toolName) {

  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "data", "toolsData");

  usageCounts[toolName] = (usageCounts[toolName] || 0) + 1;

  await updateDoc(ref, {
    usageCounts
  });

  console.log("✔ Usage updated:", toolName);
}


// ------------------------------
// SAVE — FAVORITES TO FIREBASE
// ------------------------------
export async function toggleFavorite(toolName) {

  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid, "data", "toolsData");

  if (favorites.includes(toolName)) {
    favorites = favorites.filter(t => t !== toolName);
  } else {
    favorites.push(toolName);
  }

  await updateDoc(ref, { favorites });

  console.log("✔ Favorites updated:", favorites);
}


// ------------------------------
// UI RENDER FUNCTION
// ------------------------------
function renderToolsUI() {

  const container = document.getElementById("toolsList");
  if (!container) return;

  container.innerHTML = "";

  tools.forEach((t) => {
    const fav = favorites.includes(t.name) ? "active" : "";

    const card = `
      <div class="tool-card">
        <i class="fa ${t.icon} tool-icon"></i>
        <h3>${t.name}</h3>
        <p>${t.description}</p>

        <button onclick="window.useTool('${t.name}')" class="btn-primary">
          Use Tool (${usageCounts[t.name] || 0})
        </button>

        <button onclick="window.favoriteTool('${t.name}')" class="fav-btn ${fav}">
          <i class="fa fa-heart"></i>
        </button>
      </div>
    `;

    container.innerHTML += card;
  });
}


// ------------------------------
// EXPOSE FUNCTIONS TO WINDOW
// ------------------------------
window.useTool = incrementUsage;
window.favoriteTool = toggleFavorite;
