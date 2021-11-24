import React from 'react';
import {Alert, StyleSheet, Text, View, Button, Image, ScrollView, SafeAreaView} from 'react-native';


function Feed({posts}) {
    const data = {
        posts:
            [
                {
                    id: 21243,
                    image: "https://www.visitstockholm.se/media/original_images/f2affbc704fd4836be9b07087a955248.jpg",
                    likes: [1293, 1231, 2132, 2133, 12333, 5532, 23423],
                    title: "Stockholm Stadshus",
                    user: "Thoren Nillesson",
                    caption: "Jättefint väder och roligt att de fanns fiskmåsar",
                },
                {
                    id: 12321,
                    image: "https://karavanreseguider.se/wp-content/uploads/2018/04/stockholm_slott.jpg",
                    likes: [1293, 1231, 2132, 2133, 12333],
                    title: "Stockholm Slott",
                    user: "mackan",
                    caption: "Vackert .",
                }
            ]
    }

    return (
        <View>
            <ScrollView>
            <Text> Most popular locations </Text>
                <View>
                    {
                        data.posts.map(post =>
                            <View style={styles.post} key={post.id}>
                                <View style={styles.container}>
                                    <Text>{post.title}</Text>
                                </View>
                                <Image source={{uri: post.image}}
                                       style={styles.postImage}/>
                                <View style={styles.container}>
                                    <View style={{display: "flex"}}>
                                        <Text style={styles.like}>{post.likes.length} Likes</Text>
                                        <Button
                                            title="Like"
                                            onPress={() => Alert.alert('Liked')}
                                        />
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.likes}>{post.caption} </Text>
                                </View>
                            </View>
                        )
                    }
                    <Text> No More Posts</Text>
                </View>
            </ScrollView>
        </View>
    )
}

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
export default Feed;
