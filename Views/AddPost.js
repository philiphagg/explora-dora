import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, Button,Text,View, TextInput} from "react-native";
import {addPost} from "../Redux/redusers/posts";

import camera from "expo-camera"

function AddPost({place}) {
    const styles = useSelector((state) => state.theme.value);
    const dispatch = useDispatch();

    const [text, onChangeText] = React.useState("Enter Text");
    const [number, onChangeNumber] = React.useState(null);

    return (
        <View style={styles.view}>
            <Text>
                Add A new post
            </Text>

            <Text>Enter a Description</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            <Button
                title="Submit"
                onPress={() => dispatch(addPost({
                    title: "Stockholm Stadshus",
                    image: "https://www.visitstockholm.se/media/original_images/f2affbc704fd4836be9b07087a955248.jpg",
                    likes: [1293, 1231, 2132, 2133, 12333, 5532, 23423],
                    caption: text,
                    user: "Thoren Nillesson",
                }))}
            />
        </View>
    );
} export default AddPost;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
