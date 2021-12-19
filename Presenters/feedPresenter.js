import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getFeed, likePost, unlikePost} from "../Redux/Redusers/feed";
import FeedView from "../Views/FeedView";
import {getUsers} from "../Redux/Redusers/user";


/**
 * responsible to handle feed presenters and it's props
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
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

/**
 * collects dispatch to props
 *
 * @param state
 * @returns {{theme, styles, posts: Reducer<{list: *[], status: null}>, user}}
 */

const mapStateToProps = state => {
    return {
        theme: state.theme.value.theme,
        posts: state.feed,
        styles: state.theme.value.style,
        user: state.user.user.id,
    }
}

/**
 * collects dispatch to props
 *
 * @param dispatch
 * @returns {{unlikePost: (function(*=): *), getUser: (function(): *), getFeed: (function(): *), likePost: (function(*=): *)}}
 */
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

