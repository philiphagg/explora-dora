//import {firebase} from "@react-native-firebase/firestore";
import {auth, db, storage, ref, uploadBytes } from './firebaseconfig'
import {doc, collection, getDocs, query, where, addDoc} from "firebase/firestore";
//import {useSelector} from "react-redux";
//import {expectRendersMatchingSnapshot} from "react-native/Libraries/Utilities/ReactNativeTestTools";


export async function addPost() {
    try {
        await addDoc(collection(db, "Posts"), {
            title: "Test With Add Doc ",
            image: "https://media.timeout.com/images/105171709/image.jpg",
            likes: [],
            caption: "Detta är ett test text",
            user: auth.currentUser.uid,
            nick: "Magnus Uggla",
        });
    }catch (error){
        console.log(error)
    }
}

export async function addImage(data) {
    const response = await fetch(data);
    const blob = await response.blob();

    //const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;
    //storage.ref().child(childPath).put(blob);
    const storageRef = ref(storage, 'post');
    uploadBytes(storageRef, blob).then((snapshot) =>{
        console.log('*********************Uploaded');
    })

}


/*
export async function getAllFrom(source) {

    getDocs(q).then(response => {
                response.forEach((doc) => list.push(doc.data()));
                console.log("Fetch _-------------------------------------\n", list);
                //dispatch(addPosts(list));
            }
        )
            return list;
}




export function getTasksThunk() {
    return dispatch => {
        const tasks = [];
        db.ref(`/`).once('value', snap => {
            snap.forEach(data => {
                let task = data.val();
                tasks.push(task)
            })
        })
            .then(() => dispatch(getTasks(tasks)))
    }
}

export function fetchTest() {
    const q = query(collection(db, source));

    getDocs(q).then(x =>

        forEach((doc) => {
            //if(doc.data() !== Promise)
            list.push(doc.data());
        })
    )

}


var promise = firebase.firestore().doc("Posts").get();
promise.then(snapshot => {
    // handle the document snapshot here
})
    .catch(error => {
        // handle any errors here
    });

function extractorfunction(item) {
    let arr = [{}];
    item.map(x => {

            arr = [...arr, {faderallan: x.caption, image: x.image, likes: x.likes}];
        }
    );

    //item.forEach((x) => arr.push(value) )
    console.log("HEjsan ", arr);
    return arr;
}


export async function getAllFrom(source) {
    const q = query(collection(db, source));
    let list = [];

    await getDocs(q).then(x =>

        x.forEach((doc) => {
            //if(doc.data() !== Promise)
            list.push(doc.data());
        })
    )
    console.log(list)
    /*

    const q = query(collection(db, source));
    let json = null;
    const querySnapshot = await getDocs(q)
    .then(response => {
         json = JSON.stringify(response);
    })
        return json;
     */
/*

const list = [];
promiseNoData(querySnapshot,);

querySnapshot.forEach((doc) => {
//list.push(doc.data())
})

 */

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
function promiseNoData(promise, data, error) {

    if (!promise) {
        return (<span>no data</span>);
    } else if (promise && !data && !error) {
        return (
            <img src="http://www.csc.kth.se/~cristi/loading.gif"/>
        );
    } else if (error) {
        return <span>{error}</span>
    } else
        return false;

}
*/


