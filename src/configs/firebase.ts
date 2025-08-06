// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_API_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_API_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_API_FIREBASE_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_API_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_API_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
