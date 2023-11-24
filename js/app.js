import { findByCategory, renderServicesBtns, updateServicesList } from './services.js';
import { signInWithEmailAndPasswordHandler } from './login.js';
import { createUserAndSetDocument, createChat } from './signin.js';
import { element } from './create.js';
import { displayBreadcrumb, clearErrorMessages, displayErrorMessage, validateEmptyFields, renderView } from './main.js';
import { verifyUser, loadDataOnTable, createTableBodyColumns, createTableBtns, deleteDocumentFromFirestore, addHeadingTableRow, createListTable, renderData } from './admin.js';


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
    },
    admin: {
        verifyUser,
        loadDataOnTable,
        createTableBodyColumns,
        createTableBtns,
        deleteDocumentFromFirestore,
        addHeadingTableRow,
        createListTable,
        renderData,
    }
}

export default app;