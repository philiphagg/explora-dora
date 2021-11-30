import React from "react";
import {useSelector} from "react-redux";
import {Button, Text, View, TextInput} from "react-native";
import {db} from "../Firebase/firebaseconfig"
import 'firebase/database';

import {collection, addDoc} from "firebase/firestore";
import CameraView from "./Components/camera";
import firebase from "firebase/compat";

function AddPost({  navigation , place= "Stockholm"}) {
    const styles = useSelector((state) => state.theme.value.style);
    const user = useSelector((state) => state.user.value);

    const [text, onChangeText] = React.useState("Enter Text");
    const [picture, setPicture] = React.useState(false);

    if (picture) {
        return (
            <>
                <CameraView/>
                <Button
                    title="Return"
                    onPress={x => setPicture(!picture)}
                />
            </>
        );
    } else {

        return (
            <View style={styles.centerContent}>
                <View style={styles.row}>
                    <Text style={[styles.h1, styles.divider]}>
                        Add A new post
                    </Text>
                </View>
                <View style={styles.row}>
                    <Button
                        title="Enter View"
                        onPress={x => navigation.navigate("Take Picture")}
                    />
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
                    onPress={async () => {
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
                />
            </View>
        );
    }
}

export default AddPost;

