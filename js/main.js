import { element } from './create.js';

const togglebtn = document.querySelector('.toggle-button');
const navbarlinks = document.querySelector('.navbar-links');

togglebtn.addEventListener('click', () => {
    navbarlinks.classList.toggle('active');
})

function displayBreadcrumb( breadcrumbItems){
    let breadcrumb = element('nav', ['breadcrumb']);
    let ol = element('ol');

    breadcrumbItems.forEach((item, index) => {
        let li = element('li');
        if (index === breadcrumbItems.length - 1){
            li.setAttribute('aria-current', 'page');
            li.textContent = item.name;
        } else {
            let a = element('a');
            a.href = item.view;
            a.textContent = item.name;
            a.addEventListener('click', () => {
                changeView(item.view)
            });
            li.appendChild(a);
        }
        ol.appendChild(li);
    } )

    breadcrumb.appendChild(ol);
    return breadcrumb;    
}

function clearErrorMessages(query) {
    const errorMessages = document.querySelectorAll(query);
    errorMessages.forEach((msj) => {
        msj.remove();
    });
}


function displayErrorMessage(message, targetElement, formTarget) {
    const p = document.createElement('p');
    p.classList.add('errorForMmsg');
    p.innerText = message;

    if (formTarget){
        targetElement.prepend(p);
    } else {
        targetElement.parentElement.appendChild(p);
    }
}

function validateEmptyFields(array) {
    array.forEach((input) => {
        if (!input.value.trim()) {
            displayErrorMessage('Este campo no puede estar vacío', input);
        }
    });

    let errorMessages = document.querySelectorAll('.errorForMmsg');
    if (errorMessages.length > 0) {
        return false;
    } else {
        return true;
    }
}



export { displayBreadcrumb, clearErrorMessages, displayErrorMessage, validateEmptyFields }