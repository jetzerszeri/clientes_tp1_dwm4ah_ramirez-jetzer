import app from './config.js';
import { getFirestore, collection, addDoc, getDocs, orderBy, query, doc, getDoc, deleteDoc,  serverTimestamp, } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';
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

async function loadDataOnTable(collectionName, order, columnList, tableBody){
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
        createTableBtns(actionsColumn, doc.id);

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

function createTableBtns(actionsColumn, id){
    let editButton = document.createElement('a');
    let deleteButton = document.createElement('button');

    editButton.href = `#adminServicesEdit?id=${id}`;
    editButton.classList.add('btn', 'secundary-green', 'edit-btn');
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    deleteButton.classList.add('btn', 'secundary-green', 'delete-btn');
    deleteButton.setAttribute('data-id', id);
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    deleteButton.addEventListener('click', function() {
        const serviceId = this.getAttribute('data-id');
        console.log('click en el botón de eliminar', serviceId);
        deleteDocumentFromFirestore(serviceId);
    });

    editButton.addEventListener('click', function(e) {
        // e.preventDefault();
        console.log('click en el botón de editar');
    });

    actionsColumn.append(editButton, deleteButton);
}


async function deleteDocumentFromFirestore(serviceId) {
    const userConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este servicio?");

    if (!userConfirmed) {
        return;
    }

    try {
    await deleteDoc(doc(dbfirestore, 'services', serviceId));
    console.log('Servicio eliminado correctamente');
    window.location.reload();
    } catch (error) {
    console.error('Error al eliminar el Servicio:', error);
    }
}


function addHeadingTableRow(list, tableHeadingRow){
    // let tableHeadingRow = document.querySelector('#dataTable thead tr');
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
    lengthMenu: [3, 10, 30, 100],
    pageLength: 3,
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


async function addCategoriesList(categoriesSelectInput){
    const querySnapshot = await getDocs(collection(dbfirestore, "categories"));
    querySnapshot.forEach((doc) => {
        let option = document.createElement('option');
        option.value = doc.data().name;
        option.innerHTML = doc.data().name;
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

            addNewServiceToDB(nameInput.value, categoryInput.value, descriptionInput.value, priceInput.value, url, container);


        }).catch((error) => {
            console.log(error);
        })
    });


};


async function addNewServiceToDB(name, category, description, price, imgUrl, container){
    await addDoc(collection(dbfirestore, "services"), {
        name: name,
        category: category,
        description: description,
        price: price,
        img: imgUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });

    console.log('servicio agregado exitosamente');
    // container.innerHTML = successMsgAdd('Servicio agregado exitosamente', '/admin_services.html')
    container.innerHTML = '';
    container.append(successMsgAdd('Servicio agregado exitosamente', '/app.html#adminServices', '#admin'));
}


// function setUpDropzone(){
    
//     window.addEventListener("load", () => {
//         // Dropzone.autoDiscover = false;
    
//         // Verifica si Dropzone ya está inicializado en el elemento
//         if (!document.querySelector("#myDropzone").dropzone) {
//             let myDropzone = new Dropzone("#myDropzone", {
//                 url: "#", // Cambia esto por una URL válida
//                 autoProcessQueue: false,
//                 maxFiles: 1,
//                 acceptedFiles: 'image/jpeg, image/png, image/jpg, image/webp',
//             });
    
//             myDropzone.on("addedfile", function(file) {
//                 if (this.files[1]!=null){
//                     this.removeFile(this.files[0]);
//                 }
//                 file.previewElement.querySelector(".dz-progress").style.display = 'none';
    
//                 var removeButton = document.createElement('div');
//                 removeButton.innerHTML = 'X';
//                 removeButton.classList.add('dz-remove'); 
    
//                 // Obtener el primer hijo del elemento de vista previa
//                 var firstChild = file.previewElement.firstChild;
//                 file.previewElement.insertBefore(removeButton, firstChild);
    
//                 removeButton.addEventListener('click', function(e) {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     myDropzone.removeFile(file);
//                 });
//             });
//         }
//     });
// }



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

export { verifyUser, loadDataOnTable, createTableBodyColumns, createTableBtns, deleteDocumentFromFirestore, addHeadingTableRow, createListTable, renderData, createAdminBtn, addCategoriesList, uploadImgToStorageAndAddService, addNewServiceToDB, myDropzoneHandler};