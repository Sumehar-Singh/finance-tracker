# Personal Finance Tracker

A modern REACT-based personal finance dashboard to track income and expenses.

## Features

- **Authentication**: Secure Login/Register via Firebase.
- **Dashboard**: Overview of current balance, total income, and excess.
- **Visualization**: Interactive charts for expense categories and monthly comparison.
- **Transactions**: Add, view, and delete transactions.
- **Filtering**: Sort by date and view details.
- **Responsive**: Fully optimized for mobile and desktop.
- **Dark Mode**: Toggle between light and dark themes.

## Tech Stack

- **React.js** (Vite)
- **Firebase** (Auth & Realtime Database)
- **Tailwind CSS**
- **Chart.js**
- **React Router**

## Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd ReactProject
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Firebase Configuration**
    - Create a project in [Firebase Console](https://console.firebase.google.com/).
    - Enable **Authentication** (Email/Password).
    - Enable **Realtime Database** (Create database in test mode).
    - Copy your Firebase config.
    - Create a `.env` file in the root directory:
      ```env
      VITE_FIREBASE_API_KEY=your_api_key
      VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
      VITE_FIREBASE_PROJECT_ID=your_project_id
      VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
      VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
      VITE_FIREBASE_APP_ID=your_app_id
      ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

5.  **Build for Production**
    ```bash
    npm run build
    ```

## Project Structure

- `src/components`: UI Components (Navbar, Charts, etc.)
- `src/pages`: Route Pages (Dashboard, Login, etc.)
- `src/hooks`: Custom Hooks (useRealtime, useRealtimeCollection)
- `src/context`: Global Contexts (Auth, Theme)
- `src/firebase`: Firebase Initialization

## Realtime Database Rules

Ensure your database rules allow read/write:

```json
{
  "rules": {
    ".read": "now < 1798741800000",  // 2027-01-01
    ".write": "now < 1798741800000"  // 2027-01-01
  }
}
```
*(Note: These are test rules. For production, secure by checking `auth.uid`)*
