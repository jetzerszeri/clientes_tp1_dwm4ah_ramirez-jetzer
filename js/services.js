import  app  from './config.js';
import { getFirestore, collection, addDoc, getDocs, orderBy, query, where } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

async function findByCategory(category) {
    if (category === "all") {
        return await getDocs(query(collection(db, "services"), orderBy("name")))
    }
    const q = query(collection(db, "services"), where("category", "==", category));
    return await getDocs(q)
}


//function to render the categories buttons in the services view
function renderServicesBtns(labels, container, servicesUlContainer){
    labels.forEach(label => {
        let li = document.createElement('li');
        li.classList.add('btn', 'secundary-green');
        li.textContent = label;
        if (label === 'Todos') {
            li.classList.add('active');
        }
        li.addEventListener('click', (e) => filterServices(e, servicesUlContainer)); 
        container.appendChild(li);
    });
}


//function to filter the services by category
function filterServices(e, servicesUlContainer) {
    let botones = document.querySelectorAll('.filterBtns .btn')
    botones.forEach(item => {
        item.classList.remove('active');
    });

    let category = e.target.textContent;
    category = (category === 'Todos') ? 'all' : category;

    e.target.classList.add('active');

    updateServicesList(category, servicesUlContainer);   
}


function updateServicesList(category, container){

    findByCategory(category)
    .then(servicesData => {
        container.innerHTML = '';
        servicesData.forEach(data => {
    
            const {name, category, price} = data.data();
    
            let item = document.createElement('li');
            let divContainer = document.createElement('div');
            let divImg = document.createElement('div');
            let img = document.createElement('img');
            img.src = 'img/servicesimg.jpg';
            img.alt = name;
            let divInfo = document.createElement('div');
            divInfo.innerHTML = `
            <div>
                <h2>${name}</h2>
                <p>${category}</p>
            </div>
            <p>$${price}/sqft</p>
            <a href="#contact" class="btn secundary-green">Contactar</a>`;
            divImg.append(img);
            divContainer.append(divImg);
            divContainer.append(divInfo);
            item.append(divContainer);
            container.append(item);
        })

    })
}


export { findByCategory, renderServicesBtns, updateServicesList };

