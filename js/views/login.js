import app from '../app.js'

const login = app.create.element('main', ['loginmain']);


let breadcrumbItems = [
    {name: 'Home', view: '#home'},
    {name: 'Panel de administrador'}
];


login.appendChild(app.main.displayBreadcrumb(breadcrumbItems));


// function changeView(){
//     let app = document.getElementById("app");
//     app.innerHTML = '';
//     app.appendChild(login);
// }

export default login;