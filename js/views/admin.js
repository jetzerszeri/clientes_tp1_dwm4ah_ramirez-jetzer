import app from '../app.js'
import login from './login.js';

const admin = app.create.element('main', ['adminmain']);

let breadcrumbItems = [
    {name: 'Home', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Chat', view: "#adminChat"},
    {name: 'services'}
];

const adminOptions = app.create.element('ul', ['admindoptions']);

const services = app.create.element('div', [], 'Servicios');
const categories = app.create.element('div', [], 'Categorías');
const chat = app.create.element('div', [], 'Chat');

const adminRouter = {
    '#admin': adminOptions,
    '#adminServices': services,
    '#adminCategories': categories,
    '#adminChat': chat
}

const h1 = app.create.element('h1', false, 'Panel de administrador');
const p = app.create.element('p', [], 'Bienvenido de nuevo!');

const adminViewContent = app.create.element('div');
// adminViewContent.id = 'adminViewContent';



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


function createAdminBtn (hash, icon, text, renderAdminViewFunction){
    let btn = app.create.element('li');
    let btnLink = app.create.element('a');
    btnLink.href = hash;
    btnLink.innerHTML = `<i class="fa-solid ${icon} adminBtn"></i><span>${text}</span>`;
    btn.appendChild(btnLink);
    // btnLink.addEventListener('click', renderAdminViewFunction(hash));
    btnLink.addEventListener('click', () => {
        renderAdminViewFunction(hash);
    });
    return btn;
}

let servicesBtn = createAdminBtn('#adminServices', 'fa-hand-sparkles', 'ServiciosbT', renderAdminView);

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



admin.appendChild(app.main.displayBreadcrumb(breadcrumbItems, renderAdminView));
admin.appendChild(h1);
admin.appendChild(p);
admin.appendChild(adminViewContent);

// let btns = document.querySelectorAll('.adminBtn');
// console.log(btns);
// btns.forEach(btn => btn.addEventListener('click', renderAdminView));

function renderAdminView(view) {
    // e.preventDefault();
    // let currentHash = window.location.hash;
    console.log(view);

    adminViewContent.innerHTML = '';


    let currentView = adminRouter[view];
    if (!currentView) {
        adminViewContent.append(adminRouter['#admin']);
    } else {
        adminViewContent.append(adminRouter[view]);
    }
    
    // console.log(e.target.hash);
    // adminViewContent.append(adminRouter[e.target.hash]);
    // adminViewContent.append(adminRouter[view]);

    
}

export default admin;