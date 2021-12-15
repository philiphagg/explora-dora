/*
    Main Contributor Thor
*/
import React, {useEffect} from "react";
import {View, ScrollView, RefreshControl} from "react-native";
import LoadingSpinner from "./Components/LoadingAnimation";
import Post from "./Post";

//Delay function for pull to reload wait time
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function Feed({posts, styles, getFeed, likePost, unlikePost}) {

    //Load feed data if it is not already loaded successfully
    useEffect(() => {
        if (posts.status !== "success")
            getFeed()
    }, []);

    // State for reloading and animation
    const [refreshing, setRefreshing] = React.useState(false);

    // Updates on refresh, updates feed
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getFeed();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
            {
                posts.status !== "success" ?
                    <LoadingSpinner/>
                    :
                    <View>
                        {
                            posts.list.map(post =>
                                <Post key={post.id} route={{params: {likeable: true, post, styles, unlikePost, likePost}}}/>
                            )
                        }
                    </View>
            }
        </ScrollView>
    );
}

export default Feed;
