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

app.admin.createServiceForm(servicesEdit, form, 'edit');
let currentServiceId;
function loadServiceData(serviceId){
    app.admin.getCollectionData(serviceId, form, servicesEdit, 'services');
    currentServiceId = serviceId;
    // console.log(currentServiceId);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let { name, category, description, price } = form;

    app.main.clearErrorMessages('form p');
    let inputsValidated = app.main.validateEmptyFields([name, category, description, price]);
    if (!inputsValidated) return;

    app.admin.updateFirestoreDocument('services', currentServiceId, form, servicesEdit, '/app.html#adminServices');
    // console.log(currentServiceId);



});





let adminServicesEditRouterContent = {
    content: servicesEdit,
    breadcrumb: servicesEditBreadcrumbs, 
    h2Text: 'Editar servicio',
    render: loadServiceData
};


export { adminServicesEditRouterContent };
