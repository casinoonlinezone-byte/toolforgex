// js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

export const firebaseConfig = {
  apiKey: "AIzaSyBJ5-b_IVSdxYN66XH14WpRSCU6Toyh2FE",
  authDomain: "earnify-pro-4d01a.firebaseapp.com",
  databaseURL: "https://earnify-pro-4d01a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "earnify-pro-4d01a",
  storageBucket: "earnify-pro-4d01a.firebasestorage.app",
  messagingSenderId: "492457671396",
  appId: "1:492457671396:web:1b333f3a5943f863a2caf1",
  measurementId: "G-GMVQ6DJMMF"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Firebase Services
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const rtdb = getDatabase(firebaseApp); // optional (Realtime DB)

console.log("🔥 Firebase Connected Successfully");
