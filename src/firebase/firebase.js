// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database'; // Import Realtime Database functions

const firebaseConfig = {
  apiKey: "AIzaSyAdmB9XmcBEULc-MUUgqk157SNr3keTeJ4",
  authDomain: "whatsapp-clone-1751d.firebaseapp.com",
  projectId: "whatsapp-clone-1751d",
  storageBucket: "whatsapp-clone-1751d.appspot.com",
  messagingSenderId: "329720356774",
  appId: "1:329720356774:web:0fceb4534f507cc289b967",
  measurementId: "G-RLWWK7PZXY",
  databaseURL: 'https://whatsapp-clone-1751d-default-rtdb.firebaseio.com/'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // Initialize Realtime Database

export { app,auth, database };
