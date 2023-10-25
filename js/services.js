import  app  from './config.js';
import { getFirestore, collection, addDoc, getDocs, orderBy, query, where } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

async function findByCategory(category) {
    if (category === "all") {
        return await getDocs(query(collection(db, "services"), orderBy("name")))
    }
    const q = query(collection(db, "services"), where("category", "==", category));
    return await getDocs(q)
}


export default findByCategory;

