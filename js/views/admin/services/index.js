import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let servicesIndexBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Services'}
];

let servicesIndexBreadcrumbs = app.main.displayBreadcrumb(servicesIndexBreadcrumbList, renderAdminView);


let servicesList = app.create.element('div');


// let usersOptions = app.create.element('ul', ['usersOptions']);

// let addNewLi = app.create.element('li');
let addNewLink = app.create.element('a', ['btn'], 'Agregar');
addNewLink.href = '#adminServicesAdd';
// addNewLi.appendChild(addNewLink);


addNewLink.addEventListener('click', () => {
    renderAdminView(addNewLink.href);
});

// usersOptions.appendChild(addNewLi);

// servicesList.appendChild(usersOptions);


// const table = app.create.element('table', ['display']);
// table.id = 'dataTable';




// servicesList.appendChild(table);


let tableHeadingList = ['Nombre', 'Categoria', 'Descripción', 'Precio', 'Acciones'];
let tableBodyColumns = ['name', 'category', 'description', 'price'];


// const thead = app.create.element('thead');
// const tr = app.create.element('tr');
// thead.appendChild(tr);
// table.appendChild(thead);

const tbody = app.create.element('tbody');
// table.appendChild(tbody);

// app.admin.addHeadingTableRow(tableHeadingList, tr);

// function createListTable(container, newBtnLink, tbody, tableHeadingList){
//     let usersOptions = app.create.element('ul', ['usersOptions']);
//     let addNewLi = app.create.element('li');
//     addNewLi.appendChild(newBtnLink);
//     usersOptions.appendChild(addNewLi);
//     container.appendChild(usersOptions);

//     const table = app.create.element('table', ['display']);
//     table.id = 'dataTable';

//     container.appendChild(table);

//     const thead = app.create.element('thead');
//     const tr = app.create.element('tr');
//     thead.appendChild(tr);
//     table.appendChild(thead);
//     table.appendChild(tbody);
//     app.admin.addHeadingTableRow(tableHeadingList, tr);

// }


app.admin.createListTable(servicesList, addNewLink, tbody, tableHeadingList);



function renderServicesTable(){
    tbody.innerHTML = '';
    render();
}

async function render(){
    await app.admin.loadDataOnTable('services', 'name', tableBodyColumns, tbody);
    $('#dataTable').DataTable();
    console.log('se renderizó la tabla');
}



export { servicesIndexBreadcrumbs, servicesList, renderServicesTable}


