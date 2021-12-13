import React, {useEffect} from "react";
import {Button, Text, View, Image, ScrollView, TouchableOpacity, FlatList, TextInput} from 'react-native';
import LoadingSpinner from "./Components/LoadingAnimation";

function DetailsView({post, setToNull, styles, editCaption}){
    const [changeC, setChangingC] = React.useState(false);
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
                    {changeC ?
                        <View style={styles.row}>
                            <TextInput
                                placeholder="New Caption"
                                value={description}
                                onChangeText={text => setDescription(text)}
                                style={styles.input}
                            />
                            <Button
                                title="Save"
                                onPress={e => {setChangingC(false);
                                editCaption({...post, caption:description})} }
                            />
                        </View>
                        :
                        <View style={styles.row}>
                        <Text style={styles.h2}>{post.likes.length} ❤ </Text>
                        <Button
                        title="Edit post"
                        onPress={e => setChangingC(true)}
                        />
                        </View>
                    }
                </View>
                <View style={styles.row}>
                    <Text style={styles.h4}>{description} </Text>
                </View>
            </View>
            <TouchableOpacity onPress={ () => setToNull()}
                              style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Back to your Collection</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}


function Collection({posts, styles, getCollection, editCaption}) {
    const [post, setPost] = React.useState(null);
    const numColumns = 3;

    useEffect(() => {
        getCollection()
    }, []);

    return (
        posts.status !== "success" ?
                <LoadingSpinner/>
            :
            <View>
                {
                post ?
                <DetailsView post={post}
                             setToNull={() => setPost(null)}
                             styles={styles}
                             editCaption = {editCaption}/>
                :
                <View>
                    <FlatList
                        data={posts.list}
                        numColumns={numColumns}
                        renderItem={({item}) => (
                            <View style={[styles.item]} key={item.id}>
                                <View>
                                    <TouchableOpacity onPress={e => {
                                        setPost(item)
                                    }}>
                                        <Image source={{uri: item.image}}
                                               style={styles.postImage}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )}
                    />
                </View>
                }
            </View>
    );
}

export default Collection;
