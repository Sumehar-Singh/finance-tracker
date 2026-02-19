# Deployment Guide

This guide outlines the steps to push your project to GitHub and deploy it to Vercel.

## 1. Push to GitHub

Since we have already initialized the local Git repository and committed the changes, follow these steps to push to GitHub:

1.  **Create a New Repository on GitHub:**
    *   Go to [github.com/new](https://github.com/new).
    *   **Repository name:** `finance-tracker` (or your preferred name).
    *   **Visibility:** Choose **Public** or **Private**.
    *   **Do not** initialize with README, .gitignore, or License (we already have these).
    *   Click **Create repository**.

2.  **Push Local Code to GitHub:**
    *   Copy the commands from the section **"…or push an existing repository from the command line"**.
    *   Run them in your terminal (VS Code):

    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/finance-tracker.git
    git branch -M main
    git push -u origin main
    ```

## 2. Deploy to Vercel

1.  **Log in to Vercel:**
    *   Go to [vercel.com](https://vercel.com) and log in with your GitHub account.

2.  **Import Project:**
    *   Click **"Add New..."** -> **"Project"**.
    *   Find your `finance-tracker` repository in the list and click **Import**.

3.  **Configure Project:**
    *   **Framework Preset:** It should automatically detect **Vite**.
    *   **Root Directory:** `./` (default).
    *   **Environment Variables:**
        *   Expand the **Environment Variables** section.
        *   Copy the values from your local `.env` file and add them here:
            *   `VITE_FIREBASE_API_KEY`: `...`
            *   `VITE_FIREBASE_AUTH_DOMAIN`: `...`
            *   `VITE_FIREBASE_PROJECT_ID`: `...`
            *   `VITE_FIREBASE_STORAGE_BUCKET`: `...`
            *   `VITE_FIREBASE_MESSAGING_SENDER_ID`: `...`
            *   `VITE_FIREBASE_APP_ID`: `...`
            *   `VITE_FIREBASE_DATABASE_URL`: `...`

4.  **Deploy:**
    *   Click **Deploy**.
    *   Wait for the build to complete. Vercel will provide a live URL (e.g., `https://finance-tracker.vercel.app`).

## 3. Post-Deployment (Firebase)

If your deployed app has issues with authentication or database access:

1.  **Authentication Settings:**
    *   Go to Firebase Console -> Authentication -> Settings -> Authorized Domains.
    *   Add your Vercel domain (e.g., `finance-tracker.vercel.app`).

This ensures your live app is authorized to use your Firebase project.
