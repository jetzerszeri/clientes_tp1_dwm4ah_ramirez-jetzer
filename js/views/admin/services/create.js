import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let servicesCreateBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Services', view: "#adminServices"},
    {name: 'Agregar servicio'}
];

let servicesIndexBreadcrumbs = app.main.displayBreadcrumb(servicesCreateBreadcrumbList, renderAdminView);

let servicesCreate = app.create.element('div', ['container']);
let servicesCreateForm = app.create.element('form');
servicesCreateForm.setAttribute('method', 'post');

let formContent = app.create.element('div');
formContent.innerHTML = `
<div>
<label for="name">Nombre del servicio</label>
<input type="text" placeholder="Ingresa el nombre del servicio" name="name">
</div>
<div>
<label for="category">Categoría</label>
<select name="category" id="categorySelect">
</select>
</div>
<div>
<label for="description">Descripción</label>
<textarea name="description" cols="30" rows="10"></textarea>
</div>

<div>
<label for="price">Precio por pie cuadrado</label>
<input type="number" step="any" placeholder="Ingresa el precio del servicio por pie" name="price">
</div>

<div>
<label >Imagen</label>
<div id="myDropzone" class="dropzone"></div>
</div>
</div>
`;

let btnContainer = app.create.element('div');
let submitBtn = app.create.element('button', ['btn', 'primary-green'], 'Agregar servicio');
submitBtn.type = 'submit';
btnContainer.appendChild(submitBtn);

servicesCreateForm.appendChild(formContent);
servicesCreateForm.appendChild(btnContainer);
servicesCreate.appendChild(servicesCreateForm);













function testing() {
    console.log('testing');
}


let adminServicesCreateRouterContent = {
    content: servicesCreate,
    breadcrumb: servicesIndexBreadcrumbs, 
    h2Text: 'Agregar Nuevo servicio',
    render: testing
};

export { adminServicesCreateRouterContent };