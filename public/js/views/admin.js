import app from '../app.js'
import {servicesIndexBreadcrumbs, servicesList, renderServicesTable, adminServicesRouterContent} from './admin/services/index.js';
import { adminServicesCreateRouterContent } from './admin/services/create.js';
import { adminServicesEditRouterContent } from './admin/services/edit.js';
import { adminCategoriesRouterContent } from './admin/categories/index.js';
import { adminCategoriesCreateRouterContent } from './admin/categories/create.js';
import { adminCategoriesEditRouterContent } from './admin/categories/edit.js';
import { adminChatRouterContent } from './admin/chat/index.js';
import { adminMyAccountRouterContent } from './admin/account/index.js';

const admin = app.create.element('main', ['adminmain']);

let breadcrumbItems = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard'},
];

const adminOptions = app.create.element('ul', ['admindoptions']);
let renderTimes = 0;


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
    '#adminServices': adminServicesRouterContent,
    '#adminCategories': adminCategoriesRouterContent,
    '#adminChat': adminChatRouterContent,
    '#adminServicesCreate': adminServicesCreateRouterContent,
    '#adminServicesEdit': adminServicesEditRouterContent,
    '#adminCategoriesCreate': adminCategoriesCreateRouterContent,
    '#adminCategoriesEdit': adminCategoriesEditRouterContent,
    '#adminMyAccount': adminMyAccountRouterContent,
};

let servicesBtn = app.admin.createAdminBtn('#adminServices', 'fa-hand-sparkles', 'Servicios', renderAdminView, adminRouter['#adminServices'].render);
let categoriesBtn = app.admin.createAdminBtn('#adminCategories', 'fa-table-list', 'Categorías', renderAdminView, adminRouter['#adminCategories'].render);
let chatBtn = app.admin.createAdminBtn('#adminChat', 'fa-comments', 'Chat', renderAdminView, adminRouter['#adminChat'].render);

let currentHash = window.location.hash;

if (currentHash.startsWith('#admin')) {
    loadAdminView();
}

function loadAdminView(){
    app.admin.verifyUser(adminOptions, [servicesBtn, categoriesBtn, chatBtn], chatBtn, admin);
}
renderAdminView(currentHash);

admin.append(breadcrumbs);
admin.append(h1);
admin.append(h2);
admin.append(adminViewContent);

function renderAdminView(view) {
    adminViewContent.innerHTML = '';
    breadcrumbs.innerHTML = '';

    const { base, id } = parseHash(view);
    let currentView = adminRouter[base];
    view = currentView ? base : '#admin';

    
    adminViewContent.append(adminRouter[view].content);
    breadcrumbs.append(adminRouter[view].breadcrumb);
    h2.textContent = adminRouter[view].h2Text;

    if (adminRouter[view].render) {
        adminRouter[view].render(id);
    }
    renderTimes += 1;
}


function parseHash(hash) {
    const [base, paramString] = hash.split('?');
    let id = null;

    if (paramString) {
        const params = paramString.split('&');
        for (let param of params) {
            const [key, value] = param.split('=');
            if (key === 'id') {
                id = value;
                break; 
            }
        }
    }

    return { base, id };
}


Dropzone.autoDiscover = false;

// export default admin;
export { renderAdminView,  admin, loadAdminView};