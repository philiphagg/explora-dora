import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Text, View, Image, Alert, ScrollView, TouchableOpacity} from "react-native";
import {setPosts, likePost, unlikePost} from "../Redux/redusers/posts";
import {db} from "../Firebase/firebaseconfig";
import {addDoc, collection} from "firebase/firestore";
import { doc, onSnapshot , getDoc} from "firebase/firestore";
import {getAllFrom} from '../Firebase/FirebaseFunctions'



function Feed() {
    const styles = useSelector((state) => state.theme.value.style);
    const posts = useSelector((state) => state.posts.value);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();



//addDoc(collection(db, "Posts")
    /*

    const fetchBlogs=async()=>{

        const response=collection(db,'Paths');

        const data=await response.get();

        data.docs.forEach(item=>{
            console.log(item.data());
            //dispatch(setPosts([...posts,item.data()]));

        })

    }
     */
/*
    const unsub = onSnapshot(doc(db, "Posts", "SF"), (doc) => {
        console.log("Current data: ", doc.data());
        dispatch(setPosts(doc.data()))
    });
*/
    return (
        <ScrollView>
            <View>
                {/*
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
                                    onPress={() => dispatch(likePost({postId: post.id, userId: user.id}))}
                                />

                            </View>
                            <View style={styles.row}>
                                <Text style={styles.h4}>{post.caption} </Text>
                            </View>
                        </View>
                    )
                    */
                }
                <TouchableOpacity

                    //onPress={ async () => dispatch( setPosts(getAllFrom("Posts")) )
                    onPress={ async () => getAllFrom("Posts")
                    //onPress={ (x)=> getPost(dispatch(setPosts(x)))
                    }
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

export default Feed;
