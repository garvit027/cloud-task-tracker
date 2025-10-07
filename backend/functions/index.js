// index.js

const functions = require("firebase-functions"); 
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin"); 

// Initialize the Admin SDK and Firestore Service
admin.initializeApp(); 
const db = admin.firestore(); // <--- FINAL FIX: Explicitly get the Firestore service

// Use V1 API format for maximum stability, avoiding Node v22 conflicts.
exports.createTask = functions.https.onRequest(async (req, res) => { 
    
    // 1. CORS Headers (CRITICAL FIX for network error)
    res.set('Access-Control-Allow-Origin', '*'); 
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle the pre-flight request
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    // 2. HTTP Method Validation 
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed: Use POST');
    }

    try {
        // Ensure the request body is parsed
        const requestBody = req.body || {};
        const { title, description } = requestBody;

        // 3. Input Validation (Commitment to Quality)
        if (!title || typeof title !== 'string') {
            return res.status(400).send({ message: 'Error: Task title is required and must be a string.' });
        }

        // 4. Create the new task object
        const newTask = {
            title: title,
            description: description || 'No description provided.',
            status: 'To Do', // Initial status for Kanban board
            createdAt: db.FieldValue.serverTimestamp() // <--- FINAL FIX: Using 'db.FieldValue'
        };

        // 5. Save to Firestore (Persistence Layer)
        await db.collection('tasks').add(newTask); // Using the explicit 'db' reference

        // 6. Send a success response
        return res.status(201).send({ message: 'Task created successfully.' });

    } catch (error) {
        logger.error("Database Error:", error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
});