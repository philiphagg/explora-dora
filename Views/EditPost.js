import React from "react";
import {Button, Image, ScrollView, Text, TextInput, View} from "react-native";


/**
 * View that handles the edit post screen.
 * @param navigation
 * @param route
 * @returns {JSX.Element}
 * @constructor
 */
function DetailsView({navigation, route}) {
    const {post, styles, editCaption, deletePost, editUser,collection} = route.params;
    const [isChanging, setChangingC] = React.useState(false);
    const [description, setDescription] = React.useState(post.caption);

    return (
        <ScrollView>
            <View style={styles.divider}>
                <View style={[styles.row, styles.centered]}>
                    <Text style={[styles.h2]}>{post.title}</Text>
                </View>
                <Image source={{uri: post.image}}
                       style={styles.postImage}/>
                <View>
                    {isChanging ?
                        <View style={styles.row}>
                            <TextInput
                                placeholder="New Caption"
                                value={description}
                                onChangeText={text => setDescription(text)}
                                style={styles.input}
                            />
                            <Button
                                title="Save"
                                onPress={e => {
                                    setChangingC(false);
                                    editCaption({id: post.id, user: post.user, caption: description})
                                }}
                            />
                            <Button
                                title="Delete"
                                onPress={e => {
                                    setChangingC(false)
                                    deletePost({...post})
                                    editUser({posts: collection.list.length, score: collection.list.length * 10})
                                    navigation.popToTop()
                                }}
                            />
                        </View>
                        :
                        <View>
                            <View style={styles.row}>
                                <Text style={styles.h2}>{post.likes.length} ❤ </Text>
                                <Button
                                    title="Edit post"
                                    onPress={e => setChangingC(true)}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.h4}>{description} </Text>
                            </View>
                        </View>
                    }
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailsView;
