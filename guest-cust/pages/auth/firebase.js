// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
export const auth = getAuth();