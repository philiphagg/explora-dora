/*
    Main Contributor Thor
*/
import React, {useEffect} from "react";
import {View, ScrollView, RefreshControl} from "react-native";
import LoadingSpinner from "../Components/LoadingAnimation";
import PostView from "./PostView";

//Delay function for pull to reload wait time
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function FeedView({navigation,posts, styles, getFeed, likePost, unlikePost, theme, user, getUser}) {

    //Load feed data if it is not already loaded successfully
    useEffect(() => {
        if (posts.status !== "success")
            getFeed()
        if (user.status !== "success")
            getUser()
    }, [posts, user]);

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
                                <PostView key={post.id} route={{params: {likeable: true, post, styles, unlikePost, likePost, navigation, theme, user}}}/>
                            )
                        }
                    </View>
            }
        </ScrollView>
    );
}

export default FeedView;
