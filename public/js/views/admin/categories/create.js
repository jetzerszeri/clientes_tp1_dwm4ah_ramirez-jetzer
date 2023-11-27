import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let categoriesCreateBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Categorías', view: "#adminCategories"},
    {name: 'Agregar categoría'}
];


let categoriesIndexBreadcrumbs = app.main.displayBreadcrumb(categoriesCreateBreadcrumbList, renderAdminView);
let categoriesCreate = app.create.element('div', ['container']);
let form = app.create.element('form');
app.admin.renderCategoriesForm(form, categoriesCreate);


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let { name } = form;

    app.main.clearErrorMessages('form p');
    if (!app.main.validateEmptyFields([name])) return;

    app.admin.addNewDocToMyFirestore('categories', {name: name.value}, categoriesCreate, '#adminCategories');

})


function test(){
    console.log('test');
}

let adminCategoriesCreateRouterContent = {
    content: categoriesCreate,
    breadcrumb: categoriesIndexBreadcrumbs, 
    h2Text: 'Agregar nueva categoría',
    render: test
};


export { adminCategoriesCreateRouterContent };