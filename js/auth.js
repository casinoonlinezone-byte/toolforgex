// js/auth.js
import { uid } from "./helpers.js";
import { firebaseApp, auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ---------------------------------------------------
   CHECK IF FIREBASE IS READY
--------------------------------------------------- */
function firebaseReady() {
  return firebaseApp && auth ? true : false;
}

/* ---------------------------------------------------
   LOCAL AUTH STORAGE
--------------------------------------------------- */
const localUsers = JSON.parse(localStorage.getItem("users") || "{}");

/* ---------------------------------------------------
   LOCAL REGISTER
--------------------------------------------------- */
function localRegister(email, username, password) {
  if (localUsers[email]) throw new Error("Email already exists");

  localUsers[email] = { username, password, id: uid() };
  localStorage.setItem("users", JSON.stringify(localUsers));
  return username;
}

/* ---------------------------------------------------
   LOCAL LOGIN
--------------------------------------------------- */
function localLogin(email, password, remember = false) {
  const user = localUsers[email];
  if (!user || user.password !== password)
    throw new Error("Invalid credentials");

  const token = btoa(
    JSON.stringify({
      username: user.username,
      expiry: Date.now() + (remember ? 7 : 1) * 24 * 60 * 60 * 1000
    })
  );

  if (remember) localStorage.setItem("authToken", token);
  else sessionStorage.setItem("authToken", token);

  return user.username;
}

/* ---------------------------------------------------
   LOCAL GET CURRENT USER
--------------------------------------------------- */
function localGetUser() {
  const L = localStorage.getItem("authToken");
  const S = sessionStorage.getItem("authToken");

  try {
    if (L) {
      const d = JSON.parse(atob(L));
      if (d.expiry > Date.now()) return d.username;
      localStorage.removeItem("authToken");
    }
    if (S) {
      const d = JSON.parse(atob(S));
      if (d.expiry > Date.now()) return d.username;
      sessionStorage.removeItem("authToken");
    }
  } catch (err) {}

  return null;
}

/* ---------------------------------------------------
   LOCAL LOGOUT
--------------------------------------------------- */
function localLogout() {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
}

/* ---------------------------------------------------
   FIREBASE REGISTER
--------------------------------------------------- */
async function firebaseRegister(email, username, password) {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  // store username so UI can show it
  localStorage.setItem("firebaseUser", username);

  return username;
}

/* ---------------------------------------------------
   FIREBASE LOGIN
--------------------------------------------------- */
async function firebaseLogin(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);

  const username = email.split("@")[0];

  localStorage.setItem("firebaseUser", username);

  return username;
}

/* ---------------------------------------------------
   FIREBASE LOGOUT
--------------------------------------------------- */
async function firebaseLogout() {
  await signOut(auth);
  localStorage.removeItem("firebaseUser");
}

/* ---------------------------------------------------
   HYBRID API — USE IN MAIN.JS
--------------------------------------------------- */
export async function registerUser(email, username, password) {
  if (firebaseReady()) return await firebaseRegister(email, username, password);
  return localRegister(email, username, password);
}

export async function loginUser(email, password, remember = false) {
  if (firebaseReady()) return await firebaseLogin(email, password);
  return localLogin(email, password, remember);
}

export function getLoggedInUsername() {
  if (firebaseReady()) return localStorage.getItem("firebaseUser") || null;
  return localGetUser();
}

export async function logout() {
  if (firebaseReady()) return await firebaseLogout();
  return localLogout();
}

/* ---------------------------------------------------
   LISTEN FOR FIREBASE LOGIN STATE (IMPORTANT!)
--------------------------------------------------- */
if (firebaseReady()) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const username = user.email.split("@")[0];
      localStorage.setItem("firebaseUser", username);
    } else {
      localStorage.removeItem("firebaseUser");
    }
  });
}
