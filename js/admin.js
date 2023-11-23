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

function verifyUser(adminOptionsContainer, arrayAdmin, chatBtn, container) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            // checkUserRole(uid, adminOptionsContainer, arrayAdmin, chatBtn);  // Llama a la función
            
            // if (isAdmin(uid)) {
            //     console.log('SI es admin');
            //     arrayAdmin.forEach((item) => {
            //         adminOptionsContainer.appendChild(item);
            //     });
            // } else {
            //     adminOptionsContainer.appendChild(chatBtn);
            // }

            // console.log(isAdmin(uid)); 
            isAdmin(uid).then((result) => {
                // if (result) {
                //     console.log('SI es admin');
                //     arrayAdmin.forEach((item) => {
                //         adminOptionsContainer.appendChild(item);
                //     });
                // } else {
                //     adminOptionsContainer.appendChild(chatBtn);
                // }

                displayAdminBtns(adminOptionsContainer, arrayAdmin, chatBtn, result);
            });

        } else {
            container.innerHTML = '';
            let errorH1 = document.createElement('h1');
            errorH1.textContent = 'Debes iniciar sesión para ver esta página';
            let errorA = document.createElement('a');
            errorA.href = '/app.html#login';
            errorA.classList.add('btn');
            errorA.textContent = 'Iniciar sesión';
            container.appendChild(errorH1);
            container.appendChild(errorA);

            window.location.href = '/app.html#login'

            errorA.addEventListener('click', () => {
                location.reload();
            });

            // container.innerHTML = `
            //     <h1>Debes iniciar sesión para ver esta página</h1>
            //     <a href="/app.html#login" class="btn">Iniciar sesión</a>
            // `;
            // window.location.href = '/app.html#login';
            // container = login;
            // location.reload();
        }
    });
}


async function isAdmin(uid) {
    const docRef = doc(dbfirestore, "roles_by_user", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const role = docSnap.data().role;
        if (role == 'admin') {
            console.log('SI es admin');
            return true;
        } else {
            console.log('NO es admin');
            return false;
        }
    } 
}

function displayAdminBtns(adminOptionsContainer, arrayAdmin, chatBtn, admin){
    if (admin) {
        console.log('SI es admin');
        arrayAdmin.forEach((item) => {
            adminOptionsContainer.appendChild(item);
        });
    } else {
        adminOptionsContainer.appendChild(chatBtn);
    }

}


export { verifyUser };