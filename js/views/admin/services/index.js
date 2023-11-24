import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let servicesIndexBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Services'}
];

let servicesIndexBreadcrumbs = app.main.displayBreadcrumb(servicesIndexBreadcrumbList, renderAdminView);

let servicesList = app.create.element('div');
let addNewLink = app.create.element('a', ['btn'], 'Agregar');
addNewLink.href = '#adminServicesCreate';
const tbody = app.create.element('tbody');
let tableHeadingList = ['Nombre', 'Categoria', 'Descripción', 'Precio', 'Acciones'];
let tableBodyColumns = ['name', 'category', 'description', 'price'];
const tableId = 'servicesTable';

addNewLink.addEventListener('click', () => {
    renderAdminView(addNewLink.href);
});


app.admin.createListTable(servicesList, addNewLink, tbody, tableHeadingList, tableId);


function renderServicesTable(){
    tbody.innerHTML = '';
    app.admin.renderData('services', 'name', tableBodyColumns, tbody, tableId);
}

let adminServicesRouterContent = {
    content: servicesList,
    breadcrumb: servicesIndexBreadcrumbs, 
    h2Text: 'Lista de servicios',
    render: renderServicesTable
};


export { servicesIndexBreadcrumbs, servicesList, renderServicesTable, adminServicesRouterContent}


