import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';

let servicesCreateBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Servicios', view: "#adminServices"},
    {name: 'Agregar servicio'}
];

let servicesIndexBreadcrumbs = app.main.displayBreadcrumb(servicesCreateBreadcrumbList, renderAdminView);
let servicesCreate = app.create.element('div', ['container']); //este es mi container
let form = app.create.element('form');
app.admin.createServiceForm(servicesCreate, form);
let myDropzone;
let prepared = false;


function initializeDropzone(){
    if (!document.querySelector("#myDropzone").dropzone) {
        myDropzone = new Dropzone("#myDropzone", {
            url: "#", 
            autoProcessQueue: false,
            maxFiles: 1,
            acceptedFiles: 'image/jpeg, image/png, image/jpg, image/webp',
        });
        app.admin.myDropzoneHandler(myDropzone);
        prepared = true;
    }
}


function prepareDropzone(){
    if (!prepared) {
        setTimeout(() => {
            console.log('momento de render');
            prepared = true;
            initializeDropzone()
        
        }, 500);
    }
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let { name, category, description, price } = form;

    app.main.clearErrorMessages('form p');
    let inputsValidated = app.main.validateEmptyFields([name, category, description, price])

    if (myDropzone.files.length == 0) {
        console.log(myDropzone.files.length)

        let errorP = document.createElement('p');
        errorP.innerText = "La imagen es obligatoria";
        errorP.classList.add('errorForMmsg');
        document.querySelector('.dropzone').parentElement.appendChild(errorP);
        return; 
    }

    if (!inputsValidated || myDropzone.files.length == 0) return;
    let file = myDropzone.files[0]; 
    app.admin.uploadImgToStorageAndAddService('services/', file, name, category, description, price, servicesCreate)
});


let adminServicesCreateRouterContent = {
    content: servicesCreate,
    breadcrumb: servicesIndexBreadcrumbs, 
    h2Text: 'Agregar Nuevo servicio',
    render: prepareDropzone
};


export { adminServicesCreateRouterContent };