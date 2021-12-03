/*
    Main Contributor Thor
*/
import React, {useEffect} from "react";
import {Button, Text, View, Image, ScrollView, TouchableOpacity} from "react-native";
import LoadingSpinner from "./Components/LoadingAnimation";
import {auth} from "../Firebase/firebaseconfig";

function Feed({posts, styles, getFeed, likePost, unlikePost}) {

    useEffect(() => {
        getFeed()
    }, []);

    return (
        <ScrollView>
            {
                posts.status !== "success" ?
                    <View>
                        <LoadingSpinner/>
                    </View>
                    :
                    <View>
                        {
                            posts.list.map(post =>
                                <View style={[styles.divider]} key={post.id}>
                                    <View style={styles.row}>
                                        <Text style={styles.h2}>{post.title}</Text>
                                        <Text style={styles.h2}>{post.nick}</Text>
                                    </View>
                                    <Image source={{uri: post.image}}
                                           style={styles.postImage}/>
                                    <View style={styles.row}>
                                        <Text style={styles.h2}>{post.likes.length} ♥ </Text>
                                        <Button
                                            title={post.likes.includes(auth.currentUser.uid) ? "Unlike" : "Like  "}
                                            onPress={() => {
                                                post.likes.includes(auth.currentUser.uid) ?
                                                    unlikePost({post: post}) :
                                                    likePost({post: post})
                                            }}
                                        />
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.h4}>{post.caption} </Text>
                                    </View>
                                </View>
                            )
                        }
                    </View>
            }
            <TouchableOpacity
                onPress={() => {
                    getFeed()
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Load New Posts</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default Feed;
