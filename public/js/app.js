import { findByCategory, renderServicesBtns, updateServicesList, getCurrentCategoryName } from './services.js';
import { signInWithEmailAndPasswordHandler } from './login.js';
import { createUserAndSetDocument, createChat } from './signin.js';
import { element } from './create.js';
import { displayBreadcrumb, clearErrorMessages, displayErrorMessage, validateEmptyFields, renderView } from './main.js';
import { adminFunctions } from './admin.js';
import { chatFuncions } from './chat.js';


const app = {
    create: {
        element,
    },
    services : {
        findByCategory,
        updateServicesList,
        renderServicesBtns,
        getCurrentCategoryName
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
    },
    admin: adminFunctions,
    chat: chatFuncions,
}

export default app;