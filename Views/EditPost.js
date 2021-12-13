import React from "react";
import {Button, Image, ScrollView, Text, TextInput, View} from "react-native";

function DetailsView({navigation, route}) {
    const {post, styles, editCaption} = route.params;
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
                                    editCaption({...post, caption: description})
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
