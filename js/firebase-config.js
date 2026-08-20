// Firebase v10 SDK via CDN ESM modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { 
  getStorage 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyChWcL-qMiZx9g8pu_qhtCOblgtrTS2vDA",
  authDomain: "inkly-website.firebaseapp.com",
  projectId: "inkly-website",
  storageBucket: "inkly-website.firebasestorage.app",
  messagingSenderId: "656901474322",
  appId: "1:656901474322:web:9d4c9a90d991f2d59af0cb"
};


// Initialize Core Services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();