import React, {useEffect} from "react";
import {View, Image, TouchableOpacity, FlatList, Text, ScrollView, RefreshControl} from 'react-native';
import LoadingSpinner from "./Components/LoadingAnimation";

//Delay function for pull to reload wait time
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


function Collection({navigation, collection, styles, getCollection, editCaption, deletePost, editUser}) {

    const numColumns = 3;

    useEffect(() => {
        if (collection.status !== "success")
            getCollection()
    }, [collection]);

    // State for reloading and animation
    const [refreshing, setRefreshing] = React.useState(false);

    // Updates on refresh, updates feed
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getCollection();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        collection.status !== "success" ?
            <LoadingSpinner/>
            :

            collection.list.length === 0 ?
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                >
                    <View style={styles.col}>
                        <View style={[styles.row]}>
                            <Text style={styles.h2}>
                                Hello there, I see that you have not collected any collectibles yet.
                            </Text>
                        </View>
                        <View style={[styles.row]}>
                            <Text style={styles.h3}>
                                Open your map and start exploring your surroundings on your mission to find collectibles
                                and photograph them.
                            </Text>
                        </View>
                        <View style={[styles.row, styles.divider]}>
                            <Text style={styles.h3}>
                                While you search your map will expand and reveal more of your surroundings as you walk.
                                All your collectibles that you collect will appear here.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                :
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                    data={collection.list}
                    numColumns={numColumns}
                    renderItem={({item}) => (
                        <View style={[styles.item]} key={item.id}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
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
    );
}

export default Collection;
