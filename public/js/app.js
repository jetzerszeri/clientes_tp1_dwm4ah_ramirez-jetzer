import { findByCategory, renderServicesBtns, updateServicesList, getCurrentCategoryName } from './services.js';
import { signInWithEmailAndPasswordHandler } from './login.js';
import { createUserAndSetDocument, createChat } from './signin.js';
import { element } from './create.js';
import { displayBreadcrumb, clearErrorMessages, displayErrorMessage, validateEmptyFields, renderView } from './main.js';
import { verifyUser, loadDataOnTable, createTableBodyColumns, createTableBtns, deleteDocumentFromFirestore, addHeadingTableRow, createListTable, renderData, createAdminBtn, addCategoriesList, uploadImgToStorageAndAddService,  myDropzoneHandler, createServiceForm, addNewDocToMyFirestore, renderCategoriesForm,  getCollectionData, updateFirestoreDocument} from './admin.js';
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
        myDropzoneHandler,
        createServiceForm,
        addNewDocToMyFirestore,
        renderCategoriesForm,
        getCollectionData,
        updateFirestoreDocument
    },
    chat: chatFuncions,
}

export default app;