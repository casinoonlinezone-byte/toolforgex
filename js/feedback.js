// feedback.js
import { safeParse } from './helpers.js';
import { firebaseAvailable, db } from "./firebase.js";
import { 
  collection, addDoc, getDocs, deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ---------------------------
// LocalStorage fallback
// ---------------------------
export let feedback = safeParse('feedback', []);

function saveLocal() {
  localStorage.setItem('feedback', JSON.stringify(feedback));
}

// ---------------------------
// Submit Feedback (Hybrid)
// ---------------------------
export async function submitFeedback(item) {

  // FIREBASE AVAILABLE → Save to Firestore
  if (firebaseAvailable()) {
    await addDoc(collection(db, "feedback"), item);
    return;
  }

  // LOCAL FALLBACK
  feedback.unshift(item);
  if (feedback.length > 500) feedback.length = 500;
  saveLocal();
}

// ---------------------------
// Load Feedback (Hybrid)
// ---------------------------
export async function loadFeedback() {

  // FIREBASE MODE
  if (firebaseAvailable()) {
    const snap = await getDocs(collection(db, "feedback"));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  // LOCAL MODE
  return feedback;
}

// ---------------------------
// Clear Feedback (Hybrid)
// ---------------------------
export async function clearFeedback() {

  // FIREBASE MODE
  if (firebaseAvailable()) {
    const snap = await getDocs(collection(db, "feedback"));
    for (const d of snap.docs) {
      await deleteDoc(doc(db, "feedback", d.id));
    }
    return;
  }

  // LOCAL MODE
  feedback = [];
  saveLocal();
}
