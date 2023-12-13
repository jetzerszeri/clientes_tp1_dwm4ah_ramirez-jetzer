import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let categoriesIndexBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Categorías'}
];

let categoriesIndexBreadcrumbs = app.main.displayBreadcrumb(categoriesIndexBreadcrumbList, renderAdminView);

let categoriesList = app.create.element('div');

let addNewLink = app.create.element('a', ['btn'], 'Agregar');
addNewLink.href = '#adminCategoriesCreate';
const tbody = app.create.element('tbody');
let tableHeadingList = ['Nombre', 'Acciones'];
let tableBodyColumns = ['name'];
addNewLink.addEventListener('click', () => { renderAdminView('#adminCategoriesCreate')});

app.admin.createListTable(categoriesList, addNewLink, tbody, tableHeadingList, 'categoriesTable');

function renderCategoriesTable(){
    tbody.innerHTML = '';
    app.admin.renderData('categories', 'name', tableBodyColumns, tbody, 'categoriesTable');
}





let adminCategoriesRouterContent = {
    content: categoriesList,
    breadcrumb: categoriesIndexBreadcrumbs, 
    h2Text: 'Lista de categorías',
    render: renderCategoriesTable,
};

export { adminCategoriesRouterContent };

