// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_O2n8joFWoJmxwtAoE4BG5hs1dmTJcf4",
  authDomain: "proyectondas-4fc25.firebaseapp.com",
  projectId: "proyectondas-4fc25",
  storageBucket: "proyectondas-4fc25.firebasestorage.app",
  messagingSenderId: "515657564559",
  appId: "1:515657564559:web:1f45e85d0774412c5dcbfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };