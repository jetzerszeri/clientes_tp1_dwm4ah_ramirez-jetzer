import app from './config.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, setDoc, doc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';
import {getDatabase, ref, set, push} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';

const auth = getAuth(app);
const db = getFirestore(app);
const db2 = getDatabase(app);

function createUserAndSetDocument(email, password, name, lastname) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
            let user = credentials.user.uid;
            return setDoc(doc(db, "roles_by_user", user), {
                "nombre": name,
                "apellido": lastname,
                "role": 'customer',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            }).then(() => user);
            
        })
}

function createChat(currentUser) {

    const chatRef = ref(db2, 'chats');
    const newChatRef = push(chatRef);

    return set(newChatRef, {
        lastMessage: 'último mensaje',
        fecha: Date.now(),
        participants: { [currentUser]: true, 'LIsaefMu3BYpF2jINUV9RH78EZs2': true }
    });
}

export { createUserAndSetDocument, createChat }

