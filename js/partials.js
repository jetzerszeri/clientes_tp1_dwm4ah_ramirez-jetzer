import app from './config.js';
import {getDatabase, ref, set, push} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';

const success = `
<div class="confirmation">
<p>El vehículo se ha registrado exitosamente!</p>
<div>
    <a href="/" class="btn">Ver listado</a>
</div>
</div>
`

const successMsgAdd = (text, btnlink) => {

    let mensaje  = `
    <div class="confirmation">
    <p>${text}</p>
    <div>
        <a href="${btnlink}" class="btn">Ver listado</a>
    </div>
    </div>
    `
    return mensaje;
}

const chatView = `
<div>
<h2>Chat</h2>

<form action="" class="chatForm">
    <textarea name="texto" id="textochat"></textarea>
    <button type="submit" class="btn primary-green">Enviar</button>
</form>




</div>

`
const db = getDatabase(app);

function createChat(participants) {
    console.log('entré a createChat')
    const chatRef = ref(db, 'chats');
    const newChatRef = push(chatRef);
    set(newChatRef, {
        lastMessage: 'último mensaje',
        fecha: Date.now(),
        participants: participants
    })
};

export {
    success,
    successMsgAdd,
    createChat,
}