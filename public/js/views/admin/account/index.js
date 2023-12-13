import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let accountIndexBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Mi cuenta'}
];

let accountIndexBreadcrumbs = app.main.displayBreadcrumb(accountIndexBreadcrumbList, renderAdminView);

let myAccountView = app.create.element('div', ['accountInfo']);
let editNameLink = app.create.element('a', ['btn'], 'Editar nombre y apellido');
editNameLink.href = '#adminMyAccount';


let accountDataContainer = app.create.element('div', ['accountDataContainer']);
let accountImgContainer = app.create.element('form', ['accountImgContainer']);

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

accountData.append(accountDataInfo, editNameLink);
accountDataContainer.append(accountData);
myAccountView.append(accountImgContainer, accountDataContainer);


const formEditName = app.create.element('form', ['formEditName']);
formEditName.innerHTML = `
    <h3>Editar nombre y apellido</h3>
    <div>
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name">
        <p class="error-message"></p>
    </div>
    <div>
        <label for="lastname">Apellido</label>
        <input type="text" id="lastname" name="lastname">
        <p class="error-message"></p>
    </div>
    <div>
    <button type="submit" class="btn primary-green">Guardar cambios</button>
    </div>
`;


function updateNameAndLastname(form, uid){
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        app.main.clearErrorMessages('form p');
        let inputsValidated = app.main.validateEmptyFields([form.name, form.lastname]);
        if (!inputsValidated) return;
        app.admin.updateNameAndLastnameOnFirestore(uid, form.name.value, form.lastname.value);
        
    });
}

app.admin.loadUserAccountData(accountImgContainer, accountDataInfo, updateNameAndLastname, editNameLink, accountDataContainer, formEditName);


function test(){
}

let adminMyAccountRouterContent = {
    content: myAccountView,
    breadcrumb: accountIndexBreadcrumbs, 
    h2Text: 'Mi cuenta',
    render: test
};


export { adminMyAccountRouterContent}


