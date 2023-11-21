import { findByCategory, renderServicesBtns, updateServicesList } from './services.js';
import { signInWithEmailAndPasswordHandler, clearErrorMessages, displayErrorMessage } from './login.js';
import { element } from './create.js';
import { displayBreadcrumb } from './main.js';


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
    },
    login: {
        signInWithEmailAndPasswordHandler,
        clearErrorMessages,
        displayErrorMessage,
    }
}

export default app;