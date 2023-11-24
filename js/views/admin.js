import app from '../app.js'
import {servicesIndexBreadcrumbs, servicesList } from './admin/services/index.js';

const admin = app.create.element('main', ['adminmain']);

let breadcrumbItems = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard'},
];

const adminOptions = app.create.element('ul', ['admindoptions']);

// const services = app.create.element('div', [], 'Servicios');
const categories = app.create.element('div', [], 'Categorías');
const chat = app.create.element('div', [], 'Chat');



let adminBreadcrumbs = app.main.displayBreadcrumb(breadcrumbItems, renderAdminView);
let breadcrumbs = app.create.element('div');
breadcrumbs.append(adminBreadcrumbs);

const h1 = app.create.element('h1', false, 'Panel de administrador');
const h2 = app.create.element('h2', [], 'Bienvenido de nuevo!');

const adminViewContent = app.create.element('div');
// adminViewContent.id = 'adminViewContent';



const adminRouter = {
    '#admin': {
        content: adminOptions,
        breadcrumb: adminBreadcrumbs, 
        h2Text: 'Bienvenido de nuevo!'
    },
    '#adminServices': {
        content: servicesList,
        breadcrumb: servicesIndexBreadcrumbs, // Breadcrumbs para servicios
        h2Text: 'Lista de servicios',
    },
    '#adminCategories': {
        content: categories,
        breadcrumb: servicesIndexBreadcrumbs, // Asumiendo breadcrumbs para categorías
        h2Text: 'Gestión de categorías'
    },
    '#adminChat': {
        content: chat,
        breadcrumb: servicesIndexBreadcrumbs, // Asumiendo breadcrumbs para chat
        h2Text: 'Chat de administración'
    }
};



// let servicesBtn = app.create.element('li');
// let servicesBtnLink = app.create.element('a');
// servicesBtnLink.href = '#adminServices';
// servicesBtnLink.innerHTML = `<i class="fa-solid fa-hand-sparkles adminBtn"></i><span>Servicios</span>`;
// servicesBtn.appendChild(servicesBtnLink);


// servicesBtn.innerHTML = `<a href="#adminServices"><i class="fa-solid fa-hand-sparkles adminBtn"></i><span>Servicios</span></a>`;

// let categoriesBtn = app.create.element('li')
// let categoriesBtnLink = app.create.element('a');
// categoriesBtnLink.href = '#adminCategories';
// categoriesBtnLink.innerHTML = `<i class="fa-solid fa-table-list adminBtn"></i><span>Categorías</span>`;
// categoriesBtn.appendChild(categoriesBtnLink);

// categoriesBtn.innerHTML = `<a href="#adminCategories"><i class="fa-solid fa-table-list adminBtn"></i><span>Categorías</span></a>`;

// let chatBtn = app.create.element('li')
// chatBtn.innerHTML = `<a href="#adminChat"><i class="fa-solid fa-comments adminBtn"></i><span>Chat</span></a>`;

// let adminBtns = [servicesBtnLink, categoriesBtnLink, chatBtn];
// adminBtns.forEach(btn => btn.addEventListener('click', renderAdminView));



function createAdminBtn (hash, icon, text, renderAdminViewFunction, renderTableFunction){
    let btn = app.create.element('li');
    let btnLink = app.create.element('a');
    btnLink.href = hash;
    btnLink.innerHTML = `<i class="fa-solid ${icon} adminBtn"></i><span>${text}</span>`;
    btn.appendChild(btnLink);
    // btnLink.addEventListener('click', renderAdminViewFunction(hash));
    btnLink.addEventListener('click', () => {
        renderAdminViewFunction(hash);
        // renderTableFunction();
    });
    return btn;
}

let servicesBtn = createAdminBtn('#adminServices', 'fa-hand-sparkles', 'ServiciosbT', renderAdminView, adminRouter['#adminServices'].render);

let categoriesBtn = createAdminBtn('#adminCategories', 'fa-table-list', 'Categorías', renderAdminView);

let chatBtn = createAdminBtn('#adminChat', 'fa-comments', 'Chat', renderAdminView);

// app.main.renderView(servicesBtn, '#adminServices');
// app.main.renderView(categoriesBtn, '#adminCategories');
// app.main.renderView(chatBtn, '#chat');




// adminOptions.innerHTML = `
//     <li><a href="#adminServices"><i class="fa-solid fa-hand-sparkles adminBtn"></i><span>Servicios</span></a></li>
//     <li><a href="#adminCategories"><i class="fa-solid fa-table-list adminBtn"></i><span>Categorías</span></a></li>
//     <li><a href="#adminChat"><i class="fa-solid fa-comments adminBtn"></i><span>Chat</span></a></li>
// `;

// adminOptions.appendChild(servicesBtn);
// adminOptions.appendChild(categoriesBtn);
// adminOptions.appendChild(chatBtn);

app.admin.verifyUser(adminOptions, [servicesBtn, categoriesBtn, chatBtn], chatBtn, admin);
// let currentUser = app.admin.verifyUser();
// console.log(currentUser);

// adminViewContent.appendChild(adminOptions);
let currentHash = window.location.hash;
// currentHash = currentHash ? 'undefined' : '#admin';
if (currentHash == 'undefined') {
    currentHash = '#admin';
}
// renderAdminView(window.location.hash);
// console.log(currentHash);
renderAdminView(currentHash);



admin.append(breadcrumbs);
admin.append(h1);
admin.append(h2);
admin.append(adminViewContent);

// let btns = document.querySelectorAll('.adminBtn');
// console.log(btns);
// btns.forEach(btn => btn.addEventListener('click', renderAdminView));
// let servicesIndexBreadcrumb = app.main.displayBreadcrumb(servicesIndexBreadcrumbList, renderAdminView);

function renderAdminView(view) {
    // e.preventDefault();
    // let currentHash = window.location.hash;
    console.log(view);

    adminViewContent.innerHTML = '';
    breadcrumbs.innerHTML = '';


    let currentView = adminRouter[view];
    if (!currentView) {

        view = '#admin'
        // adminViewContent.append(adminRouter['#admin']);
        // breadcrumbs.append(adminBreadcrumbs);
        // h2.textContent = 'Bienvenido de nuevo!';
    } 

    console.log(view);
    adminViewContent.append(adminRouter[view].content);
    breadcrumbs.append(adminRouter[view].breadcrumb);
    h2.textContent = adminRouter[view].h2Text;

    // if (adminRouter[view].render) {
    //     adminRouter[view].render();
    // }

    // else {
    //     adminViewContent.append(adminRouter[view]);
    // }

    // if (view == '#adminServices') {
    //     console.log("estoy en adminServices");
    //     breadcrumbs.append(servicesIndexBreadcrumbs);
    //     h2.textContent = 'Lista de servicios';
    // }
    // if (!currentView) {
    //     adminViewContent.append(adminRouter['#admin']);
    // } else if (view == '#adminServices') {
    //     console.log("estoy en adminServices");

    //     console.log(servicesIndexBreadcrumb);
    //     // app.admin.updateAdminHeader(currentComponents, servicesIndexBreadcrumb);
    //     // p.textContent = 'la camnié';
    //     adminViewContent.append(adminRouter[view]);
    // }

    
}

console.log(adminOptions)
export default admin;
export { renderAdminView };