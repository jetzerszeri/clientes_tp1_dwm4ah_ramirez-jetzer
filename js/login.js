import app from './js/config.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const auth = getAuth(app);

function signInWithEmailAndPasswordHandler(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}