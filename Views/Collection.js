import React, {useEffect} from "react";
import {Button, Text, View, Image, ScrollView, TouchableOpacity, FlatList, TextInput} from 'react-native';
import LoadingSpinner from "./Components/LoadingAnimation";

function Collection({navigation, collection, styles, getCollection, editCaption}) {
    //const test = false;
    //const [post, setPost] = React.useState(null);
    const numColumns = 3;
//{post, setToNull, styles, editCaption}

    useEffect(() => {
        if(collection.status !== "success")
            getCollection()
    }, []);

    return (
        collection.status !== "success" ?
                <LoadingSpinner/>
            :
            <View>
                <FlatList
                    data={collection.list}
                    numColumns={numColumns}
                    renderItem={({item}) => (
                        <View style={[styles.item]} key={item.id}>
                            <View>
                                <TouchableOpacity
                                    onPress={ () => {
                                        navigation.navigate("Edit Post", {
                                            post: {...item},
                                            styles: styles,
                                            editCaption: editCaption,
                                        });
                                    }}>
                                    <Image source={{uri: item.image}}
                                           style={[styles.collectionImage]}/>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                />
            </View>
    );
}

export default Collection;

/*
test ?
<DetailsView post={post}
         setToNull={() => setPost(null)}
         styles={styles}
         editCaption = {editCaption}/>
:
 */
