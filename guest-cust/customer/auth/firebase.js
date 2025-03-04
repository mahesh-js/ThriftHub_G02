// firebase.js

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBuks0O6_R_ltzxGJHM-G5LIBvoLvV_P6g",
  authDomain: "thrifthub-demo.firebaseapp.com",
  projectId: "thrifthub-demo",
  storageBucket: "thrifthub-demo.firebasestorage.app",
  messagingSenderId: "518014691134",
  appId: "1:518014691134:web:7fa4a771e1c664c9f92e6f",
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);