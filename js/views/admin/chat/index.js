import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let chatIndexBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Chat'}
];

let chatIndexBreadcrumbs = app.main.displayBreadcrumb(chatIndexBreadcrumbList, renderAdminView);
let misChats = app.create.element('div', ['misChats']);
let chatContainer = app.create.element('div', ['chatContainer']);
let chatListContainer = app.create.element('div', ['chatList']);
let chatTitleContainer = app.create.element('div');
let chatTitle = app.create.element('p', [], 'Mis Chats');
let chatList = app.create.element('ul'); //lista de chats
let chatConversation = app.create.element('div', ['chatConversation']);

chatTitleContainer.appendChild(chatTitle);
chatListContainer.appendChild(chatTitleContainer);
chatListContainer.appendChild(chatList);

chatContainer.appendChild(chatListContainer);
chatContainer.appendChild(chatConversation);
misChats.appendChild(chatContainer);







app.chat.loadChats(chatList, chatConversation);

function test(){
    // console.log('test from chat');
}

let adminChatRouterContent = {
    content: misChats,
    breadcrumb: chatIndexBreadcrumbs, 
    h2Text: 'Centro de contacto',
    render: test
};

export { adminChatRouterContent };