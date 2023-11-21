import app from './js/config.js';
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const auth = getAuth(app);

function signInWithEmailAndPasswordHandler(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

function clearErrorMessages(query) {
    const errorMessages = document.querySelectorAll(query);
    errorMessages.forEach((msj) => {
        msj.remove();
    });
}

function displayErrorMessage(message, targetElement) {
    const p = document.createElement('p');
    p.classList.add('errorForMmsg');
    p.innerText = message;

    if (targetElement == form){
        targetElement.prepend(p);
    } else {
        targetElement.parentElement.appendChild(p);
    }
}

export { signInWithEmailAndPasswordHandler, clearErrorMessages, displayErrorMessage }