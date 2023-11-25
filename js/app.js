import { findByCategory, renderServicesBtns, updateServicesList } from './services.js';
import { signInWithEmailAndPasswordHandler } from './login.js';
import { createUserAndSetDocument, createChat } from './signin.js';
import { element } from './create.js';
import { displayBreadcrumb, clearErrorMessages, displayErrorMessage, validateEmptyFields, renderView } from './main.js';
import { verifyUser, loadDataOnTable, createTableBodyColumns, createTableBtns, deleteDocumentFromFirestore, addHeadingTableRow, createListTable, renderData, createAdminBtn, addCategoriesList, uploadImgToStorageAndAddService, addNewServiceToDB, myDropzoneHandler, createServiceForm, getSeviceData, updateServiceData, addNewCategoryToDB, addNewDocToMyFirestore } from './admin.js';


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
        createAdminBtn,
        loadDataOnTable,
        createTableBodyColumns,
        createTableBtns,
        deleteDocumentFromFirestore,
        addHeadingTableRow,
        createListTable,
        renderData,
        addCategoriesList,
        uploadImgToStorageAndAddService,
        addNewServiceToDB,
        myDropzoneHandler,
        createServiceForm,
        getSeviceData,
        updateServiceData,
        addNewCategoryToDB,
        addNewDocToMyFirestore,
    }
}

export default app;