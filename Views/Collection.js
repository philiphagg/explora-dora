import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, Text, View, Image, Alert, ScrollView, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView,
    Platform} from 'react-native';
import LoadingSpinner from "./Components/LoadingAnimation";
import {editCaption, getCollection} from "../Redux/redusers/collection";
import {editPost, likePost, unlikePost} from "../Redux/redusers/feed";
import {editProfile} from "../Redux/redusers/user";

/*const formatData = (data, numColumns) =>{
    const collections = useSelector((state) => state.collections.value);
    const numberOfFullRows = Math.floor(collections.length / numColumns);

    let numberOfElementsLastRow = collections.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsRow !== 0){
        data.push({key: `blank -${numberOfElementsLastRow}`, empty: true});
        numberOfElementsLastRow = numberOfElementsLastRow +1;
    }

    return data;
}*/

function DetailsView({post, setToNull}){

    const theme = useSelector((state) => state.theme.value.theme);
    const styles = useSelector((state) => state.theme.value.style);
    const [changeC, setChangingC] = React.useState(false);
    const [description, setDescription] = React.useState(post.caption);
    const dispatch = useDispatch();

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
                                dispatch(editCaption({caption:description}))} }
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
                    <Text style={styles.h4}>{post.caption} </Text>
                </View>
            </View>
            <TouchableOpacity onPress={ () => setToNull()}
                              style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Back to your Collection</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}


function Collection() {
    const styles = useSelector((state) => state.theme.value.style);
    const collection = useSelector((state) => state.collection);
    const theme = useSelector((state) => state.theme.value.theme);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();


    const [post, setPost] = React.useState(null);

    const numColumns = 3;

    useEffect(() => {
        dispatch(getCollection())
    }, []);

    return (
        collection.status !== "success" ?
            <View>
                <LoadingSpinner/>
            </View>
            :
            <View>
                {
                post ?
                <DetailsView post={post} setToNull={() => setPost(null)}/>
                :
                <View>
                    <FlatList
                        data={collection.list}
                        numColumns={numColumns}
                        renderItem={({item}) => (

                            <View style={[styles.item]} key={item.id}>
                                <View>
                                    <TouchableOpacity onPress={e => {
                                        setPost(item)
                                    }}>
                                        <Image source={{uri: item.image}}
                                               style={styles.postImageTest}/>
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
