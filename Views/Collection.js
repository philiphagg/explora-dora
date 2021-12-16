import React, {useEffect} from "react";
import {View, Image, TouchableOpacity, FlatList} from 'react-native';
import LoadingSpinner from "./Components/LoadingAnimation";


//Delay function for pull to reload wait time
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


function Collection({navigation, collection, styles, getCollection, editCaption, deletePost, editUser}) {


    const numColumns = 3;

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
                                            deletePost: deletePost,
                                            editUser: editUser,
                                            collection: collection,
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
