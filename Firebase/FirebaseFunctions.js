import {auth, db, storage, ref, uploadBytes, signOut} from './firebaseconfig'
import {Alert, NativeModules} from "react-native";
import {doc, collection, getDocs, query, where, addDoc} from "firebase/firestore";
import {getDownloadURL} from "firebase/storage";


export function signOuts(logout){
    signOut(auth).then(() => {
        //navigate to signin screen
        logout();
        NativeModules.DevSettings.reload();
    }).catch((error) => {
        console.log(error)
        Alert.alert(error)
    })
}

export async function addImage(addPost, data, title, caption, user, name, lat, lon, resetCollection) {

    const response = await fetch(data.uri);
    const blob = await response.blob();

    const Path = `posts/${auth.currentUser.uid}/${Math.random().toString(36)}`;

    const storageRef = ref(storage, Path);

    uploadBytes(storageRef, blob).then(async (snapshot) => {
        console.log('Image Uploaded Successfully ---------------------------');
        const url = getDownloadURL(storageRef)
        Alert.alert(
            "Image Uploaded Successfully",
            "Post this to your collection and to all other users to see on their feed",
           // + await url,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Post", onPress: async () => {
                        console.log("OK Pressed")
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
            console.log('Image Upload Failed ---------------------------', err);
            Alert.alert("Image Failed To upload, check with the noobs if they can fix it");
        }
    )
}


