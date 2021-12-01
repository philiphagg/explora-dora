import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { Button, Text, View, Image, Alert, ScrollView, TouchableOpacity, FlatList, TextInput,
    KeyboardAvoidingView,
    Platform } from 'react-native';
import {editCaption, likePost} from "../Redux/redusers/collections";
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
                        <>
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
                        </>
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
    const collections = useSelector((state) => state.collections.value);
    const theme = useSelector((state) => state.theme.value.theme);
    const user = useSelector((state) => state.user.value);


    const [post, setPost] = React.useState(null);

    const numColumns = 3;

    return (
        post ?
            <DetailsView post={post} setToNull={() => setPost(null)}/>
            :
            <View>
                <FlatList
                    data={collections}
                    numColumns={numColumns}
                    renderItem={({item}) => (

                        <View style={[styles.item]} key={item.id}>
                            <View>
                                <TouchableOpacity onPress={e => {setPost(item)}}>
                                    <Image source={{uri: item.image}}
                                           style={styles.postImageTest}/>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                />

            </View>
    );
}/*<View style={[styles.col, styles.divider]}>
                {changeN ?
                    <>
                        <TextInput
                            placeholder="New nick"
                            value={nick}
                            onChangeText={text => setNick(text)}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            onPress={e => {setChangingNick(false);
                            dispatch(editProfile({name:nick}))} }
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Save nickname</Text>
                        </TouchableOpacity>
                    </> :
                    <TouchableOpacity
                        onPress={e => setChangingNick(true)}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Change your nick</Text>
                    </TouchableOpacity>
                }
            </View>*/
export default Collection;
