import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// List of pages requiring authentication
const protectedRoutes = [
  'dashboard.html',
  'create-post.html',
  'edit-post.html',
  'my-posts.html',
  'drafts.html',
  'bookmarks.html',
  'settings.html',
  'edit-profile.html',
  'notifications.html'
];

// List of auth-only pages (redirect away if logged in)
const guestOnlyRoutes = [
  'login.html',
  'signup.html',
  'forgot-password.html'
];

onAuthStateChanged(auth, (user) => {
  const currentPath = window.location.pathname.split('/').pop();

  if (!user && protectedRoutes.includes(currentPath)) {
    window.location.href = `login.html?redirect=${encodeURIComponent(currentPath)}`;
  } else if (user && guestOnlyRoutes.includes(currentPath)) {
    window.location.href = 'dashboard.html';
  }
});