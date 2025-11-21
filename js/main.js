// js/main.js
// Hybrid Auth + UI Binding

import { registerUser, loginUser, logout, getLoggedInUsername } from './auth.js';
import { loadTools } from './tools.js';
import { loadCharts } from './charts.js';
import { loadHistory } from './history.js';
import { loadNotifications } from './notifications.js';
import { loadActivity } from './activity.js';
import { loadFeedback } from './feedback.js';
import { loadEarnings } from './earnings.js';

// ------------------------------
// INITIAL APP LOAD
// ------------------------------
window.addEventListener('DOMContentLoaded', () => {
  initAuthUI();
  initNavigation();
  initDashboard();
});

// ------------------------------
// AUTH UI
// ------------------------------
function initAuthUI() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const userDisplay = document.getElementById('userDisplay');

  // Auto show user if logged in
  const user = getLoggedInUsername();
  if (user) userDisplay.textContent = user;

  // Login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      const remember = loginForm.remember?.checked || false;

      try {
        const username = await loginUser(email, password, remember);
        userDisplay.textContent = username;

        alert('Login successful');

        document.body.classList.remove('show-login');
        showPage("dashboard");   // ★ FIXED: redirect to dashboard
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Register
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = registerForm.email.value;
      const username = registerForm.username.value;
      const password = registerForm.password.value;

      try {
        await registerUser(email, username, password);
        alert('Registration completed. You can login now.');
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await logout();
      userDisplay.textContent = 'Guest';
      alert('Logged out');
      showPage("login");
    });
  }
}


// ------------------------------
// NAVIGATION (Sidebar / Sections)
// ------------------------------
function initNavigation() {
  const links = document.querySelectorAll('[data-page]');

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const page = link.getAttribute('data-page');
      showPage(page);
    });
  });
}

function showPage(page) {
  const sections = document.querySelectorAll('.page');
  sections.forEach((sec) => sec.classList.add('hidden'));

  const target = document.getElementById(page);
  if (target) target.classList.remove('hidden');

  // Load modules when page opens
  switch (page) {
    case 'dashboard': loadDashboard(); break;
    case 'tools': loadTools(); break;
    case 'charts': loadCharts(); break;
    case 'history': loadHistory(); break;
    case 'notifications': loadNotifications(); break;
    case 'activity': loadActivity(); break;
    case 'feedback': loadFeedback(); break;
    case 'earnings': loadEarnings(); break;
  }
}


// ------------------------------
// DASHBOARD LOAD
// ------------------------------
function initDashboard() {
  loadDashboard();
}

function loadDashboard() {
  loadTools();
  loadCharts();
  loadNotifications();
  loadActivity();
  loadFeedback();
  loadEarnings();
}
