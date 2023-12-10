import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let accountIndexBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Mi cuenta'}
];

let accountIndexBreadcrumbs = app.main.displayBreadcrumb(accountIndexBreadcrumbList, renderAdminView);

let myAccountView = app.create.element('div', ['accountInfo']);
let addNewLink = app.create.element('a', ['btn'], 'Editar nombre');
addNewLink.href = '#adminMyAccountEdit';
addNewLink.addEventListener('click', () => { renderAdminView('#adminMyAccountEdit') });


let accountDataContainer = app.create.element('div', ['accountDataContainer']);
let accountImgContainer = app.create.element('form', ['accountImgContainer']);
// let accountImg = app.create.element('img', ['accountImg']);
// accountImg.src = 'img/account-icon.svg';
// accountImg.alt = 'avatar de usuario';

accountImgContainer.innerHTML = `
<label for="imageInput" class="labelImgInput">                     
    <p>Cambiar foto</p>
</label>
<input type="file" id="imageInput" accept="image/*" name="img">
`;





let accountData = app.create.element('div', ['accountData']);
let accountDataInfo = app.create.element('div');
accountDataInfo.innerHTML = `
    <h3>Jake Ramirez</h3>
    <p>Administrador</p>
`;

accountData.append(accountDataInfo, addNewLink);

let accountData2 = app.create.element('div', ['accountData2']);
let accountDataInfo2 = app.create.element('p', [], 'jake@mail.com');

let editEmailLink = app.create.element('a', ['btn'], 'Editar email y contraseña');
editEmailLink.href = '#adminMyAccountEditEmail';
editEmailLink.addEventListener('click', () => { renderAdminView('#adminMyAccountEditEmail') });

accountData2.append(accountDataInfo2, editEmailLink);


accountDataContainer.append(accountData, accountData2);
myAccountView.append(accountImgContainer, accountDataContainer);

function test(){
    console.log('test');
}

let adminMyAccountRouterContent = {
    content: myAccountView,
    breadcrumb: accountIndexBreadcrumbs, 
    h2Text: 'Mi cuenta',
    render: test
};


export { adminMyAccountRouterContent}


