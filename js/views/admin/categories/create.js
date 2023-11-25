import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let categoriesCreateBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'categorías', view: "#adminCategories"},
    {name: 'Agregar categoría'}
];


let categoriesIndexBreadcrumbs = app.main.displayBreadcrumb(categoriesCreateBreadcrumbList, renderAdminView);
let categoriesCreate = app.create.element('div', ['container']);
let form = app.create.element('form');
form.setAttribute('method', 'post');
form.innerHTML = `
<div>
<label for="name">Nombre de la categoría</label>
<input type="text" placeholder="Ingresa el nombre de la categoría" name="name">
</div>

<div>
<button type="submit" class="btn primary-green">Agregar Categoría</button>
</div>
`;
categoriesCreate.appendChild(form);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let { name } = form;

    app.main.clearErrorMessages('form p');
    if (!app.main.validateEmptyFields([name])) return;

    console.log('enviando datos');

    app.admin.addNewCategoryToDB(name.value, categoriesCreate);




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