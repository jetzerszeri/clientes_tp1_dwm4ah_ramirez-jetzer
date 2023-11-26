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

    let mensaje = document.createElement('div');
    mensaje.classList.add('confirmation');
    let p = document.createElement('p');
    p.innerText = text;
    let div = document.createElement('div');
    let a = document.createElement('a');
    a.href = btnlink;
    a.classList.add('btn');
    a.innerText = 'Ver listado';
    div.appendChild(a);
    mensaje.appendChild(p);
    mensaje.appendChild(div);

    a.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = btnlink;
        location.reload();
    });
    
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