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

let btnLabels = ['Todos','Remodelación', 'Mudanza', 'Real State'];

// function renderServicesBtns(labels, container){
//     labels.forEach(label => {
//         let li = document.createElement('li');
//         li.classList.add('btn', 'secundary-green');
//         li.textContent = label;
//         if (label === 'Todos') {
//             li.classList.add('active');
//         }
//         li.addEventListener('click', filterServices); 
//         container.appendChild(li);
//     });
// }
app.services.renderServicesBtns(btnLabels, filterBtns, ulServices);

// btnLabels.forEach(label => {
//     let li = document.createElement('li');
//     li.classList.add('btn', 'secundary-green');
//     li.textContent = label;
//     if (label === 'Todos') {
//         li.classList.add('active');
//     }
//     li.addEventListener('click', filterServices); 
//     filterBtns.appendChild(li);
// });

// function filterServices(e) {
//     let botones = document.querySelectorAll('.filterBtns .btn')
//     botones.forEach(item => {
//         item.classList.remove('active');
//     });

//     let category = e.target.textContent;
//     category = (category === 'Todos') ? 'all' : category;
//     console.log(category);

//     e.target.classList.add('active');
//     updateServicesList(category, ulServices);    
// }

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

// function updateServicesList(category, container){
//     app.services.findByCategory(category)
//     .then(servicesData => {
//         container.innerHTML = '';
//         servicesData.forEach(data => {
    
        
//             const {name, category, price} = data.data();
    
//             let item = document.createElement('li');
//             let divContainer = document.createElement('div');
//             let divImg = document.createElement('div');
//             let img = document.createElement('img');
//             img.src = 'img/servicesimg.jpg';
//             img.alt = name;
//             let divInfo = document.createElement('div');
//             divInfo.innerHTML = `
//             <div>
//                 <h2>${name}</h2>
//                 <p>${category}</p>
//             </div>
//             <p>$${price}/sqft</p>
//             <a href="contact.html" class="btn secundary-green">Contactar</a>`;
//             divImg.append(img);
//             divContainer.append(divImg);
//             divContainer.append(divInfo);
//             item.append(divContainer);
//             container.append(item);
//         })

//     })
// }



export default servicesView;
