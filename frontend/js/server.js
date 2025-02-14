require('dotenv').config();
const { Client, Databases, Users, ID } = require('../../node_modules/node-appwrite/dist');

// Declare client once
const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

// Initialize Appwrite services
const databases = new Databases(client);
const users = new Users(client);

// Example usage
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in Appwrite
        const user = await users.create(ID.unique(), email, hashedPassword, name);

        // Save user data in the database
        await databases.createDocument(
            process.env.APPWRITE_DATABASE_ID,
            'users',
            ID.unique(),
            { name, email, password: hashedPassword }
        );

        res.status(201).send('User created successfully');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Error creating user');
    }
});