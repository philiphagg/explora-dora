import { initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


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



export { auth , db, app};
