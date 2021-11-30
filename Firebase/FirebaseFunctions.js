//import {firebase, doc, getDoc} from "@react-native-firebase/firestore";
import {db} from './firebaseconfig'
import {doc, collection, getDocs, query, where} from "firebase/firestore";
import {addPost, setPosts, addPosts} from "../Redux/redusers/feed";
import {useDispatch} from "react-redux";

/*

export async function getAllFrom(source) {
    const q = query(collection(db, source));
    const list = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
            list.push(
                {
                    caption: doc.data().caption,
                    image: doc.data().image,
                    likes: doc.data().likes,
                    title: doc.data().title,
                    user: doc.data().user,
                })
        }
    )
    console.log(list)
    return list;
}
 */


export async function getAllFrom(source) {
    let list = [];
    try {
        const q = query(collection(db, source));
        getDocs(q).then(response => {
                response.forEach((doc) => list.push(doc.data()));
                console.log("Fetch _-------------------------------------\n", list);
                //const dispatch = useDispatch();
                //dispatch(addPosts(list));
            }
        )
    } catch (err) {
        return {Result: "failed catch"};
    }
    //return {Result: "failed "};
        if(list !== [])
            return list;
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


