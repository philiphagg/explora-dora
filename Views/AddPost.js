import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Text, View, TextInput, Image, ScrollView} from "react-native";
import {auth, db} from "../Firebase/firebaseconfig"
import 'firebase/database';
import {addPost} from "../Redux/redusers/feed";
import {addImage} from "../Firebase/FirebaseFunctions";


function AddPost({route, navigation}) {
    const {title, data} = route.params;

    //const camera = useSelector((state) => state.camera);
    const styles = useSelector((state) => state.theme.value.style);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();


    const [text, onChangeText] = React.useState("");
    const [picture, setPicture] = React.useState(false);

    return (
        <ScrollView>

            <View style={styles.centerContent}>
                <Text style={[styles.h1, styles.divider]}> {title}</Text>
            </View>

            <View style={styles.centerContent}>
                <Text style={[styles.h1, styles.divider]}>Add A new post</Text>
            </View>

            <View  style={styles.centerContent}>
                <Image source={{uri: data.uri}} style={styles.postImageTest}/>
            </View>

            <View style={styles.row}>
                <Text style={styles.h3}>How is this place?</Text>
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.inputLarge}
                    placeholder="Write your caption here"
                    onChangeText={onChangeText}
                    value={text}
                />
            </View>

            <Button
                title="Submit"
                onPress={() => {
                    addImage(data).then(
                    dispatch(addPost({
                                title: title,
                                image: "https://media.timeout.com/images/105171709/image.jpg",
                                likes: [],
                                caption: text,
                                user: auth.currentUser.uid,
                                nick: auth.currentUser.displayName,
                            }
                        )
                    ));
                    navigation.navigate("Map")
                }
                }
            />

        </ScrollView>
    );
}

export default AddPost;
/*
{
                            title: place,
                            image: "https://www.visitstockholm.se/media/original_images/f2affbc704fd4836be9b07087a955248.jpg",
                            likes: [],
                            caption: text,
                            user: user.id,
                            nick: "Gangster 44",
                        }
onPress={
    async () => {
    try {
        const docRef = await addDoc(collection(db, "Posts"), {
            title: place,
            image: "https://www.visitstockholm.se/media/original_images/f2affbc704fd4836be9b07087a955248.jpg",
            likes: [],
            caption: text,
            user: user.id,
        });

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
}
 */
