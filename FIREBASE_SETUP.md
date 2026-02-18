# Firebase Setup Guide

Follow these steps to configure Firebase for your Personal Finance Tracker.

## 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add project"**.
3. Enter a name for your project (e.g., `finance-tracker`).
4. Toggle Google Analytics (optional, you can disable it for this project).
5. Click **"Create project"**.

## 2. Register Your App
1. Once the project is created, click the **Web icon (`</>`)** on the dashboard.
2. Enter an app nickname (e.g., `Finance Web App`).
3. Click **"Register app"**.
4. You will see your **firebaseConfig** object. Keep this page open.

## 3. Enable Authentication
1. Go to **Build** > **Authentication** in the left sidebar.
2. Click **"Get Started"**.
3. Select **"Email/Password"** from the Sign-in providers.
4. Enable the **"Email/Password"** switch.
5. Click **"Save"**.

## 4. Enable Firestore Database
1. Go to **Build** > **Firestore Database** in the left sidebar.
2. Click **"Create database"**.
3. Choose a location (default is usually fine).
4. Start in **Test mode** (for easier development) or **Production mode**.
   - *Note: In Test mode, anyone with the reference can view/edit data for 30 days. For this project, I provided specific security rules in the README to secure it.*
5. Click **"Create"**.

## 5. Add Configuration to Project
1. Go back to your Project Settings (Gear icon > Project settings).
2. Scroll down to the **"Your apps"** section.
3. You will see a code snippet like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "project-id.firebaseapp.com",
     projectId: "project-id",
     storageBucket: "project-id.firebasestorage.app",
     messagingSenderId: "123456...",
     appId: "1:12345..."
   };
   ```
4. Open the `.env` file in your project folder (`C:\Users\Sav Grewal\Desktop\ReactProject\.env`).
5. Copy the values from your Firebase console and paste them into the `.env` file:

   # Example .env file
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=project-id
   VITE_FIREBASE_STORAGE_BUCKET=project-id.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456...
   VITE_FIREBASE_APP_ID=1:12345...
   VITE_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com

   *(Replace the values on the right with your actual keys from the console)*

6. **Save the file.**

## 6. Restart Development Server
Since you changed the `.env` file, you must restart the server for changes to take effect.
1. In your terminal, press `Ctrl + C` to stop the current server.
2. Run `npm run dev` again.
