// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuks0O6_R_ltzxGJHM-G5LIBvoLvV_P6g",
  authDomain: "thrifthub-demo.firebaseapp.com",
  projectId: "thrifthub-demo",
  storageBucket: "thrifthub-demo.firebasestorage.app",
  messagingSenderId: "518014691134",
  appId: "1:518014691134:web:7fa4a771e1c664c9f92e6f"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export Firebase services
export const db = firebase.firestore(app);
export const storage = firebase.storage(app);
export const auth = firebase.auth();