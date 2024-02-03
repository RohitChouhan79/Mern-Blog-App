// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a4b70.firebaseapp.com",
  projectId: "mern-blog-a4b70",
  storageBucket: "mern-blog-a4b70.appspot.com",
  messagingSenderId: "500020726833",
  appId: "1:500020726833:web:ac50016b228dbda902d910"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);