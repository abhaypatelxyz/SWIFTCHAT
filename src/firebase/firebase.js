// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdmB9XmcBEULc-MUUgqk157SNr3keTeJ4",
  authDomain: "whatsapp-clone-1751d.firebaseapp.com",
  projectId: "whatsapp-clone-1751d",
  storageBucket: "whatsapp-clone-1751d.appspot.com",
  messagingSenderId: "329720356774",
  appId: "1:329720356774:web:0fceb4534f507cc289b967",
  measurementId: "G-RLWWK7PZXY",
  databaseURL: 'https://whatsapp-clone-1751d-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
