import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Text, View, Image, Alert, ScrollView, TouchableOpacity} from "react-native";
import {getFeed} from "../Redux/redusers/feed";
import LoadingSpinner from "./Components/LoadingAnimation";

function Feed() {
    const posts = useSelector((state) => state.feed);
    const styles = useSelector((state) => state.theme.value.style);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFeed())
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
                                        <Text style={styles.h2}>{post.user}</Text>
                                        <Text style={styles.h2}>{post.userId}</Text>
                                    </View>
                                    <Image source={{uri: post.image}}
                                           style={styles.postImage}/>
                                    <View style={styles.row}>
                                        <Text style={styles.h2}>{post.likes.length} ❤ </Text>
                                        <Button
                                            title="Like"
                                            onPress={() => dispatch(likePost({postId: post.id, userId: user.id}))}
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
                    dispatch(getFeed())
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Load New Posts</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default Feed;
