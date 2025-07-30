Of course. Here is a professional and comprehensive `README.md` file for your "Tales of the Day" project. You can copy and paste this directly into a file named `README.md` in your project's root directory.

-----

# Tales of the Day 📝✨

Tales of the Day is a beautifully designed digital diary web application that allows users to capture their daily thoughts, experiences, and reflections in a secure and creative way. Built with a modern tech stack, it offers a seamless and engaging journaling experience.

**https://talesoftheday.vercel.app/** 


<img width="1923" height="875" alt="Screenshot 2025-07-30 180033" src="https://github.com/user-attachments/assets/298685f2-4958-4712-aaca-d051752b3e35" />

<img width="1923" height="872" alt="Screenshot 2025-07-30 180052" src="https://github.com/user-attachments/assets/2da75718-75a9-4ed7-bd9b-9f205e71c4f5" />

<img width="1923" height="867" alt="Screenshot 2025-07-30 180103" src="https://github.com/user-attachments/assets/da209a68-fc95-4d81-aa10-99c9e0dbf66a" />

<img width="1923" height="869" alt="Screenshot 2025-07-30 180138" src="https://github.com/user-attachments/assets/667e7c32-867b-4272-a6de-19121e308e78" />

<img width="768" height="424" alt="tale-card-demo" src="https://github.com/user-attachments/assets/27a3da02-3f7d-49b0-95c5-1d1236bfeda3" />




-----

## 🚀 About The Project

This project is a single-page application (SPA) built with React and Vite, using Firebase for all backend services. The primary goal is to provide a private and personal space for users to document their life's moments. From simple text entries to voice-powered notes and beautifully designed shareable cards, Tales of the Day makes journaling a delightful habit.

-----

## ✨ Key Features

  * **🔐 Secure User Authentication:** Users can sign up, log in, and reset their passwords. Sessions are managed securely using **Firebase Authentication**.
  * **✍️ Daily Storytelling:** Write and save daily tales with a title, category, and rich text content.
  * **🔒 Client-Side Encryption:** For ultimate privacy, the content of every tale is encrypted using `crypto-js` before being sent to the database. Not even the administrator can read the entries.
  * **🗓️ Calendar View:** Easily navigate and revisit your past entries with an intuitive calendar view that visually marks the days you've written a tale.
  * **🎙️ Voice Notes:** Don't feel like typing? Record your thoughts using your microphone, and the app's speech-to-text feature will transcribe them for you.
  * **🎨 Shareable Tale Cards:** Transform your favorite tales into stunning, shareable cards. Customize them with different themes and sizes, then download them as a PNG image.
  * **🌙 Dark Mode:** A sleek dark mode for a comfortable writing experience in low-light conditions.
  * **🔥 Real-time Database:** All tales are stored and synced in real-time using **Cloud Firestore**.

-----

## 🛠️ Tech Stack

This project is built with a modern and powerful set of technologies:

  * **Frontend:** React, Vite
  * **Backend & Database:** Firebase (Authentication, Cloud Firestore)
  * **Styling:** Tailwind CSS with PostCSS
  * **Routing:** React Router
  * **Animations:** Framer Motion
  * **Icons:** Lucide React
  * **Notifications:** React Hot Toast
  * **HTML to Image:** `html2canvas`
  * **Encryption:** `crypto-js`
  * **Linting:** ESLint

-----

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

  * `npm`
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/tales-of-the-day.git
    cd tales-of-the-day
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Set up your Firebase configuration:**
      * Create a project on the [Firebase Console](https://console.firebase.google.com/).
      * Add a new web app to your project.
      * In your project settings, find your Firebase SDK snippet (select "Config").
      * Create a `.env` file in the root of your project directory.
      * Add your Firebase configuration keys to the `.env` file like this:
        ```env
        VITE_API_KEY="AIzaSy..."
        VITE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
        VITE_PROJECT_ID="your-project-id"
        VITE_STORAGE_BUCKET="your-project-id.appspot.com"
        VITE_MESSAGING_SENDER_ID="..."
        VITE_APP_ID="1:..."
        ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Your application should now be running on `http://localhost:5173` (or another port if 5173 is busy).

-----

## 🔥 Firestore Security Rules

For the application to function securely, you must set up Firestore Security Rules. Go to your Firebase project's **Firestore Database \> Rules** tab and paste the following:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /tales/{taleId} {
      // A user can create a tale if they are logged in and the tale's UID matches their own.
      allow create: if request.auth != null &&
                      request.auth.uid == request.resource.data.uid;

      // A user can read, update, or delete a tale if they are logged in and are the owner.
      allow read, update, delete: if request.auth != null &&
                                  request.auth.uid == resource.data.uid;
    }
  }
}
```

-----

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
