// js/activity.js (Firebase + Firestore Version)

import { db } from "./firebase.js";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy,
  getDocs,
  limit 
} from "firebase/firestore";

export let activityLog = [];

/* ----------------------------------------
   Load activity logs for a user
----------------------------------------- */
export async function loadActivity(userId) {
  activityLog = [];

  const q = query(
    collection(db, "users", userId, "activity"),
    orderBy("timestamp", "desc"),
    limit(500)
  );

  const snap = await getDocs(q);

  snap.forEach(doc => {
    activityLog.push({ id: doc.id, ...doc.data() });
  });

  return activityLog;
}

/* ----------------------------------------
   Log new activity (Firestore)
----------------------------------------- */
export async function logActivity(type, details, userId) {
  const entry = {
    type,
    details,
    timestamp: Date.now(), // better for ordering
  };

  await addDoc(collection(db, "users", userId, "activity"), entry);
}

/* ----------------------------------------
   CLEAR ACTIVITY (delete all logs)
   (optional, only if needed)
----------------------------------------- */
export async function clearActivity(userId) {
  const q = query(collection(db, "users", userId, "activity"));
  const snap = await getDocs(q);

  for (const docSnap of snap.docs) {
    await deleteDoc(doc(db, "users", userId, "activity", docSnap.id));
  }

  activityLog = [];
}
