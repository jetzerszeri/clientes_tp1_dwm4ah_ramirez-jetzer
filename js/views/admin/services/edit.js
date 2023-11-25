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


// function createServiceForm(formContainer, form, typeForm = 'create'){
//     form.setAttribute('method', 'post');
//     let formContentPart1 = app.create.element('div');
//     formContentPart1.innerHTML = `
//     <div>
//     <label for="name">Nombre del servicio</label>
//     <input type="text" placeholder="Ingresa el nombre del servicio" name="name">
//     </div>
//     <div>
//     `;


//     let divContainerCategories = app.create.element('div',);
//     let categoriesInputLabel = app.create.element('label', [], 'Categoría');
//     let categoriesSelect = app.create.element('select');
//     categoriesSelect.name = 'category';
//     categoriesSelect.id = 'categorySelect';
//     divContainerCategories.appendChild(categoriesInputLabel);
//     divContainerCategories.appendChild(categoriesSelect);
//     app.admin.addCategoriesList(categoriesSelect);

//     let formContentPart2 = app.create.element('div');
//     formContentPart2.innerHTML = `
//     <div>
//     <label for="description">Descripción</label>
//     <textarea name="description" cols="30" rows="10"></textarea>
//     </div>
    
//     <div>
//     <label for="price">Precio por pie cuadrado</label>
//     <input type="number" step="any" placeholder="Ingresa el precio del servicio por pie" name="price">
//     </div>
    

//     </div> 
//     `;

//     if (typeForm === 'edit'){
//         formContentPart2.innerHTML += `
//             </div>
//         `;

//     } else {
//         formContentPart2.innerHTML += `
//             <div>
//             <label >Imagen</label>
//             <div id="myDropzone" class="dropzone"></div>
//             </div>
//             </div>
//         `
//     }

//     let btnContainer = app.create.element('div');
//     let submitBtn = app.create.element('button', ['btn', 'primary-green'], 'Agregar servicio');
//     submitBtn.type = 'submit';
//     btnContainer.appendChild(submitBtn);


//     form.appendChild(formContentPart1);
//     form.appendChild(divContainerCategories);
//     form.appendChild(formContentPart2);
//     form.appendChild(btnContainer);
//     formContainer.appendChild(form);
// }

// let dropzonecontainer = document.querySelector('#myDropzone');
// dropzonecontainer.parentElement.remove();

function test(){
    console.log('preparing edit service view');
}




let adminServicesEditRouterContent = {
    content: servicesEdit,
    breadcrumb: servicesEditBreadcrumbs, 
    h2Text: 'Editar servicio',
    render: test
};


export { adminServicesEditRouterContent };
