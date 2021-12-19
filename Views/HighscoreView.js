import React, {useEffect} from 'react';
import {Alert, FlatList, Text, View, TouchableOpacity, RefreshControl} from 'react-native';
import LoadingSpinner from "../Components/LoadingAnimation";

/**
 * Function that styles the rows of table in different colors
 * @param i
 * @returns {string}
 */
function ordinal_suffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}


/**
 * Delay function for pull to reload wait time
 * @param timeout
 * @returns {Promise<unknown> | Promise.Promise}
 */
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

/**
 * The view that displays high score to the user
 * @param getUsers
 * @param styles
 * @param theme
 * @param user
 * @param collection
 * @param getCollection
 * @param editUser
 * @returns {JSX.Element}
 * @constructor
 */
const HighscoreView = ({getUsers, styles, theme, user,collection, getCollection, editUser}) => {
    const highscores = user.users;

    //Load user and collection data if it is not already loaded successfully
    useEffect(() => {
        if(highscores.status !== "success" )
            getUsers()
        if (collection.status !== 'success')
            getCollection()
    }, [user,collection]);

    //Updates the user score and posts count
    useEffect(() => {
        if(user.userData.posts !== collection.list.length)
            editUser({posts: collection.list.length, score: collection.list.length * 10})
    }, [collection, user]);

    // State for reloading and animation
    const [refreshing, setRefreshing] = React.useState(false);

    // Updates on refresh, updates feed
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getCollection();
        getUsers();
        wait(2000).then(() => setRefreshing(false));
        if(user.userData.posts !== collection.list.length)
            editUser({posts: collection.list.length, score: collection.list.length * 10})
    }, []);

    return (
        highscores.status !== "success" ?
            <LoadingSpinner/>
            :
            <View>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                    data={highscores.list}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => {
                            Alert.alert("Rank", item.name + " is currently ranked " + ordinal_suffix(index) + " with " + item.score + "points");
                        }}>
                            <View
                                style={[styles.row, {backgroundColor: index % 2 === 0 ? theme.colors.backgroundColor : theme.colors.smallDetails}]}>
                                <Text style={styles.h2}>
                                    {ordinal_suffix(index += 1)}
                                </Text>
                                <Text style={styles.h3} numberOfLines={1}>{item.name}
                                </Text>
                                <Text style={styles.h3}>{item.score}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index}
                />
            </View>
    )
}

export default HighscoreView;
