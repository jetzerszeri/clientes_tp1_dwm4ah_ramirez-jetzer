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
            // window.location.href = '/';
            console.log('SI es admin');
            // adminOptionsContainer.innerHTML +=`
            // <li><i class="fa-solid fa-hand-sparkles"></i><span>Servicios</span></li>
            // <li><i class="fa-solid fa-table-list"></i><span>Categorías</span></li>
            // <li><i class="fa-solid fa-comments"></i><span>Chat</span></li>
            // `;

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