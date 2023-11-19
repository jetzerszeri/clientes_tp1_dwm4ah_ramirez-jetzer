import app from '../app.js'

const login = app.create.element('main', ['loginmain']);


let breadcrumbItems = [
    {name: 'Home', view: '#home'},
    {name: 'Panel de administrador'}
];

// function displayBreadcrumb( breadcrumbItems){
//     let breadcrumb = app.create.element('nav', ['breadcrumb']);
//     let ol = app.create.element('ol');

//     breadcrumbItems.forEach((item, index) => {
//         let li = app.create.element('li');
//         if (index === breadcrumbItems.length - 1){
//             li.setAttribute('aria-current', 'page');
//             li.textContent = item.name;
//         } else {
//             let a = app.create.element('a');
//             a.href = item.link;
//             a.textContent = item.name;
//             li.appendChild(a);
//         }
//         ol.appendChild(li);
//     } )

//     breadcrumb.appendChild(ol);
//     return breadcrumb;
// }

// let breadcrumb = ;
login.appendChild(app.main.displayBreadcrumb(breadcrumbItems));


function changeView(){
    let app = document.getElementById("app");
    app.innerHTML = '';
    app.appendChild(login);
}

export default login;