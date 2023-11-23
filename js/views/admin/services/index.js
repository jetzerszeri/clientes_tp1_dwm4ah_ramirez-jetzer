import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let servicesIndexBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'services'}
];

let servicesIndexBreadcrumbs = app.main.displayBreadcrumb(servicesIndexBreadcrumbList, renderAdminView);

// let servicesIndexBreadcrumb = {
//     breadcrumb: app.main.displayBreadcrumb(breadcrumbItems, renderAdminView),
//     h1: app.create.element('h1', false, 'Panel de administrador'),
//     h2: app.create.element('h2', [], 'Lista de servicios'),
//     // content: 'Servicios',
// };


// let currentComponents = {
//     breadcrumb: servicesBreadcrumb,
//     h1: 'Servicios',
//     h2: 'Servicios',
//     // content: 'Servicios',
// };



function getAndUpdateAdminHeader(current, changes){
    current.breadcrumb = changes.breadcrumb;
}


let servicesList = app.create.element('div', false, 'Lista de servicios desde index.js');

export { servicesIndexBreadcrumbs, servicesList}


