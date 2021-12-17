import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getFeed, likePost, unlikePost} from "../Redux/Redusers/feed";
import FeedView from "../Views/FeedView";

export function FeedPresenter(props) {
    return (
        <FeedView
            navigation={props.navigation}
            theme={props.theme}
            posts={props.posts}
            styles={props.styles}
            user={props.user}
            getFeed={props.getFeed}
            likePost={props.likePost}
            unlikePost={props.unlikePost}/>
    );
}

const mapStateToProps = state => {
    return {
        theme: state.theme.value.theme,
        posts: state.feed,
        styles: state.theme.value.style,
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFeed: () => dispatch(getFeed()),
        likePost: (data) => dispatch(likePost(data)),
        unlikePost: (data) => dispatch(unlikePost(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedPresenter)

