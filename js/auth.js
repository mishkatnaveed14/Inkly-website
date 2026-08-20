import { auth, db, googleProvider } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signInWithPopup,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Utility: Show Alert Message
export function showAlert(containerId, message, type = 'danger') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

// Utility: Set Loading State
export function setLoading(buttonElement, isLoading, originalText) {
  if (!buttonElement) return;
  if (isLoading) {
    buttonElement.disabled = true;
    buttonElement.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...`;
  } else {
    buttonElement.disabled = false;
    buttonElement.innerHTML = originalText;
  }
}

// Create or ensure User Document in Firestore
async function createUserDocument(user, additionalData = {}) {
  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email, displayName, photoURL } = user;
    const defaultUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');

    await setDoc(userRef, {
      uid: user.uid,
      name: displayName || additionalData.name || defaultUsername,
      username: additionalData.username || defaultUsername,
      email: email,
      avatar: photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      bio: 'Writer and thinker on Inkly.',
      role: 'user',
      followersCount: 0,
      followingCount: 0,
      createdAt: serverTimestamp(),
      ...additionalData
    });
  }
}

// Register with Email & Password
export async function registerUser(name, username, email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: name
  });

  await createUserDocument(user, { name, username });
  return user;
}

// Login with Email & Password
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Login/Signup with Google
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  await createUserDocument(result.user);
  return result.user;
}

// Password Reset
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}