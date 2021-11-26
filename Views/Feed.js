import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Text, View, Image, Alert, ScrollView} from "react-native";
import {likePost, unlikePost} from "../Redux/redusers/posts";


function Feed() {
    const styles = useSelector((state) => state.theme.value.style);
    const posts = useSelector((state) => state.posts.value);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <View>
                {
                    posts.map(post =>
                        <View style={[styles.divider]} key={post.id}>
                            <View style={styles.row}>
                                <Text style={styles.h2}>{post.title}</Text>
                            </View>
                            <Image source={{uri: post.image}}
                                   style={styles.postImage}/>
                            <View style={styles.row}>
                                <Text style={styles.h2}>{post.likes.length} ❤ </Text>
                                <Button
                                    title="Like"
                                    onPress={() => dispatch(likePost({postId: post.id, userId: user.id})) }
                                />

                            </View>
                            <View style={styles.padding10}>
                                <Text style={styles.h4}>{post.caption} </Text>
                            </View>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    );
}

export default Feed;
/*
                                <Button
                                    title="Unlike"
                                    onPress={() => dispatch(unlikePost({postId: post.id, userId: user.id})) }
                                />
 */
