
Microservice & CI/CD Task Tracker
A full-stack, serverless task management application built with a React frontend, Firebase Functions for the backend, and a fully automated CI/CD pipeline using GitHub Actions.

Project Overview
This project demonstrates a modern web architecture using a decoupled frontend and a "microservice" backend. The React application (built with Vite and MaterialUI) handles the user interface, while all business logic (creating, reading, deleting tasks) is handled by individual, scalable Firebase Serverless Functions.

The entire deployment process is automated. Every push to the main branch automatically triggers a GitHub Actions workflow that builds, tests, and deploys the entire application (both frontend and backend) to Firebase.

Features
Full CRUD Functionality: Create, read, and delete tasks.

Vibrant UI: A professional, responsive dashboard built with MaterialUI (MUI).

Serverless Backend: No dedicated server to manage. The backend scales automatically with Firebase Functions.

Realtime Database: Uses FireStore to store and sync data.

Automated CI/CD: Fully automated "push-to-deploy" workflow with GitHub Actions.

Technology Stack
Frontend: React (VITE), MaterialUI (MUI)

Backend: Firebase Serverless Functions (Node.js)

Database: Cloud FireStore

CI/CD & Hosting: GitHub Actions & Firebase Hosting

Architecture
This project follows a simple, scalable, serverless architecture:

Frontend (Client): The React app runs in the user's browser. When a user adds a task, it calls the addTask Firebase Function.

Backend (Microservice): The addTask function (a small, single-purpose microservice) runs in the cloud. It validates the data and writes it to the FireStore database.

Database (Store): FireStore securely stores the data and syncs it back to any connected clients.

CI/CD (Deployment): When code is pushed to the main branch on GitHub, GitHub Actions automatically runs a job to build the React app (npm run build) and deploy both the built app (to Firebase Hosting) and the backend functions (to Firebase Functions).

How to Run Locally
To run this project on your local machine, you need two terminals.

Clone the Repository

Bash

git clone https://github.com/garvit027/cloud-task-tracker.git
cd cloud-task-tracker/task-tracker
Install Dependencies Install dependencies for both the root (React) and the backend (functions).

Bash

# Install React dependencies
npm install

# Install functions dependencies
cd functions
npm install
cd ..
Terminal 1: Run Firebase Emulators This will start a local, offline version of your Firebase backend and database.

Bash

firebase emulators:start
Terminal 2: Run React Dev Server This will start your React frontend.

Bash

npm run dev
Open http://localhost:5173/ (or whatever port your terminal shows) in your browser. The app will automatically connect to your local emulators.
