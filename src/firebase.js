import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ7oRX60oY932zdfHFtGYNTv7iTalAXJk",
  authDomain: "chatroom-5046.firebaseapp.com",
  projectId: "chatroom-5046",
  storageBucket: "chatroom-5046.appspot.com",
  messagingSenderId: "312999332143",
  appId: "1:312999332143:web:1d7516746608f2318c39da",
  measurementId: "G-CYF6B7WZKT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
