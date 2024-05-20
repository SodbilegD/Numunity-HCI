import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnBnpTtT4nbiI80cPolO1SvP7QtpTmpcU",
  authDomain: "chat-eef95.firebaseapp.com",
  projectId: "chat-eef95",
  storageBucket: "chat-eef95.appspot.com",
  messagingSenderId: "925258219708",
  appId: "1:925258219708:web:7c1dee6ea5913e4dbe10b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

export { app, auth, storage, db };


