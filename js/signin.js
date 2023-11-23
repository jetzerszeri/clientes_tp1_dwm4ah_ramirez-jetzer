import app from './config.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, setDoc, doc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';
import {getDatabase, ref, set, push} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';

const auth = getAuth(app);
const db = getFirestore(app);
const db2 = getDatabase(app);
// let user;

function createUserAndSetDocument(email, password, name, lastname) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
            let user = credentials.user.uid;
            console.log('user created');
            console.log(user);
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
    console.log (currentUser, 'user en createChat')

    const chatRef = ref(db2, 'chats');
    const newChatRef = push(chatRef);

    return set(newChatRef, {
        lastMessage: 'último mensaje',
        fecha: Date.now(),
        participants: { [currentUser]: true, 'LIsaefMu3BYpF2jINUV9RH78EZs2': true }
    });
}

export { createUserAndSetDocument, createChat }




    
    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     let { name, lastname, email, password } = form;
    //     console.log(name.parentElement);


    //     let user;

    //     createUserWithEmailAndPassword(auth, email.value, password.value)
    //     .then((credentials) => {
    //         user = credentials.user.uid;
    
    //         console.log(user);
    //         console.log('Se creó el usuario');
    //         return setDoc(doc(db, "roles_by_user", user), {
    //             "nombre": name.value,
    //             "apellido": lastname.value,
    //             "role": 'customer',
    //             createdAt: serverTimestamp(),
    //             updatedAt: serverTimestamp()
    //         });
    //     })
    //     .then(() => {

    //             console.log('entré a createChat')
    //             const chatRef = ref(db2, 'chats');
    //             const newChatRef = push(chatRef);
    //             return set(newChatRef, {
    //                 lastMessage: 'último mensaje',
    //                 fecha: Date.now(),
    //                 participants: { [user]: true, 'LIsaefMu3BYpF2jINUV9RH78EZs2':true}
    //             })

            
    //     })
    //     .then(() => {
    //         window.location.href = '/admin.html';
    //     })
    //     .catch((error) => {

    //         if (error.message.includes('invalid-email')){
    //             email.parentElement.innerHTML += `<p>El email ingresado no es válido</p>`;
    //         } else if (error.message.includes('missing-password')){
    //             password.parentElement.innerHTML += `<p>La contraseña no puede estar vacía</p>`;
    //         } else if (error.message.includes('weak-password')){
    //             password.parentElement.innerHTML += `<p>La contraseña debe tener al menos 6 caracteres</p>`;
    //         } else if (error.message.includes('email-already-in-use')){
    //             email.parentElement.innerHTML += `<p>Este email ya tiene una cuenta</p>`;
    //         }
    //     });

        

    // })


// function createUserAndChat(auth, email, password, name, lastname) {
//     return createUserWithEmailAndPassword(auth, email, password)
//         .then((credentials) => {
//             const user = credentials.user.uid;
//             const db = getFirestore(app);
//             const db2 = getDatabase(app);

//             return Promise.all([
//                 setDoc(doc(db, "roles_by_user", user), {
//                     "nombre": name,
//                     "apellido": lastname,
//                     "role": 'customer',
//                     createdAt: serverTimestamp(),
//                     updatedAt: serverTimestamp()
//                 }),
//                 createChat(db2, user)
//             ]);
//         })
//         .then(() => {
//             window.location.href = '/admin.html';
//         })
//         .catch((error) => {
//             if (error.message.includes('invalid-email')) {
//                 email.parentElement.innerHTML += `<p>El email ingresado no es válido</p>`;
//             } else if (error.message.includes('missing-password')) {
//                 password.parentElement.innerHTML += `<p>La contraseña no puede estar vacía</p>`;
//             } else if (error.message.includes('weak-password')) {
//                 password.parentElement.innerHTML += `<p>La contraseña debe tener al menos 6 caracteres</p>`;
//             } else if (error.message.includes('email-already-in-use')) {
//                 email.parentElement.innerHTML += `<p>Este email ya tiene una cuenta</p>`;
//             }
//         });
// }

// function createChat(db2, user) {
//     const chatRef = ref(db2, 'chats');
//     const newChatRef = push(chatRef);

//     return set(newChatRef, {
//         lastMessage: 'último mensaje',
//         fecha: Date.now(),
//         participants: { [user]: true, 'LIsaefMu3BYpF2jINUV9RH78EZs2': true }
//     });
// }