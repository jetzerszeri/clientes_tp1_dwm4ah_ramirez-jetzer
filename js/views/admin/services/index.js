import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let servicesIndexBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Services'}
];

let servicesIndexBreadcrumbs = app.main.displayBreadcrumb(servicesIndexBreadcrumbList, renderAdminView);




let servicesList = app.create.element('div', false, 'Lista de servicios desde index.js');

export { servicesIndexBreadcrumbs, servicesList}


