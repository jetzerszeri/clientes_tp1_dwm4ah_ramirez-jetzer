import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let accountIndexBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Mi cuenta'}
];

let accountIndexBreadcrumbs = app.main.displayBreadcrumb(accountIndexBreadcrumbList, renderAdminView);

let servicesList = app.create.element('div');
let addNewLink = app.create.element('a', ['btn'], 'Editar');
addNewLink.href = '#adminMyAccountEdit';
addNewLink.addEventListener('click', () => { renderAdminView('#adminMyAccountEdit') });


let accountDataContainer = app.create.element('div', ['accountDataContainer']);
let accountImgContainer = app.create.element('div', ['accountImgContainer']);
let accountImg = app.create.element('img', ['accountImg']);
let accountData = app.create.element('div', ['accountData']);

let h2 = app.create.element('h2', [], 'Jake Ramirez');
accountData.append(h2);

accountImgContainer.append(accountImg);
accountDataContainer.append(accountImgContainer, accountData);

servicesList.append(addNewLink, accountDataContainer);

function test(){
    console.log('test');
}

let adminMyAccountRouterContent = {
    content: servicesList,
    breadcrumb: accountIndexBreadcrumbs, 
    h2Text: 'Mi cuenta',
    render: test
};


export { adminMyAccountRouterContent}


