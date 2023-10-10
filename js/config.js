// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6f2jvDSOjjaqoKvVqsFRGT2k3eEi9N-w",
  authDomain: "tp1-clientes-dwm4ah.firebaseapp.com",
  projectId: "tp1-clientes-dwm4ah",
  storageBucket: "tp1-clientes-dwm4ah.appspot.com",
  messagingSenderId: "204408047429",
  appId: "1:204408047429:web:fe7e7a541ebd87767de02c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;