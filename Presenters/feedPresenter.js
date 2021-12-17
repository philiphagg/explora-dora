import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getFeed, likePost, unlikePost} from "../Redux/Redusers/feed";
import FeedView from "../Views/FeedView";
import {getUsers} from "../Redux/Redusers/user";

export function FeedPresenter(props) {
    return (
        <FeedView
            navigation={props.navigation}
            theme={props.theme}
            posts={props.posts}
            styles={props.styles}
            getFeed={props.getFeed}
            likePost={props.likePost}
            unlikePost={props.unlikePost}
            user={props.user}
            getUser={props.getUser}

        />
    );
}

const mapStateToProps = state => {
    return {
        theme: state.theme.value.theme,
        posts: state.feed,
        styles: state.theme.value.style,
        user: state.user.user.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFeed: () => dispatch(getFeed()),
        getUser: () => dispatch(getUsers()),
        likePost: (data) => dispatch(likePost(data)),
        unlikePost: (data) => dispatch(unlikePost(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedPresenter)

