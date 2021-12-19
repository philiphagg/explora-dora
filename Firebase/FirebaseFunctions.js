import {auth, db, storage, ref, uploadBytes, signOut} from './firebaseconfig'
import {Alert, NativeModules} from "react-native";
import {doc, collection, getDocs, query, where, addDoc} from "firebase/firestore";
import {getDownloadURL} from "firebase/storage";

/**
 * Function that handles signingout via firebase
 *
 * @param logout
 */
export function signOuts(logout){
    signOut(auth).then(() => {
        logout();
        NativeModules.DevSettings.reload();
    }).catch((error) => {
        console.log(error)
        Alert.alert(error)
    })
}

/**
 * Function that handles image upload to  firebase.
 *
 * @param addPost
 * @param data
 * @param title
 * @param caption
 * @param user
 * @param name
 * @param lat
 * @param lon
 * @param resetCollection
 * @returns {Promise<void>}
 */
export async function addImage(addPost, data, title, caption, user, name, lat, lon, resetCollection) {

    const response = await fetch(data.uri);
    const blob = await response.blob();

    const Path = `posts/${auth.currentUser.uid}/${Math.random().toString(36)}`;

    const storageRef = ref(storage, Path);

    uploadBytes(storageRef, blob).then(async (snapshot) => {
        const url = getDownloadURL(storageRef)
        Alert.alert(
            "Image Uploaded Successfully",
            "PostView this to your collection and to all other users to see on their feed",
           // + await url,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Post", onPress: async () => {

                        addPost({
                            image: await url,
                            title: title,
                            likes: [],
                            caption: caption,
                            user: user,
                            nick: name,
                            lat: lat,
                            lon: lon,
                        })
                        resetCollection();
                    }
                }
            ]);


    }).catch(err => {
            Alert.alert("Image Failed To upload");
        }
    )
}


