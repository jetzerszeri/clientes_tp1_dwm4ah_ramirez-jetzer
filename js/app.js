import { findByCategory, renderServicesBtns, updateServicesList } from './services.js';
import { signInWithEmailAndPasswordHandler } from './login.js';
import { createUserAndSetDocument, createChat } from './signin.js';
import { element } from './create.js';
import { displayBreadcrumb, clearErrorMessages, displayErrorMessage, validateEmptyFields, renderView } from './main.js';


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
        renderView,
    },
    login: {
        signInWithEmailAndPasswordHandler,
    },
    signin: {
        createUserAndSetDocument,
        createChat,
    }
}

export default app;