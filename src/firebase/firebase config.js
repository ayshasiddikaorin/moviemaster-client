// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// তোমার প্রজেক্টের কনফিগ
const firebaseConfig = {
  apiKey: "AIzaSyCYuFhs0yBrxGqgpWAUsS8Ru7tmLLSnETw",
  authDomain: "moviemaster-pro-ce383.firebaseapp.com",
  projectId: "moviemaster-pro-ce383",
  storageBucket: "moviemaster-pro-ce383.firebasestorage.app",
  messagingSenderId: "643366798969",
  appId: "1:643366798969:web:2de05e3ec9646fef21b6a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);