import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupAuthListener();
});

// Theme Management
function setupThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('inkly-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(toggleBtn, savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('inkly-theme', newTheme);
      updateThemeIcon(toggleBtn, newTheme);
    });
  }
}

function updateThemeIcon(btn, theme) {
  if (!btn) return;
  const icon = btn.querySelector('i');
  if (icon) {
    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  }
}

// Authentication Navigation Sync
function setupAuthListener() {
  const guestNav = document.getElementById('guestNavActions');
  const userNav = document.getElementById('userNavActions');
  const userAvatar = document.getElementById('navUserAvatar');
  const logoutBtn = document.getElementById('logoutBtn');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (guestNav) guestNav.classList.add('d-none');
      if (userNav) userNav.classList.remove('d-none');
      if (userAvatar) userAvatar.src = user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
    } else {
      if (guestNav) guestNav.classList.remove('d-none');
      if (userNav) userNav.classList.add('d-none');
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        window.location.reload();
      } catch (err) {
        console.error("Sign-out error:", err);
      }
    });
  }
}