import { initializeApp} from "firebase/app";
import {getAuth, signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref , uploadBytes } from "firebase/storage";

/**
 * Firebase config. We uploaded this to github so that examinators
 * can run app locally.
 *
 * @type {{storageBucket: string, apiKey: string, messagingSenderId: string, appId: string, projectId: string, authDomain: string}}
 */
const firebaseConfig = {

    apiKey: "AIzaSyAUaxgxSJO03AktFowC71uW1aunDUvh80U",

    authDomain: "explora-dora.firebaseapp.com",

    projectId: "explora-dora",

    storageBucket: "explora-dora.appspot.com",

    messagingSenderId: "179906799925",

    appId: "1:179906799925:web:6baa24904642ae2f66847c"

};




const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage  = getStorage();


export { auth , db, app, storage, ref, uploadBytes, signOut };
