import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator }from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator, httpsCallable } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";

// --- PASTE YOUR CONFIG FROM FIREBASE CONSOLE HERE ---
const firebaseConfig = {

  apiKey: "AIzaSyDHxJyVDoRqyLH0fnDP9vHAlx1JmXnl6hg",

  authDomain: "cloud-task-tracker-ci-cd.firebaseapp.com",

  projectId: "cloud-task-tracker-ci-cd",

  storageBucket: "cloud-task-tracker-ci-cd.firebasestorage.app",

  messagingSenderId: "740189841879",

  appId: "1:740189841879:web:abd73a1ffaff0f31848392"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);

// --- Emulator Connection Logic ---
if (window.location.hostname === "localhost") {
  console.log("✅ Development: Connecting to Firebase Emulators");
  connectFirestoreEmulator(db, 'localhost', 8081);
  connectFunctionsEmulator(functions, 'localhost', 5001);
} else {
  console.log("🚀 Production: Connecting to live Firebase services");
}

// Create callable function references
const getTasks = httpsCallable(functions, 'getTasks');
const addTask = httpsCallable(functions, 'addTask');

// ---- THIS IS THE FIX ----
const deleteTask = httpsCallable(functions, 'deleteTask'); 
// -------------------------

export { db, getTasks, addTask, deleteTask };