import app from './config.js';
import { element } from './create.js';
// import { success, successMsgAdd, createChat } from './js/partials.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import {getDatabase, ref, set, push, query, orderByChild, equalTo, onValue, update} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';

const dbfirestore = getFirestore(app);
const db = getDatabase(app);
const auth = getAuth(app);
let currentUserId;

function loadChats(chatsList, chatConversation){
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            currentUserId = uid;
            getUserChats(uid, chatsList, chatConversation);
        }
    });

}


async function getUserChats(uid, chatsList, chatConversation){
    const docRef = doc(dbfirestore, "roles_by_user", uid);
    const userDocument = await getDoc(docRef);

    if (userDocument.exists()) {

        const chatsRef = ref(db, 'chats');
        const userChatsQuery = query(chatsRef, orderByChild(`participants/${uid}`), equalTo(true));

        onValue(userChatsQuery, (snapshot) => {
            if (snapshot.hasChildren()){
                snapshot.forEach(childSnapshot => {
                    const chat = childSnapshot.val();
                    const chatId = childSnapshot.key;
                    const participants = Object.keys(chat.participants);
                    const personIdChat = participants.filter((participant) => participant !== uid);
                    renderChatName(personIdChat[0], chatId, chatsList, chatConversation);
                })
            }
        });
    }
}



async function renderChatName(userId, idDelChat, currentChats, chatConversation) {
    let nombre = await getTheNameOfTheUser(userId);
    let li = document.createElement('li');
    li.innerHTML = nombre;
    currentChats.appendChild(li);
    li.addEventListener('click', ( ) => {
        renderChatConversation(chatConversation, nombre, idDelChat);
    })
}



async function getTheNameOfTheUser(usuarioId) {
    const docRef = doc(dbfirestore, "roles_by_user", usuarioId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const {nombre, apellido} = docSnap.data();
        return nombre + ' ' + apellido;
    }
}



function renderChatConversation(chatConversationContainer, personName, chatId){
    chatConversationContainer.innerHTML = '';
    let chatName = element('div', ['chatName'], personName);
    chatConversationContainer.appendChild(chatName);
    let chatMessages = element('div', ['chatMessages']);
    chatConversationContainer.appendChild(chatMessages);
    let chatForm = element('form', ['chatForm']);
    chatForm.innerHTML = `
        <textarea name="texto" id="textochat"></textarea>
        <button type="submit" class="btn">Enviar</button>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatConversationContainer.appendChild(chatForm);
    getMessagesOfThisChat(chatId, chatMessages);
    sendAMsg(chatForm, chatId);
}


async function getMessagesOfThisChat(currentChatId, chatMessages) {
    const messagesRef = ref(db, `messages/${currentChatId}`);
    const messagesQuery = query(messagesRef, orderByChild('timestamp'));

    onValue(messagesQuery, (snapshot) => {
        if (snapshot.hasChildren()) {
            chatMessages.innerHTML = '';
            snapshot.forEach(childSnapshot => {
                const message = childSnapshot.val();

                const {senderId, text, timestamp} = message;
                const hora =  timestampToReadableDateAndTime(timestamp)

                let divMsg = element('div');
                if (senderId == currentUserId) {
                    divMsg.classList.add('sent');
                } else {
                    divMsg.classList.add('received');
                }
                divMsg.innerHTML = `<p>${text}</p><p>${hora}</p>`;
                chatMessages.appendChild(divMsg);
            });
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };
    });
}


function sendAMsg(form, currentChatId){
    const {texto} = form;

    form.addEventListener('submit', (e) => {
        e.preventDefault();   
        if (texto.value.trim() === "") {
            return;
        }

        sendMessage(currentChatId, currentUserId, texto.value);
        form.reset();
    });
}



//funcion para agregar un mensaje al chat
async function sendMessage(chatId, userId, text) {
    const messagesRef = ref(db, `messages/${chatId}`);
    const newMessageRef = push(messagesRef);
    
    const message = { senderId: userId, text: text, timestamp: Date.now()};

    try {
        await set(newMessageRef, message);
        const chatRef = ref(db, `chats/${chatId}`);
        await update(chatRef, { lastMessage: text, fecha: Date.now() });
    } catch (error) {
        console.log(error);
    };
}



function timestampToReadableDateAndTime(timestamp) {
    const date = new Date(timestamp);

    let day = date.getDate();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear().toString().substr(-2);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const formattedDate = month + '/' + day + '/' + year;
    const formattedTime = hours + ':' + minutes;
    return formattedDate + ', ' + formattedTime; 
}



const chatFuncions = {
    loadChats
}

export { chatFuncions };
