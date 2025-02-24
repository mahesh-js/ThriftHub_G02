// script.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';

// Your Firebase configuration object from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBuks0O6_R_ltzxGJHM-G5LIBvoLvV_P6g",
    authDomain: "thrifthub-demo.firebaseapp.com",
    projectId: "thrifthub-demo",
    storageBucket: "thrifthub-demo.firebasestorage.app",
    messagingSenderId: "518014691134",
    appId: "1:518014691134:web:7fa4a771e1c664c9f92e6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Add Product Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const addProductForm = document.getElementById('addProductForm');
    const messageDiv = document.getElementById('message');

    if (addProductForm && messageDiv) {
        addProductForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                // Get form values
                const name = document.getElementById('name').value;
                const price = parseFloat(document.getElementById('price').value);
                const category = document.getElementById('category').value;
                const description = document.getElementById('description').value;
                const imageFile = document.getElementById('image').files[0];

                // Show loading message
                messageDiv.textContent = 'Uploading product...';

                // Upload image to Firebase Storage
                let imageUrl = '';
                if (imageFile) {
                    const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
                    const snapshot = await uploadBytes(storageRef, imageFile);
                    imageUrl = await getDownloadURL(snapshot.ref);
                }

                // Add product to Firestore
                await addDoc(collection(db, 'products'), {
                    name: name,
                    price: price,
                    category: category,
                    description: description,
                    imageUrl: imageUrl,
                    createdAt: serverTimestamp(),
                    status: 'available'
                });

                // Success message and reset form
                messageDiv.textContent = 'Product added successfully!';
                messageDiv.style.color = 'green';
                addProductForm.reset();

                // Clear message after 3 seconds
                setTimeout(() => {
                    messageDiv.textContent = '';
                }, 3000);

            } catch (error) {
                console.error('Error adding product:', error);
                messageDiv.textContent = 'Error adding product: ' + error.message;
                messageDiv.style.color = 'red';
            }
        });
    } else {
        console.warn('Add Product form or message div not found in the DOM.');
    }
});