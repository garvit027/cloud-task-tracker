const functions = require("firebase-functions");
const admin = require("firebase-admin");

// --- FIX 1: Add this new import line ---
const { FieldValue } = require("firebase-admin/firestore");
// ----------------------------------------

admin.initializeApp();
const db = admin.firestore();

/**
 * Gets all tasks.
 */
exports.getTasks = functions.https.onCall(async (_data, _context) => {
  const tasksSnapshot = await db.collection("tasks").orderBy("createdAt", "desc").get();
  const tasks = [];
  tasksSnapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });
  return tasks;
});

/**
 * Adds a new task.
 */
exports.addTask = functions.https.onCall(async (data, context) => {
  
  console.log("addTask function received payload:", data.data);

  if (!data.data.text || data.data.text.trim().length === 0) {
    console.error("addTask validation failed. data.data.text is empty or missing.");
    throw new functions.https.HttpsError("invalid-argument", "Task text cannot be empty.");
  }

  const task = {
    text: data.data.text,
    completed: false,
    
    // --- FIX 2: Change this line ---
    createdAt: FieldValue.serverTimestamp(),
    // -------------------------------
  };

  const writeResult = await db.collection("tasks").add(task);
  // We return the *new* ID and the data we *sent*
  return { id: writeResult.id, text: task.text, completed: task.completed };
});

/**
 * Deletes a task.
 */
exports.deleteTask = functions.https.onCall(async (data, context) => {
  
  if (!data.data.id) {
    throw new functions.https.HttpsError("invalid-argument", "Task ID is required.");
  }

  try {
    await db.collection("tasks").doc(data.data.id).delete();
    return { message: "Task deleted successfully", id: data.data.id };
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Could not delete task", error);
  }
});