import app from './config.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import {getDatabase, ref, set} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';

const db = getDatabase(app);
const auth = getAuth(app);
const dbfirestore = getFirestore(app);

async function checkUserRole(uid, adminOptionsContainer, arrayAdmin, chatBtn) {
    const docRef = doc(dbfirestore, "roles_by_user", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const role = docSnap.data().role;
        if (role == 'admin') {
            console.log('SI es admin');
            arrayAdmin.forEach((item) => {
                adminOptionsContainer.appendChild(item);
            });

        } else {
            adminOptionsContainer.appendChild(chatBtn);
        }
    } 
}

function verifyUser(adminOptionsContainer, arrayAdmin, chatBtn) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            checkUserRole(uid, adminOptionsContainer, arrayAdmin, chatBtn);  // Llama a la función
    
        } else {
            window.location.href = '/login.html';
        }
    });
}

export { verifyUser };