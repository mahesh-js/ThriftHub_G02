// firebase-config.js
import firebase from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';

const firebaseConfig = {
 apiKey: "AIzaSyBuks0O6_R_ltzxGJHM-G5LIBvoLvV_P6g",
        authDomain: "thrifthub-demo.firebaseapp.com",
        projectId: "thrifthub-demo",
        storageBucket: "thrifthub-demo.firebasestorage.app",
        messagingSenderId: "518014691134",
        appId: "1:518014691134:web:7fa4a771e1c664c9f92e6f",
      };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();