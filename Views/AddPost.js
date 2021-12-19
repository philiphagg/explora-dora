import React, {useState} from "react";
import {Button, Text, View, TextInput, Image, ScrollView} from "react-native";
import {auth, db} from "../Firebase/firebaseconfig"
import 'firebase/database';
import {addImage} from "../Firebase/FirebaseFunctions";

/**
 * Responsible for the view that uploads pictures. When user collects
 * landmark they will be prompted with this view.
 *
 * @param navigation
 * @param route
 * @returns {JSX.Element}
 * @constructor
 */
function AddPost({navigation, route}) {
    const {title, lat, lon, data, styles, user, addPost, resetCollection} = route.params;
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
                    addImage(addPost, data, title, caption, auth.currentUser.uid, user.name, lat, lon, resetCollection)
                        .then().catch()

                    navigation.popToTop();
                }
                }
            />
        </ScrollView>
    );
}

export default AddPost;
