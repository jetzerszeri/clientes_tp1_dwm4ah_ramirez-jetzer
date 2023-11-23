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
const singUpP = app.create.element('p', [], 'No tienes una cuenta?');
const singUpA = app.create.element('btn', ['btn'], 'Registrate aquí');
// singUpBtn.innerHTML = `
//     <p>No tienes una cuenta?</p>
//     <a href="/app.html#signin" class="btn">Registrate aquí</a>
// `;
singUpBtn.appendChild(singUpP);
singUpBtn.appendChild(singUpA);


login.appendChild(app.main.displayBreadcrumb(breadcrumbItems));
login.appendChild(h1);
login.appendChild(form);
login.appendChild(singUpBtn);


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let { email, password } = form;
    
    app.main.clearErrorMessages('form p');
    try {
        await app.login.signInWithEmailAndPasswordHandler(email.value, password.value);
        window.location.href = '/app.html#admin';
        location.reload();
    } catch (error) {
        if (error.message.includes('invalid-email')) {
            app.main.displayErrorMessage('El email ingresado no es válido', email);
        } else if (error.message.includes('missing-password')) {
            app.main.displayErrorMessage('La contraseña no puede estar vacía', password);
        } else if (error.message.includes('invalid-login-credentials')) {
            app.main.displayErrorMessage('Credenciales inválidas', form, '1');
        }
    }
}) 



app.main.renderView(singUpA, '#signin');

export default login;