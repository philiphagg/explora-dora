import React, {useEffect} from "react";
//import {useDispatch, useSelector} from "react-redux";
import {Button, Text, View, Image, Alert, ScrollView, TouchableOpacity} from "react-native";
//import {getFeed, likePost, unlikePost} from "../Redux/redusers/feed";
import LoadingSpinner from "./Components/LoadingAnimation";
import {auth} from "../Firebase/firebaseconfig";
import {getUsers} from "../Redux/redusers/user";


function Feed({posts, styles, user, getFeed, likePost, unlikePost}) {
    //const posts = useSelector((state) => state.feed);
    //const styles = useSelector((state) => state.theme.value.style);
    //const user = useSelector((state) => state.user);
    //const dispatch = useDispatch();

    useEffect(() => {
        getFeed()
        if (user.users.status !== "success")
            getUsers()
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
                                        {
                                            //user.users.list.find(user => user.uid === post.user).name
                                        }
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
