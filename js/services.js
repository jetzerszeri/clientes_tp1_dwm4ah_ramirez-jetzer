import  app  from './config.js';
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';

const servicesList = document.querySelector('.servicescontainer section ul');
const main = document.querySelector('.servicescontainer');
const sectionServices = document.createElement('section');
const ulServices = document.createElement('ul');

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


const q = query(collection(db, "services"), orderBy("name"));

// async function fetchServices() {
//     const services = await getDocs(q);
//     return services;
// }
const services = await getDocs(q)
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let item = document.createElement('li');
        let divContainer = document.createElement('div');
        let divImg = document.createElement('div');
        let img = document.createElement('img');
        img.src = 'img/servicesimg.jpg';
        img.alt = doc.data().name;
        let divInfo = document.createElement('div');
        divInfo.innerHTML = `
        <div>
            <h2>${doc.data().name}</h2>
            <p>${doc.data().category}</p>
        </div>
        <p>$${doc.data().price}/sqft</p>
        <a href="contact.html" class="btn secundary-green">Contactar</a>`;
        divImg.append(img);
        divContainer.append(divImg);
        divContainer.append(divInfo);
        item.append(divContainer);
        ulServices.append(item);
    });
});

sectionServices.append(ulServices);
main.appendChild(sectionServices);

// const services = await getDocs(q);
export default services;

