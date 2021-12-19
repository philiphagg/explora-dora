
import React, {useEffect} from "react";
import {View, ScrollView, RefreshControl} from "react-native";
import LoadingSpinner from "../Components/LoadingAnimation";
import PostView from "./PostView";

/**
 * Delay function for pull to reload wait time
 * @param timeout
 * @returns {Promise<unknown> | Promise.Promise}
 */

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

/**
 * View that displays the feed to the user
 * @param navigation
 * @param posts
 * @param styles
 * @param getFeed
 * @param likePost
 * @param unlikePost
 * @param theme
 * @param user
 * @param getUser
 * @returns {JSX.Element}
 * @constructor
 */
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
