import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let servicesCreateBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Services', view: "#adminServices"},
    {name: 'Editar servicio'}
];

let servicesEditBreadcrumbs = app.main.displayBreadcrumb(servicesCreateBreadcrumbList, renderAdminView);

let servicesEdit = app.create.element('div', ['container']); //este es mi container
let form = app.create.element('form');
let categoriesSelect = app.create.element('select');

app.admin.createServiceForm(servicesEdit, form, 'edit');

function loadServiceData(serviceId){
    app.admin.getSeviceData(serviceId, form)
}


let adminServicesEditRouterContent = {
    content: servicesEdit,
    breadcrumb: servicesEditBreadcrumbs, 
    h2Text: 'Editar servicio',
    render: loadServiceData
};


export { adminServicesEditRouterContent };
