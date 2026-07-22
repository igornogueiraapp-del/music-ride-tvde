import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpWrfH5nECbZQifP0EYXw2d8m31ChfsZo",
  authDomain: "ridetune-2cecc.firebaseapp.com",
  projectId: "ridetune-2cecc",
  storageBucket: "ridetune-2cecc.firebasestorage.app",
  messagingSenderId: "731412434399",
  appId: "1:731412434399:web:92bf1bd7a4fef516f1486a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export { collection, addDoc, serverTimestamp };
