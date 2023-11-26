import app from '../app.js'


const sectionServices = app.create.element('section');
const ulServices = app.create.element('ul');
sectionServices.appendChild(ulServices);
let filterBtns = app.create.element('ul', ['filterBtns']);
const servicesView = app.create.element('main', ['servicescontainer']);
const header = app.create.element('header', ['servicesheader']);

let btnLabels = ['Todos', 'Remodelación', 'Mudanza', 'Real State'];

app.services.renderServicesBtns(filterBtns, ulServices);
app.services.updateServicesList('all', ulServices);


header.innerHTML = `
    <div>
        <h1>Servicios profesionales de limpieza</h1>
        <p>Elevando el estandar de limpieza con soluciones personalizadas.</p>
    </div>
`;

const btnsContainer = document.createElement('div');
btnsContainer.appendChild(filterBtns);
header.appendChild(btnsContainer);

servicesView.appendChild(header);
servicesView.appendChild(sectionServices);


export default servicesView;
