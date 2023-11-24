import app from '../app.js'
import {servicesIndexBreadcrumbs, servicesList, renderServicesTable} from './admin/services/index.js';

const admin = app.create.element('main', ['adminmain']);

let breadcrumbItems = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard'},
];

const adminOptions = app.create.element('ul', ['admindoptions']);
const categories = app.create.element('div', [], 'Categorías');
const chat = app.create.element('div', [], 'Chat');



let adminBreadcrumbs = app.main.displayBreadcrumb(breadcrumbItems, renderAdminView);
let breadcrumbs = app.create.element('div');
breadcrumbs.append(adminBreadcrumbs);

const h1 = app.create.element('h1', false, 'Panel de administrador');
const h2 = app.create.element('h2', [], 'Bienvenido de nuevo!');

const adminViewContent = app.create.element('div');



const adminRouter = {
    '#admin': {
        content: adminOptions,
        breadcrumb: adminBreadcrumbs, 
        h2Text: 'Bienvenido de nuevo!'
    },
    '#adminServices': {
        content: servicesList,
        breadcrumb: servicesIndexBreadcrumbs, 
        h2Text: 'Lista de servicios',
        render: renderServicesTable
    },
    '#adminCategories': {
        content: categories,
        breadcrumb: servicesIndexBreadcrumbs, 
        h2Text: 'Gestión de categorías'
    },
    '#adminChat': {
        content: chat,
        breadcrumb: servicesIndexBreadcrumbs, 
        h2Text: 'Chat de administración'
    }
};





let servicesBtn = app.admin.createAdminBtn('#adminServices', 'fa-hand-sparkles', 'ServiciosbT', renderAdminView, adminRouter['#adminServices'].render);
let categoriesBtn = app.admin.createAdminBtn('#adminCategories', 'fa-table-list', 'Categorías', renderAdminView);
let chatBtn = app.admin.createAdminBtn('#adminChat', 'fa-comments', 'Chat', renderAdminView);



app.admin.verifyUser(adminOptions, [servicesBtn, categoriesBtn, chatBtn], chatBtn, admin);
let currentHash = window.location.hash;

if (currentHash == 'undefined') {
    currentHash = '#admin';
}

renderAdminView(currentHash);

admin.append(breadcrumbs);
admin.append(h1);
admin.append(h2);
admin.append(adminViewContent);

function renderAdminView(view) {
    adminViewContent.innerHTML = '';
    breadcrumbs.innerHTML = '';

    let currentView = adminRouter[view];
    view = currentView ? view : '#admin';

    console.log(view);
    adminViewContent.append(adminRouter[view].content);
    breadcrumbs.append(adminRouter[view].breadcrumb);
    h2.textContent = adminRouter[view].h2Text;

    window.addEventListener("load", () => {
        if (adminRouter[view].render) {
            adminRouter[view].render();
        }
    });
}


export default admin;
export { renderAdminView };