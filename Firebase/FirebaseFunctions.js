//import {firebase, doc, getDoc} from "@react-native-firebase/firestore";
import {db} from'./firebaseconfig'
import {doc,collection, getDocs, query,where} from "firebase/firestore";
import {addPost} from "../Redux/redusers/posts";
import {useDispatch} from "react-redux";
/*
export async function getPost(post) {
    var list = [];

    try {

    var snap = await firebase.firestore()
        .collection('Posts')
        .orderBy('createdAt')
        .get()

    snap.forEach((doc) => {
        list.push(doc.data())
    });
    }catch (error){
        console.log(error);
    }

    post(list);
}
*/
export async function getAllFrom(source){

    //const dispatch = useDispatch();

    const q = query(collection(db, source));
    const querySnapshot = await getDocs(q);
    const list = [];
    const data = {};
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push(doc.data());
        //extractorfunction(doc.data())
       /*
        list.push( {
            caption: doc.data().caption,
            image: doc.data().image,
            likes: doc.data.likes,
            title: doc.data().title,
            user: doc.data().user,
        } )
        */
      //  dispatch(addPost(doc.data()))
    });

    console.log(list);
    return extractorfunction(list);
}

/*

var promise = firebase.firestore().doc("Posts").get();
promise.then(snapshot => {
    // handle the document snapshot here
})
    .catch(error => {
        // handle any errors here
    });
 */

function extractorfunction(item){
    const arr = [];
    item.forEach((x) => arr.push(x.value) )
    console.log(arr);
    return arr;
}
