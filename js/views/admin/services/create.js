import app from '../../../app.js';
import { renderAdminView, renderTimes } from '../../admin.js';

let servicesCreateBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Services', view: "#adminServices"},
    {name: 'Agregar servicio'}
];

let servicesIndexBreadcrumbs = app.main.displayBreadcrumb(servicesCreateBreadcrumbList, renderAdminView);
let timesRun = 0;
let servicesCreate = app.create.element('div', ['container']); //este es mi container
let form = app.create.element('form');
form.setAttribute('method', 'post');

let formContentPart1 = app.create.element('div');
formContentPart1.innerHTML = `
<div>
<label for="name">Nombre del servicio</label>
<input type="text" placeholder="Ingresa el nombre del servicio" name="name">
</div>
<div>
`;

let divContainerCategories = app.create.element('div',);
let categoriesInputLabel = app.create.element('label', [], 'Categoría');
let categoriesSelect = app.create.element('select');
categoriesSelect.name = 'category';
categoriesSelect.id = 'categorySelect';
divContainerCategories.appendChild(categoriesInputLabel);
divContainerCategories.appendChild(categoriesSelect);
app.admin.addCategoriesList(categoriesSelect);

let formContentPart2 = app.create.element('div');
formContentPart2.innerHTML = `
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

form.appendChild(formContentPart1);
form.appendChild(divContainerCategories);
form.appendChild(formContentPart2);
form.appendChild(btnContainer);
servicesCreate.appendChild(form);
let myDropzone;
let prepared = false;



// console.log(renderTimes, 'renderTimes');

function initializeDropzone(){
    if (!document.querySelector("#myDropzone").dropzone) {
        myDropzone = new Dropzone("#myDropzone", {
            url: "#", // Cambia esto por una URL válida
            autoProcessQueue: false,
            maxFiles: 1,
            acceptedFiles: 'image/jpeg, image/png, image/jpg, image/webp',
        });

        // myDropzone.on("addedfile", function(file) {
        //     if (this.files[1]!=null){
        //         this.removeFile(this.files[0]);
        //     }
        //     file.previewElement.querySelector(".dz-progress").style.display = 'none';

        //     var removeButton = document.createElement('div');
        //     removeButton.innerHTML = 'X';
        //     removeButton.classList.add('dz-remove'); 

        //     // Obtener el primer hijo del elemento de vista previa
        //     var firstChild = file.previewElement.firstChild;
        //     file.previewElement.insertBefore(removeButton, firstChild);

        //     removeButton.addEventListener('click', function(e) {
        //         e.preventDefault();
        //         e.stopPropagation();
        //         myDropzone.removeFile(file);
        //     });
        // });
        app.admin.myDropzoneHandler(myDropzone);
        
        prepared = true;
        
    }
}




function prepareDropzone(){
    // app.admin.setUpDropzone()
    // prepared = false;
    console.log(prepared, 'prepared', timesRun, 'timesRun')
    timesRun += 1;

    // window.addEventListener("load", () => {
    
    //     // if (!document.querySelector("#myDropzone").dropzone) {
    //     //     myDropzone = new Dropzone("#myDropzone", {
    //     //         url: "#", // Cambia esto por una URL válida
    //     //         autoProcessQueue: false,
    //     //         maxFiles: 1,
    //     //         acceptedFiles: 'image/jpeg, image/png, image/jpg, image/webp',
    //     //     });
    
    //     //     myDropzone.on("addedfile", function(file) {
    //     //         if (this.files[1]!=null){
    //     //             this.removeFile(this.files[0]);
    //     //         }
    //     //         file.previewElement.querySelector(".dz-progress").style.display = 'none';
    
    //     //         var removeButton = document.createElement('div');
    //     //         removeButton.innerHTML = 'X';
    //     //         removeButton.classList.add('dz-remove'); 
    
    //     //         // Obtener el primer hijo del elemento de vista previa
    //     //         var firstChild = file.previewElement.firstChild;
    //     //         file.previewElement.insertBefore(removeButton, firstChild);
    
    //     //         removeButton.addEventListener('click', function(e) {
    //     //             e.preventDefault();
    //     //             e.stopPropagation();
    //     //             myDropzone.removeFile(file);
    //     //         });
    //     //     });

    //     //     prepared = true;
    //     // }
    //     initializeDropzone()
    //     return;
    // });

        // setTimeout(() => {
        // // location.reload();
        // // initializeDropzone()
        
        // }, 100);

    if (!prepared) {
        // setTimeout(prepareDropzone, 500);
        
        setTimeout(() => {
            console.log('momento de render');
            prepared = true;
        // location.reload();
            initializeDropzone()
        
        }, 500);

        // initializeDropzone()
    }
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let { name, category, description, price } = form;

    // console.log(name.value, category.value, description.value, price.value);
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


})


// function setUpDropzone(){}

// window.addEventListener("load", () => {
//     // Dropzone.autoDiscover = false;

//     // Verifica si Dropzone ya está inicializado en el elemento
//     if (!document.querySelector("#myDropzone").dropzone) {
//         let myDropzone = new Dropzone("#myDropzone", {
//             url: "#", // Cambia esto por una URL válida
//             autoProcessQueue: false,
//             maxFiles: 1,
//             acceptedFiles: 'image/jpeg, image/png, image/jpg, image/webp',
//         });

//         myDropzone.on("addedfile", function(file) {
//             if (this.files[1]!=null){
//                 this.removeFile(this.files[0]);
//             }
//             file.previewElement.querySelector(".dz-progress").style.display = 'none';

//             var removeButton = document.createElement('div');
//             removeButton.innerHTML = 'X';
//             removeButton.classList.add('dz-remove'); 

//             // Obtener el primer hijo del elemento de vista previa
//             var firstChild = file.previewElement.firstChild;
//             file.previewElement.insertBefore(removeButton, firstChild);

//             removeButton.addEventListener('click', function(e) {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 myDropzone.removeFile(file);
//             });
//         });
//     }
// });








function testing() {
    console.log('testing');
}


let adminServicesCreateRouterContent = {
    content: servicesCreate,
    breadcrumb: servicesIndexBreadcrumbs, 
    h2Text: 'Agregar Nuevo servicio',
    render: prepareDropzone
};
// prepared = true;

export { adminServicesCreateRouterContent };