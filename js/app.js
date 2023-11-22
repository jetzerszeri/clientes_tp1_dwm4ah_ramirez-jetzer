import { findByCategory, renderServicesBtns, updateServicesList } from './services.js';
import { signInWithEmailAndPasswordHandler } from './login.js';
import { element } from './create.js';
import { displayBreadcrumb, clearErrorMessages, displayErrorMessage } from './main.js';


const app = {
    create: {
        element,
    },
    services : {
        findByCategory,
        updateServicesList,
        renderServicesBtns,
    },
    main: {
        displayBreadcrumb,
        clearErrorMessages,
        displayErrorMessage,
    },
    login: {
        signInWithEmailAndPasswordHandler,
    }
}

export default app;