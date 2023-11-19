import app from '../app.js'


const sectionServices = document.createElement('section');
const ulServices = document.createElement('ul');
sectionServices.appendChild(ulServices);
let filterBtns = document.createElement('ul');
filterBtns.classList.add('filterBtns');
const servicesView = document.createElement('main');
servicesView.classList.add('servicescontainer');
const header = document.createElement('header');
header.classList.add('servicesheader');

let btnLabels = ['Todos', 'Remodelación', 'Mudanza', 'Real State'];

app.services.renderServicesBtns(btnLabels, filterBtns, ulServices);
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
