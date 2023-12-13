import app from '../app.js'

const signin = app.create.element('main', ['loginmain']);
const form = app.create.element('form');
form.setAttribute('method', 'post');

const h1 = app.create.element('h1', false, 'Crear cuenta');


let breadcrumbItems = [
    {name: 'Home', view: '#home'},
    {name: 'Panel de administrador'}
];

form.innerHTML =  `
    <div>
        <label for="name">Nombre</label>
        <input type="text" name="name">
    </div>
    <div>
        <label for="lastname">Apellido</label>
        <input type="text" name="lastname">
    </div>
    <div>
        <label for="email">E-mail</label>
        <input type="text" name="email">
    </div>

    <div>
        <label for="password">Contraseña</label>
        <input type="password" name="password">
    </div>

    <div>
        <button type="submit" class="btn primary-green">Crear cuenta</button>
    </div>
`;


const loginBtnContainer = app.create.element('div', ['signupmsg']);
const logInP = app.create.element('p', [], 'Ya tienes una cuenta?');
const logInBtn = app.create.element('btn', ['btn'], 'Inicia sesión aquí');

loginBtnContainer.appendChild(logInP);
loginBtnContainer.appendChild(logInBtn);

app.main.renderView(logInBtn, '#login');

signin.appendChild(app.main.displayBreadcrumb(breadcrumbItems));
signin.appendChild(h1);
signin.appendChild(form);
signin.appendChild(loginBtnContainer);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let { name, lastname, email, password } = form;

    app.main.clearErrorMessages('form p');

    if (!app.main.validateEmptyFields([name, lastname, email, password])) return;
    // console.log( 'email: ' + email.value + ' password: ' + password.value + ' name: ' + name.value + ' lastname: ' + lastname.value)

    app.signin.createUserAndSetDocument(email.value, password.value, name.value, lastname.value)
    .then((userId) => app.signin.createChat(userId))
    .then(() => {
        window.location.href = '#admin';
        location.reload();
    })
    .catch((error) => {
        console.log(error);
        if (error.message.includes('invalid-email')){
            app.main.displayErrorMessage('El email ingresado no es válido', email);
        } else if (error.message.includes('email-already-in-use')){
            app.main.displayErrorMessage('Este email ya tiene una cuenta', email);
        } else if (error.message.includes('missing-password')){
            app.main.displayErrorMessage('La contraseña no puede estar vacía', password);
        } else if (error.message.includes('weak-password')){
            app.main.displayErrorMessage('La contraseña debe tener al menos 6 caracteres', password);
        } 
    });


})


export default signin;