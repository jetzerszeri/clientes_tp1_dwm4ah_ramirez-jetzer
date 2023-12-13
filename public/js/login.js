import app from './config.js';
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const auth = getAuth(app);

function signInWithEmailAndPasswordHandler(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export { signInWithEmailAndPasswordHandler }