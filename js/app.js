import { findByCategory, renderServicesBtns, updateServicesList } from './services.js';
import { element } from './create.js';

const app = {
    crate: {
        element,
    },
    services : {
        findByCategory,
        updateServicesList,
        renderServicesBtns,
    }
}

export default app;