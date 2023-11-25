import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let categoriesCreateBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Categorías', view: "#adminCategories"},
    {name: 'Editar categoría'}
];


let categoriesEditBreadcrumbs = app.main.displayBreadcrumb(categoriesCreateBreadcrumbList, renderAdminView);

let categoriesEdit = app.create.element('div', ['container']); //este es mi container
let form = app.create.element('form');
app.admin.renderCategoriesForm(form, categoriesEdit);


let currentCategoryId;
function loadCategoryData(categoryId){

    app.admin.getCollectionData(categoryId, form, categoriesEdit, 'categories');

    // app.admin.getCategoryData(categoryId, form, categoriesEdit);
    currentCategoryId = categoryId;
    console.log(currentCategoryId);
}

let adminCategoriesEditRouterContent = {
    content: categoriesEdit,
    breadcrumb: categoriesEditBreadcrumbs, 
    h2Text: 'Editar categoría',
    render: loadCategoryData
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    app.main.clearErrorMessages('form p');
    let inputsValidated = app.main.validateEmptyFields([form.name]);
    if (!inputsValidated) return;






});


export { adminCategoriesEditRouterContent };
