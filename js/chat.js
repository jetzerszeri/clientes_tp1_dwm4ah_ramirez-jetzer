import app from './config.js';
// import { success, successMsgAdd, createChat } from './js/partials.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import {getDatabase, ref, set, push, query, orderByChild, equalTo, onValue, update} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';

const dbfirestore = getFirestore(app);
const db = getDatabase(app);
const auth = getAuth(app);
// const currentChats = document.querySelector('.chatList ul');
let currentChatId;
let currentUserId;
// let chatConversation = document.querySelector('.chatConversation');



//funcion para traer el nombre del usuario del chat
async function getTheNameOfTheUser(usuarioId) {
    const docRef = doc(dbfirestore, "roles_by_user", usuarioId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const {nombre, apellido} = docSnap.data();
        return nombre + ' ' + apellido;
    } else {
        console.log("No existe");
    }
}

function testChatFunctions(){
    console.log('ChatFunctions work');
}


const chatFuncions = {
    testChatFunctions
}

export { chatFuncions };
