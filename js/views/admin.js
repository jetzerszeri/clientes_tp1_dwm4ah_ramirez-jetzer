import app from '../app.js'

const admin = app.create.element('main', ['adminmain']);

let breadcrumbItems = [
    {name: 'Home', view: '#home'},
    {name: 'Dashboard'}
];

const h1 = app.create.element('h1', false, 'Panel de administrador');
const p = app.create.element('p', [], 'Bienvenido de nuevo!');
const adminOptions = app.create.element('ul', ['admindoptions']);

let servicesBtn = app.create.element('li')
servicesBtn.innerHTML = `<i class="fa-solid fa-hand-sparkles"></i><span>Servicios</span>`;

let categoriesBtn = app.create.element('li')
categoriesBtn.innerHTML = `<i class="fa-solid fa-table-list"></i><span>Categorías</span>`;

let chatBtn = app.create.element('li')
chatBtn.innerHTML = `<i class="fa-solid fa-comments"></i><span>Chat</span>`;

app.main.renderView(servicesBtn, '#adminServices');
app.main.renderView(categoriesBtn, '#adminCategories');
app.main.renderView(chatBtn, '#chat');


app.admin.verifyUser(adminOptions, [servicesBtn, categoriesBtn, chatBtn], chatBtn);

admin.appendChild(app.main.displayBreadcrumb(breadcrumbItems));
admin.appendChild(h1);
admin.appendChild(p);
admin.appendChild(adminOptions);

export default admin;