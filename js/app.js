import { findByCategory, renderServicesBtns, updateServicesList } from './services.js';
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
    }
}

export default app;