import { findByCategory, renderServicesBtns, updateServicesList } from './services.js';
import { signInWithEmailAndPasswordHandler } from './login.js';
import { element } from './create.js';
import { displayBreadcrumb, clearErrorMessages, displayErrorMessage, validateEmptyFields } from './main.js';


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
        validateEmptyFields,
    },
    login: {
        signInWithEmailAndPasswordHandler,
    }
}

export default app;