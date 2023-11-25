import app from './config.js';
import { getFirestore, collection, addDoc, getDocs, orderBy, query, doc, getDoc, deleteDoc,  serverTimestamp, updateDoc} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getDatabase, ref as dbRef, set } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js';
import { element } from './create.js';
import { success, successMsgAdd } from './partials.js';



const db = getDatabase(app);
const auth = getAuth(app);
const dbfirestore = getFirestore(app);
const storage = getStorage(app);

async function checkUserRole(uid, adminOptionsContainer, arrayAdmin, chatBtn) {
    const docRef = doc(dbfirestore, "roles_by_user", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const role = docSnap.data().role;
        if (role == 'admin') {
            console.log('SI es admin');
            arrayAdmin.forEach((item) => {
                adminOptionsContainer.appendChild(item);
            });

        } else {
            adminOptionsContainer.appendChild(chatBtn);
        }
    } 
}

function verifyUser(adminOptionsContainer, arrayAdmin, chatBtn, container) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;

            isAdmin(uid).then((result) => {

                displayAdminBtns(adminOptionsContainer, arrayAdmin, chatBtn, result);
            });

        } else {
            container.innerHTML = '';
            let errorH1 = document.createElement('h1');
            errorH1.textContent = 'Debes iniciar sesión para ver esta página';
            let errorA = document.createElement('a');
            errorA.href = '/app.html#login';
            errorA.classList.add('btn');
            errorA.textContent = 'Iniciar sesión';
            container.appendChild(errorH1);
            container.appendChild(errorA);

            window.location.href = '/app.html#login'

            errorA.addEventListener('click', () => {
                location.reload();
            });
        }
    });
}


async function isAdmin(uid) {
    const docRef = doc(dbfirestore, "roles_by_user", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const role = docSnap.data().role;
        if (role == 'admin') {
            console.log('SI es admin');
            return true;
        } else {
            console.log('NO es admin');
            return false;
        }
    } 
}

function displayAdminBtns(adminOptionsContainer, arrayAdmin, chatBtn, admin){
    if (admin) {
        console.log('SI es admin');
        arrayAdmin.forEach((item) => {
            adminOptionsContainer.appendChild(item);
        });
    } else {
        adminOptionsContainer.appendChild(chatBtn);
    }

}


function createAdminBtn (hash, icon, text, renderAdminViewFunction, renderTableFunction){
    let btn = element('li');
    let btnLink = element('a');
    btnLink.href = hash;
    btnLink.innerHTML = `<i class="fa-solid ${icon} adminBtn"></i><span>${text}</span>`;
    btn.appendChild(btnLink);
    btnLink.addEventListener('click', () => {
        renderAdminViewFunction(hash);
        renderTableFunction();
    });
    return btn;
}


/// functions for services

async function loadDataOnTable(collectionName, order, columnList, tableBody, ){
    // const tableBody = document.querySelector('#dataTable tbody');

    tableBody.innerHTML = '';
    const reference = collection(dbfirestore, collectionName);
    const q = query(reference, orderBy(order));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

        let tableRow = document.createElement('tr');
        columnList.forEach((columnName) => {
            let column = document.createElement('td');
            column.textContent = doc.data()[columnName];
            tableRow.appendChild(column);
        });

        let actionsColumn = document.createElement('td');
        createTableBtns(actionsColumn, doc.id, collectionName, 'adminServicesEdit');

        tableRow.append(actionsColumn);
        tableBody.append(tableRow);
    });

    // $('#dataTable').DataTable();

}


function createTableBodyColumns(array, list, document){
    console.log(document)
    list.forEach(column => {
        let finalColumn = document.createElement('td');
        finalColumn.innerHTML = document.data()[column];
        array.push(finalColumn);
    });
}

function createTableBtns(actionsColumn, id, collectionName, editLink){
    let editButton = document.createElement('a');
    let deleteButton = document.createElement('button');

    editButton.href = `#${editLink}?id=${id}`;
    editButton.classList.add('btn', 'secundary-green', 'edit-btn');
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    deleteButton.classList.add('btn', 'secundary-green', 'delete-btn');
    deleteButton.setAttribute('data-id', id);
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    deleteButton.addEventListener('click', function() {
        const serviceId = this.getAttribute('data-id');
        // console.log('click en el botón de eliminar', serviceId);
        deleteDocumentFromFirestore(serviceId, collectionName);
    });

    editButton.addEventListener('click', function(e) {
        // e.preventDefault();
        // console.log('click en el botón de editar');
        window.location.href = `#${editLink}?id=${id}`;
        location.reload();
    });

    actionsColumn.append(editButton, deleteButton);
}


