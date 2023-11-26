import  app  from './config.js';
import { getFirestore, collection, addDoc, getDocs, orderBy, query, where } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';


const db = getFirestore(app);
const categoriesSnapshot = await getDocs(collection(db, "categories"))

async function getCurrentCategoryName(categoryId, element) {
    categoriesSnapshot.forEach(doc => {
        if (doc.id === categoryId && doc.data().name) {
            element.textContent = doc.data().name;
            return;
        }
    })
}


async function findByCategory(category) {
    if (category === "all") {
        return await getDocs(query(collection(db, "services"), orderBy("name")))
    }
    const q = query(collection(db, "services"), where("category", "==", category));
    return await getDocs(q)
}


function createLiFilterBtns(text, attribute, container, servicesUlContainer){
    let liAll = document.createElement('li');
    liAll.classList.add('btn', 'secundary-green');
    liAll.textContent =  text;
    liAll.setAttribute('data-category', attribute);
    if (text === 'Todos') { liAll.classList.add('active');}
    liAll.addEventListener('click', (e) => filterServices(e, servicesUlContainer));
    container.appendChild(liAll);
}


function renderServicesBtns(container, servicesUlContainer){
    createLiFilterBtns('Todos', 'all', container, servicesUlContainer);
    categoriesSnapshot.forEach(doc => {
        createLiFilterBtns(doc.data().name, doc.id, container, servicesUlContainer);
    })
}


//function to filter the services by category
function filterServices(e, servicesUlContainer) {
    let botones = document.querySelectorAll('.filterBtns .btn')
    botones.forEach(item => {
        item.classList.remove('active');
    });
    let category = e.target.getAttribute('data-category');
    e.target.classList.add('active');
    updateServicesList(category, servicesUlContainer);   
}


async function updateServicesList(category, container){
    findByCategory(category)
    .then(servicesData => {
        container.innerHTML = '';
        servicesData.forEach(data => {
            const {name, category, price, img} = data.data();

            let item = document.createElement('li');
            let divContainer = document.createElement('div');
            let divImg = document.createElement('div');
            let imgTag = document.createElement('img');
            imgTag.src = img;
            imgTag.alt = name;
            let divInfo = document.createElement('div');

            let divInfoTitle = document.createElement('div');
            let h2 = document.createElement('h2');
            h2.textContent = name;
            divInfoTitle.appendChild(h2);
            let pCategory = document.createElement('p');
            divInfoTitle.appendChild(pCategory);

            divInfo.appendChild(divInfoTitle);
            let pPrice = document.createElement('p');
            pPrice.textContent = `$${price}/sqft`;
            divInfo.appendChild(pPrice);
            let a = document.createElement('a');
            a.href = '#contact';
            a.classList.add('btn', 'secundary-green');
            a.textContent = 'Contactar';
            divInfo.appendChild(a);

            getCurrentCategoryName(category, pCategory)

            a.addEventListener('click', (e) => {
                window.location.href = '/app.html#adminChat';
                location.reload();
            })

            divImg.append(imgTag);
            divContainer.append(divImg);
            divContainer.append(divInfo);
            item.append(divContainer);
            container.append(item);
        })
    })
}


export { findByCategory, renderServicesBtns, updateServicesList };

