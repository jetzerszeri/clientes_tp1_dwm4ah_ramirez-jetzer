// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6f2jvDSOjjaqoKvVqsFRGT2k3eEi9N-w",
  authDomain: "tp1-clientes-dwm4ah.firebaseapp.com",
  databaseURL: "https://tp1-clientes-dwm4ah-default-rtdb.firebaseio.com",
  projectId: "tp1-clientes-dwm4ah",
  storageBucket: "tp1-clientes-dwm4ah.appspot.com",
  messagingSenderId: "204408047429",
  appId: "1:204408047429:web:fe7e7a541ebd87767de02c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const navbarBtn = document.querySelector('.navbar-links .btn');
const dashboardBtn = document.querySelector('.navbar-links ul li:last-child');
// console.log(dashboardBtn);
// console.log(navbarBtn);

if(navbarBtn){

  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navbarBtn.innerHTML = 'Cerrar sesión';
      navbarBtn.addEventListener('click', () => {
        auth.signOut();
      })
      document.querySelector('.avatarNavbar').style.display = 'block';
    } else if(dashboardBtn){
      dashboardBtn.remove();
      navbarBtn.innerHTML = 'Iniciar sesión';
      document.querySelector('.avatarNavbar').style.display = 'none';
    }
  });
}

export default app;