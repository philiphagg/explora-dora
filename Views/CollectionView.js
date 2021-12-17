import React, {useEffect} from "react";
import {View, Image, TouchableOpacity, FlatList, ScrollView, RefreshControl, Text, Dimensions} from 'react-native';
import LoadingSpinner from "../Components/LoadingAnimation";
import trophyImage from "../assets/favpng_trophy-cartoon.png"

//Delay function for pull to reload wait time
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


function CollectionView({
                            navigation,
                            collection,
                            styles,
                            getCollection,
                            editCaption,
                            deletePost,
                            editUser,
                            resetFeed,
                            resetUser
                        }) {


    const numColumns = 3;

    useEffect(() => {
        if (collection.status !== "success")
            getCollection()
        resetFeed();
        resetUser();
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
                            <Image style={{
                                justifyContent: 'center',
                                flex: 1,
                                width: Dimensions.get('window').width / 2,
                                height: Dimensions.get('window').height / 2,
                            }}
                                   source={(trophyImage)}
                            />
                        </View>
                        <View style={[styles.row]}>
                            <Text style={styles.h3}>
                                Open your map and start exploring your surroundings on your mission to find collectibles
                                and photograph them.
                                While you search for collectibles, your map will expand and reveal more of your surroundings as you walk.
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

export default CollectionView;
