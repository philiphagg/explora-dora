import React, {useState} from "react";
import {Button, Text, View, TextInput, Image, ScrollView} from "react-native";
import {auth, db} from "../Firebase/firebaseconfig"
import 'firebase/database';
import {addImage} from "../Firebase/FirebaseFunctions";


function AddPost({navigation, route}) {
    const { title, lat, lon, data, styles, user, addPost} = route.params;
    //console.log("3. Add image props---------------------------------",route)

    const [caption, onChangeText] = useState("");

    return (
        <ScrollView>
            <View style={styles.centerContent}>
                <Text style={[styles.h1, styles.divider]}> {title}</Text>
            </View>

            <View style={styles.centerContent}>
                <Text style={[styles.h1, styles.divider]}>Add A new post</Text>
            </View>

            <View style={styles.centerContent}>
                <Image source={{uri: data.uri}} style={styles.postImage}/>
            </View>

            <View style={styles.row}>
                <Text style={styles.h3}>How is this place?</Text>
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.inputLarge}
                    placeholder="Write your caption here"
                    onChangeText={onChangeText}
                    value={caption}
                />
            </View>

            <Button
                title="Submit"
                onPress={() => {
                    addImage(addPost, data, title, caption, auth.currentUser.uid, user.name, lat, lon).then( res =>
                        console.log("Result of upload !!!!!!", res)
                    ).catch()
                        console.log("After upload !!!!!!")
                    navigation.popToTop();
                }
                }
            />
        </ScrollView>
    );
}

export default AddPost;