async function deleteDocumentFromFirestore(serviceId, collectionName) {

    console.log( collectionName, serviceId);

    await deleteDoc(doc(dbfirestore, collectionName, serviceId));
    window.location.reload();

}


function addHeadingTableRow(list, tableHeadingRow){
    if (!tableHeadingRow){
        console.log('No hay tabla');
        return;
    }
    list.forEach(heading => {
        let tableHeading = document.createElement('th');
        tableHeading.textContent = heading;
        tableHeadingRow.append(tableHeading);
    });
}

function createListTable(container, newBtnLink, tbody, tableHeadingList, id){
    let usersOptions = element('ul', ['usersOptions']);
    let addNewLi = element('li');
    addNewLi.appendChild(newBtnLink);
    usersOptions.appendChild(addNewLi);
    container.appendChild(usersOptions);

    const table = element('table', ['display']);
    table.id = id;

    container.appendChild(table);

    const thead = element('thead');
    const tr = element('tr');
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    addHeadingTableRow(tableHeadingList, tr);

}

const dataTableOptions = {
    lengthMenu: [5, 10, 30, 100],
    pageLength: 5,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

async function renderData(collectionName, order, tableBodyColumns, tbody, tableId){
    await loadDataOnTable(collectionName, order, tableBodyColumns, tbody);
    let id = `#${tableId}`
    $(id).DataTable(dataTableOptions);
    console.log('se renderizó la tabla');
}



// create services page


async function addCategoriesList(categoriesSelectInput, categorySelected){
    const querySnapshot = await getDocs(collection(dbfirestore, "categories"));
    querySnapshot.forEach((doc) => {
        let option = document.createElement('option');
        option.value = doc.data().name;
        option.innerHTML = doc.data().name;

        if(option.value === categorySelected) {
            option.selected = true;
        }
        categoriesSelectInput.append(option);
    })
};


function uploadImgToStorageAndAddService(folderName, dropzoneFile, nameInput, categoryInput, descriptionInput, priceInput, container){

    let folder = folderName;
    let ext = dropzoneFile.type.split('/')[1]
    const storageReference = storageRef(storage, folder + "test"+ crypto.randomUUID() + '.' + ext);
    console.log(storageReference);


    uploadBytes(storageReference, dropzoneFile).then((snapshot) => {
        console.log(snapshot);
        console.log('Se subió el archivo');

        getDownloadURL(storageReference).then((url) => {
            console.log(url);

            // addNewServiceToDB(nameInput.value, categoryInput.value, descriptionInput.value, priceInput.value, url, container);

            addNewDocToMyFirestore(
                "services", 
                { name: nameInput.value, category: categoryInput.value, description:descriptionInput.value, price: priceInput.value, img: url }, 
                container, 
                '/app.html#adminServices', 
                '#adminServices'
            );


        }).catch((error) => {
            console.log(error);
        })
    });


};


async function addNewServiceToDB(name, category, description, price, imgUrl, container){

    try{
        await addDoc(collection(dbfirestore, "services"), {
            name: name,
            category: category,
            description: description,
            price: price,
            img: imgUrl,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    
        // console.log('servicio agregado exitosamente');
        // container.innerHTML = successMsgAdd('Servicio agregado exitosamente', '/admin_services.html')
        container.innerHTML = '';
        container.append(successMsgAdd('Servicio agregado exitosamente', '/app.html#adminServices', '#admin'));
        
    }catch(error){
        container.append(successMsgAdd('Hubo un error en el servidor, por favor intenta más tarde.', '/app.html#adminServices', '#admin'));
    }
}

async function addNewCategoryToDB(name, container){
    try{
        await addDoc(collection(dbfirestore, "categories"), {
            name: name,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    
        container.innerHTML = '';
        container.append(successMsgAdd('Categoría agregada exitosamente', '/app.html#adminCategories', '#admin'));
    }catch(error){
        console.log(error);
        // displayServerError(container, false, '#adminCategories');
    }
    
}



async function addNewDocToMyFirestore(collectionName, data, container, redirect) {
    try {
        await addDoc(collection(dbfirestore, collectionName), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        container.innerHTML = '';
        container.append(successMsgAdd(`Elemento agregado exitosamente a ${collectionName}`, redirect));
    } catch (error) {
        displayServerError(container, false, redirect);
    }
}


// // Ejemplo de uso para agregar un servicio
// addNewDocToMyFirestore(
//     "services", 
//     { name: serviceName, category: serviceCategory, description: serviceDescription, price: servicePrice, img: serviceImgUrl }, 
//     serviceContainer, 
//     '/app.html#adminServices', 
//     '#adminServices'
// );

// // Ejemplo de uso para agregar una categoría
// addToDB(
//     "categories", 
//     { name: categoryName }, 
//     categoryContainer, 
//     '/app.html#adminCategories', 
//     '#adminCategories'
// );





function myDropzoneHandler(currentDropzone){
    currentDropzone.on("addedfile", function(file) {
        if (this.files[1]!=null){
            this.removeFile(this.files[0]);
        }
        file.previewElement.querySelector(".dz-progress").style.display = 'none';

        var removeButton = document.createElement('div');
        removeButton.innerHTML = 'X';
        removeButton.classList.add('dz-remove'); 

        // Obtener el primer hijo del elemento de vista previa
        var firstChild = file.previewElement.firstChild;
        file.previewElement.insertBefore(removeButton, firstChild);

        removeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            currentDropzone.removeFile(file);
        });
    });
}


function createServiceForm(formContainer, form, typeForm){
    form.setAttribute('method', 'post');
    let formContentPart1 = element('div');
    formContentPart1.innerHTML = `
    <div>
    <label for="name">Nombre del servicio</label>
    <input type="text" placeholder="Ingresa el nombre del servicio" name="name">
    </div>
    <div>
    `;


    let divContainerCategories = element('div',);
    let categoriesInputLabel = element('label', [], 'Categoría');
    let categoriesSelect = element('select');
    categoriesSelect.name = 'category';
    categoriesSelect.id = 'categorySelect';
    divContainerCategories.appendChild(categoriesInputLabel);
    divContainerCategories.appendChild(categoriesSelect);
    if (typeForm !== 'edit'){
    addCategoriesList(categoriesSelect);
    }

    let formContentPart2 = element('div');
    formContentPart2.innerHTML = `
    <div>
    <label for="description">Descripción</label>
    <textarea name="description" cols="30" rows="10"></textarea>
    </div>
    
    <div>
    <label for="price">Precio por pie cuadrado</label>
    <input type="number" step="any" placeholder="Ingresa el precio del servicio por pie" name="price">
    </div>
    

    </div> 
    `;

    if (typeForm === 'edit'){
        formContentPart2.innerHTML += `
            </div>
        `;

    } else {
        formContentPart2.innerHTML += `
            <div>
            <label >Imagen</label>
            <div id="myDropzone" class="dropzone"></div>
            </div>
            </div>
        `
    }

    let btnContainer = element('div');
    let submitBtn = element('button', ['btn', 'primary-green'], 'Guardar');
    submitBtn.type = 'submit';
    btnContainer.appendChild(submitBtn);


    form.appendChild(formContentPart1);
    form.appendChild(divContainerCategories);
    form.appendChild(formContentPart2);
    form.appendChild(btnContainer);
    formContainer.appendChild(form);
}



async function getSeviceData(docId, form, container) {
    const docServicesRef = doc(dbfirestore, "services", docId);
    let { name, category, description, price } = form;
    category.innerHTML = '';

    // console.log(docServicesRef);
    try {
        const docSnap = await getDoc(docServicesRef);
        // console.log(docSnap);

        if (docSnap.exists()) {
            const data = docSnap.data();
            name.value = data.name;
            let categorySelected = data.category;
            description.value = data.description;
            price.value = data.price;

            addCategoriesList(category,  data.category);

        } 
        else {
            // console.log("No such document!");
            // window.location.href = '/app.html#adminServices';
            // location.reload();
            displayServerError(container, 'Ups, No se encontró ningun servicio con ese id', '#adminServices');
        }
    } catch (error) {
        displayServerError(container, false, '#adminServices');
    }
}

async function updateServiceData(docId, form, container) {
    const docServicesRef = doc(dbfirestore, "services", docId);
    console.log(docServicesRef);
    let { name, category, description, price } = form;
    try{
        await updateDoc(docServicesRef, {
            name: name.value,
            category: category.value,
            description: description.value,
            price: price.value,
            updatedAt: serverTimestamp()
        });
        container.innerHTML = '';
        container.append(successMsgAdd('Servicio actualizado exitosamente.', '/app.html#adminServices'));
    }catch(error){
        displayServerError(container, false, '#adminServices');
        // console.log(error);
    }
}



function displayServerError(container, text, hash){
    container.innerHTML = '';
    if (text) {
        container.append(successMsgAdd(text, `/app.html${hash}`));
    } else {
    container.append(successMsgAdd('Hubo un error en el servidor, por favor intenta más tarde.', `/app.html${hash}`));
    }
}


export { verifyUser, loadDataOnTable, createTableBodyColumns, createTableBtns, deleteDocumentFromFirestore, addHeadingTableRow, createListTable, renderData, createAdminBtn, addCategoriesList, uploadImgToStorageAndAddService, addNewServiceToDB, myDropzoneHandler, createServiceForm, getSeviceData, updateServiceData, addNewCategoryToDB, addNewDocToMyFirestore};