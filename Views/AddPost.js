import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Text, View, TextInput, Image} from "react-native";
import {auth, db} from "../Firebase/firebaseconfig"
import 'firebase/database';
import {addPost} from "../Redux/redusers/feed";

function AddPost({route, navigation}) {
    const {title, image} = route.params;
    const styles = useSelector((state) => state.theme.value.style);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();


    const [text, onChangeText] = React.useState("Enter Text");
    const [picture, setPicture] = React.useState(false);

    return (
        <View style={styles.centerContent}>
            <View>

                <Image source={{uri: image}} style={[{flex: 1}, styles.postImage]}/>
            </View>
            <View style={styles.row}>
                <Text style={[styles.h1, styles.divider]}>
                    {title}
                    {image}
                </Text>
                <Text style={[styles.h1, styles.divider]}>
                    Add A new post
                </Text>
            </View>
            <View style={styles.row}>
                <Button
                    title="TakePicture"
                    onPress={x => setPicture(!picture)}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.h3}>Enter a Description</Text>
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.inputLarge}
                    placeholder="Skriv en kort beskrivning"
                    onChangeText={onChangeText}
                    value={text}
                />
            </View>

            <Button
                title="Submit"
                onPress={() => dispatch(addPost({
                    title: "Test With Add Doc ",
                    image: "https://media.timeout.com/images/105171709/image.jpg",
                    likes: [],
                    caption: text,
                    user: auth.currentUser.uid,
                    nick: auth.currentUser.displayName,
                }))}
            />
        </View>
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
