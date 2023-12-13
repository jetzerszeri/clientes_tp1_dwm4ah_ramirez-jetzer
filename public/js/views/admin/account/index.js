import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';
import appFirebase from '../../../config.js';

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateEmail, updatePassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, doc, getDoc, deleteDoc,  serverTimestamp, updateDoc} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js';
const auth = getAuth(appFirebase);
const dbfirestore = getFirestore(appFirebase);
const storage = getStorage(appFirebase);




let accountIndexBreadcrumbList = [
    {name: 'Inicio', view: '#home'},
    {name: 'Dashboard', view: "#admin"},
    {name: 'Mi cuenta'}
];

let accountIndexBreadcrumbs = app.main.displayBreadcrumb(accountIndexBreadcrumbList, renderAdminView);

let myAccountView = app.create.element('div', ['accountInfo']);
let editNameLink = app.create.element('a', ['btn'], 'Editar nombre y apellido');
editNameLink.href = '#adminMyAccount';
// editNameLink.addEventListener('click', () => { renderAdminView('#adminMyAccountEdit') });


let accountDataContainer = app.create.element('div', ['accountDataContainer']);
let accountImgContainer = app.create.element('form', ['accountImgContainer']);
// let accountImg = app.create.element('img', ['accountImg']);
// accountImg.src = 'img/account-icon.svg';
// accountImg.alt = 'avatar de usuario';

accountImgContainer.innerHTML = `
<label for="imageInput" class="labelImgInput">                     
    <p>Cambiar foto</p>
</label>
<input type="file" id="imageInput" accept="image/*" name="img">
`;





let accountData = app.create.element('div', ['accountData']);
let accountDataInfo = app.create.element('div');
accountDataInfo.innerHTML = `
    <h3>Jake Ramirez</h3>
    <p>Administrador</p>
`;

accountData.append(accountDataInfo, editNameLink);

// let accountData2 = app.create.element('div', ['accountData2']);
// let accountDataInfo2 = app.create.element('p', [], 'prueba@mail.com');

// let editEmailLink = app.create.element('a', ['btn'], 'Editar email y contraseña');
// editEmailLink.href = '#adminMyAccount';
// editEmailLink.addEventListener('click', () => { renderAdminView('#adminMyAccount') });

// accountData2.append(accountDataInfo2, editEmailLink);


// function displayAccountInfo(){
    accountDataContainer.append(accountData);
// }
// displayAccountInfo();
myAccountView.append(accountImgContainer, accountDataContainer);


const formEditName = app.create.element('form', ['formEditName']);
formEditName.innerHTML = `
    <h3>Editar nombre y apellido</h3>
    <div>
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name">
        <p class="error-message"></p>
    </div>
    <div>
        <label for="lastname">Apellido</label>
        <input type="text" id="lastname" name="lastname">
        <p class="error-message"></p>
    </div>
    <div>
    <button type="submit" class="btn primary-green">Guardar cambios</button>
    </div>
`;

// const formEditEmail = app.create.element('form', ['formEditEmail']);
// formEditEmail.innerHTML = `
//     <h3>Editar email y contraseña</h3>
//     <div>
//         <label for="email">Email</label>
//         <input type="email" id="email" name="email">
//         <p class="error-message"></p>
//         </div>
//         <div>
//         <label for="password">Contraseña</label>
//         <input type="password" id="password" name="password" placeholder="Ingresa una nueva contraseña">
//         <p class="error-message"></p>
//         </div>
//         <div>
//         <button type="submit" class="btn primary-green">Guardar cambios</button>
//         </div>
//     `;

function displayFormToEditNameAndLastName (btn, accountDataContainer, form, name, lastname){

    btn.addEventListener('click', () => {
        accountDataContainer.innerHTML = '';
        accountDataContainer.append(form);
        form.name.value = name;
        form.lastname.value = lastname;
    });
}

 function updateNameAndLastname(form, uid){
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        app.main.clearErrorMessages('form p');
        let inputsValidated = app.main.validateEmptyFields([form.name, form.lastname]);
        if (!inputsValidated) return;
        await updateDoc(doc(dbfirestore, "roles_by_user",  uid), {
            nombre: form.name.value,
            apellido: form.lastname.value
        });
        location.reload();
        // displayAccountInfo();
    });
}



// function displayFormToEditEmailAndPassword (btn, accountDataContainer, form, email){

//     btn.addEventListener('click', () => {
//         accountDataContainer.innerHTML = '';
//         accountDataContainer.append(form);
//         form.email.value = email;
//     });
// }

// function updateEmailAndPassword(form){
//     form.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         app.main.clearErrorMessages('form p');
//         let inputsValidated = app.main.validateEmptyFields([form.email, form.password]);
//         if (!inputsValidated) return;

//         const user = auth.currentUser;
        
//         try{
//             await sendEmailVerification(user);
//             // await updateEmail(user, form.email.value);
//             // await updatePassword(user, form.password.value);
//             // location.reload();

//         }catch(error){
//             console.log(error.message)
//             if (error.message.includes('invalid-email')){
//                 app.main.displayErrorMessage('El email ingresado no es válido', form.email);
//             } else if (error.message.includes('email-already-in-use')){
//                 app.main.displayErrorMessage('Este email ya tiene una cuenta', form.email);
//             } else if (error.message.includes('missing-password')){
//                 app.main.displayErrorMessage('La contraseña no puede estar vacía', form.password);
//             } else if (error.message.includes('weak-password')){
//                 app.main.displayErrorMessage('La contraseña debe tener al menos 6 caracteres', form.password);
//             } 

//         }
//     });
// }

onAuthStateChanged(auth, async (user) => {
    if (user) {

        // accountDataInfo2.innerHTML = user.email;
        let label = accountImgContainer.querySelector('label');
        let imgInput = accountImgContainer.querySelector('input');

        const uid = user.uid;

        const docRef = doc(dbfirestore, "roles_by_user",  uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            accountDataInfo.innerHTML = `
                <h3>${docSnap.data().nombre} ${docSnap.data().apellido}</h3>
                <p>${docSnap.data().role}</p>
                <p>${user.email}</p>
            `;
            // console.log(label);

            displayFormToEditNameAndLastName(editNameLink, accountDataContainer, formEditName, docSnap.data().nombre, docSnap.data().apellido);

            updateNameAndLastname(formEditName, uid);


            if(docSnap.data().img){
                label.style.backgroundImage = `url(${docSnap.data().img})`;
            }
        } 


        const profilePictureRef = storageRef(storage, 'avatars/' + uid);

        imgInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            uploadBytes(profilePictureRef, file).then((snapshot) => {
                // console.log('Uploaded a blob or file!');
                getDownloadURL(profilePictureRef).then((url) => {
                    // console.log(url);
                    updateDoc(doc(dbfirestore, "roles_by_user",  uid), {
                        img: url
                    });
                    // label.style.backgroundImage = `url(${url})`;
                    location.reload();
                });
            });
        });











    }
})











function test(){
    console.log('test');
}






let adminMyAccountRouterContent = {
    content: myAccountView,
    breadcrumb: accountIndexBreadcrumbs, 
    h2Text: 'Mi cuenta',
    render: test
};


export { adminMyAccountRouterContent}


