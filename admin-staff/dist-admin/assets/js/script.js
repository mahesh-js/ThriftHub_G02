// Your Firebase configuration object from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBuks0O6_R_ltzxGJHM-G5LIBvoLvV_P6g",
    authDomain: "thrifthub-demo.firebaseapp.com",
    projectId: "thrifthub-demo",
    storageBucket: "thrifthub-demo.appspot.com",
    messagingSenderId: "518014691134",
    appId: "1:518014691134:web:7fa4a771e1c664c9f92e6f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = firebase.firestore();
const storage = firebase.storage();

// Get the form element
const productForm = document.getElementById('productForm');
const messageDiv = document.getElementById('message');

// Add event listener for form submission
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        console.log("Form submission started"); // Debugging

        // Get form values
        const title = document.getElementById('title').value;
        const price = parseFloat(document.getElementById('price').value);
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const productDate = document.getElementById('Product-date').value;
        const gender = document.getElementById('gender').value;
        const size = document.getElementById('sizing').value;

        console.log("Form values:", { title, price, category, description, productDate, gender, size }); // Debugging

        // Get the main image file from FilePond
        const mainImagePond = FilePond.find(document.querySelector('.filepond'));
        const mainImageFile = mainImagePond.getFiles()[0]?.file;

        console.log("Main image file:", mainImageFile); // Debugging

        // Show loading message
        messageDiv.textContent = 'Uploading product...';
        messageDiv.className = '';

        let imageUrl = '';
        if (mainImageFile) {
            console.log("Uploading image to Firebase Storage..."); // Debugging
            const storageRef = storage.ref(`products/${Date.now()}_${mainImageFile.name}`);
            const snapshot = await storageRef.put(mainImageFile);
            imageUrl = await snapshot.ref.getDownloadURL();
            console.log("Image uploaded. URL:", imageUrl); // Debugging
        }

        // Add product to Firestore
        console.log("Adding product to Firestore..."); // Debugging
        await db.collection('products').add({
            title: title,
            price: price,
            category: category,
            description: description,
            productDate: productDate,
            gender: gender,
            size: size,
            imageUrl: imageUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'available'
        });

        console.log("Product added to Firestore"); // Debugging

        // Success message and reset form
        messageDiv.textContent = 'Product added successfully!';
        messageDiv.className = 'success';
        productForm.reset();

        // Clear message after 3 seconds
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 3000);

    } catch (error) {
        console.error('Error adding product:', error);
        messageDiv.textContent = 'Error adding product: ' + error.message;
        messageDiv.className = 'error';
    }
});