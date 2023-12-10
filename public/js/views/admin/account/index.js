import app from '../../../app.js';
import { renderAdminView } from '../../admin.js';
import appFirebase from '../../../config.js';

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
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
let addNewLink = app.create.element('a', ['btn'], 'Editar nombre');
addNewLink.href = '#adminMyAccountEdit';
addNewLink.addEventListener('click', () => { renderAdminView('#adminMyAccountEdit') });


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

accountData.append(accountDataInfo, addNewLink);

let accountData2 = app.create.element('div', ['accountData2']);
let accountDataInfo2 = app.create.element('p', [], 'prueba@mail.com');

let editEmailLink = app.create.element('a', ['btn'], 'Editar email y contraseña');
editEmailLink.href = '#adminMyAccountEditEmail';
editEmailLink.addEventListener('click', () => { renderAdminView('#adminMyAccountEditEmail') });

accountData2.append(accountDataInfo2, editEmailLink);


accountDataContainer.append(accountData, accountData2);
myAccountView.append(accountImgContainer, accountDataContainer);



onAuthStateChanged(auth, async (user) => {
    if (user) {

        accountDataInfo2.innerHTML = user.email;
        let label = accountImgContainer.querySelector('label');
        let imgInput = accountImgContainer.querySelector('input');

        const uid = user.uid;

        const docRef = doc(dbfirestore, "roles_by_user",  uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            accountDataInfo.innerHTML = `
                <h3>${docSnap.data().nombre} ${docSnap.data().apellido}</h3>
                <p>${docSnap.data().role}</p>
            `;
            // console.log(label);

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


