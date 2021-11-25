import React from "react";
import {useSelector} from "react-redux";
import {Button, Text, View,Image,Alert} from "react-native";

function Feed() {
    const styles = useSelector((state) => state.theme.value.style);
    const posts = useSelector((state) => state.posts.value);

    return (
        <View style={styles.view}>
            {
                posts.map(post =>
                    <View style={styles.post} key={post.id}>
                        <View style={styles.padding10}>
                            <Text>{post.title}</Text>
                        </View>
                        <Image source={{uri: post.image}}
                               style={styles.postImage}/>
                        <View style={styles.padding10}>
                            <View style={{display: "flex"}}>
                                <Text style={styles.like}>{post.likes.length} Likes</Text>
                                <Button
                                    title="Like"
                                    onPress={() => Alert.alert('Liked')}
                                />
                            </View>
                        </View>
                        <View style={styles.padding10}>
                            <Text style={styles.likes}>{post.caption} </Text>
                        </View>
                    </View>
                )
            }
        </View>
    );
} export default Feed;
/*
const styles = StyleSheet.create({
        post: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderStyle: "solid",
            borderColor: '#fff',
            marginTop: 10,
            marginBottom: 10,


            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        like: {
            fontWeight: "bold",
            fontSize: 20,

        },
        postImage: {
            width: "95%",
            height: 300,
        },
        container: {
            padding: 10,
        },
    })
;
*/
