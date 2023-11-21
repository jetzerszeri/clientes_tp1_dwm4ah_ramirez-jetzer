import app from '../app.js'

const login = app.create.element('main', ['loginmain']);
const form = app.create.element('form');
form.setAttribute('method', 'post');

const h1 = app.create.element('h1', false, 'Iniciar sesión');



let breadcrumbItems = [
    {name: 'Home', view: '#home'},
    {name: 'Panel de administrador'}
];

form.innerHTML =  `
            <div>
                <label for="email">E-mail</label>
                <input type="email" placeholder="ejemplo@ejemplo.com" name="email">
            </div>
            <div>
                <label for="password">Contraseña</label>
                <input type="password" placeholder="Ingresa la contraseña" name="password">
            </div>
            <div>
                <button type="submit" class="btn primary-green">Iniciar sesión</button>
            </div>
`;

const singUpBtn = app.create.element('div', ['signupmsg']);
singUpBtn.innerHTML = `
    <p>No tienes una cuenta?</p>
    <a href="#signin" class="btn">Registrate aquí</a>
`;


login.appendChild(app.main.displayBreadcrumb(breadcrumbItems));
login.appendChild(h1);
login.appendChild(form);
login.appendChild(singUpBtn);


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let { email, password } = form;
    
    app.login.clearErrorMessages('form p');
    try {
        await app.login.signInWithEmailAndPasswordHandler(email.value, password.value);
        window.location.href = '#admin';
    } catch (error) {
        if (error.message.includes('invalid-email')) {
            app.login.displayErrorMessage('El email ingresado no es válido', email);
        } else if (error.message.includes('missing-password')) {
            app.login.displayErrorMessage('La contraseña no puede estar vacía', password);
        } else if (error.message.includes('invalid-login-credentials')) {
            app.login.displayErrorMessage('Credenciales inválidas', form, '1');
        }
    }
}) 


export default login;