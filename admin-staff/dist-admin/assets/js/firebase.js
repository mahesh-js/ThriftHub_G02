// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBuks0O6_R_ltzxGJHM-G5LIBvoLvV_P6g",
    authDomain: "thrifthub-demo.firebaseapp.com",
    projectId: "thrifthub-demo",
    storageBucket: "thrifthub-demo.firebasestorage.app",
    messagingSenderId: "518014691134",
    appId: "1:518014691134:web:7fa4a771e1c664c9f92e6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Auth, and Storage
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };