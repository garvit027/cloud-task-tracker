# Microservice & CI/CD Task Tracker

![Project Demo](https://ibb.co/tPJ46pD0)

[![CI/CD Pipeline](https://github.com/garvit027/cloud-task-tracker/actions/workflows/deploy.yml/badge.svg)](https://github.com/garvit027/cloud-task-tracker/actions)

Hello! This is a full-stack, serverless task management application I built to demonstrate a modern microservice architecture. My project features a React frontend, a Firebase Functions backend, and a fully configured, automated CI/CD pipeline using GitHub Actions.

## Project Overview

I designed this project as an advanced, aesthetic full-stack system using a decoupled React (MUI) frontend and Firebase Serverless Functions for robust data handling. My architecture is designed to be highly scalable and maintainable, and I've set up a complete CI/CD pipeline for fully automated builds and deployments.

My primary goal was to showcase mastery in full-stack development, serverless technologies, and modern DevOps practices (Infrastructure as Code).

## Features

-   **Full CRUD Functionality:** I've implemented full create, read, and delete functionality for tasks.
-   **Vibrant Enterprise UI:** I designed a professional, responsive dashboard using MaterialUI (MUI) with a custom theme.
-   **Serverless Backend:** I used a "microservice" backend with individual, scalable Firebase Functions to handle all business logic.
-   **NoSQL Database:** I chose Cloud FireStore for flexible and real-time data storage.
-   **Automated CI/CD:** I configured a "push-to-deploy" workflow with GitHub Actions to automatically build, test, and deploy the entire application.

---

## My Technology Stack

-   **Frontend:** React (VITE), MaterialUI (MUI)
-   **Backend:** Firebase Serverless Functions (Node.js)
-   **Database:** Cloud FireStore
-   **CI/CD & Hosting:** GitHub Actions & Firebase Hosting

---

## Architecture

I followed a scalable, serverless architecture for this project:

1.  **Frontend (Client):** The React app (built with Vite and styled with MaterialUI) runs in the user's browser. It makes calls to my Firebase Functions backend to handle data.
2.  **Backend (Microservice):** Each piece of business logic (e.g., `addTask`, `getTasks`, `deleteTask`) is a separate Firebase Function. This allows for independent scaling and maintenance.
3.  **Database (Store):** Cloud FireStore provides a secure and real-time NoSQL database.
4.  **CI/CD (Deployment):** The `.github/workflows/deploy.yml` file defines my complete pipeline. On every push to the `main` branch, GitHub Actions automatically:
    * Installs all my frontend and backend dependencies.
    * Builds the React app for production (`npm run build`).
    * Deploys the built React app to **Firebase Hosting**.
    * Deploys the backend functions to **Firebase Functions**.

---

## How to Run Locally

I've set this up to use the Firebase Emulator Suite for a complete offline development experience.

1.  **Clone the Repository**
    (This assumes my project is in the `task-tracker` sub-directory)
    ```bash
    git clone [https://github.com/garvit027/cloud-task-tracker.git](https://github.com/garvit027/cloud-task-tracker.git)
    cd cloud-task-tracker/task-tracker
    ```

2.  **Install Dependencies**
    You'll need to install dependencies for *both* the root (React) and the backend (functions).
    ```bash
    # Install React dependencies
    npm install
    
    # Install functions dependencies
    npm install --prefix functions
    ```

3.  **Terminal 1: Run Firebase Emulators**
    This starts a local, offline version of my Firebase backend, database, and hosting.
    ```bash
    firebase emulators:start
    ```

4.  **Terminal 2: Run React Dev Server**
    This starts the React frontend with hot-reloading.
    ```bash
    npm run dev
    ```

5.  Open `http://localhost:5173/` (or the port shown in your terminal) in your browser. The app is configured to automatically connect to your local emulators.

---

## Deployment Pipeline (CI/CD)

This repository has a fully configured CI/CD pipeline using GitHub Actions. The workflow is defined in `.github/workflows/deploy.yml`.

### Deployment Prerequisite

To successfully deploy this project, the target Firebase project **must be on the "Blaze" (pay-as-you-go) plan.**

This is a **mandatory requirement from Google** to use the Cloud Build API, which is necessary for deploying Firebase Functions. The Blaze plan includes a generous free tier, so no charges are typically incurred for a project of this scale.

### How to Deploy (After Upgrading Plan)

1.  **Upgrade to Blaze:** Visit your Firebase project console and upgrade the plan.
2.  **Set GitHub Secret:** Add your Firebase deploy token as a GitHub Actions secret named `FIREBASE_TOKEN`.
3.  **Push to Main:** Pushing any commit to the `main` branch will automatically trigger the deployment.
    ```bash
    git push origin main
    ```
