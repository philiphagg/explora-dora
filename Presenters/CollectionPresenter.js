import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Collection from "../Views/Collection";
import {editCaption, getCollection, deletePost} from "../Redux/redusers/collection";
import {editUser, resetUser} from "../Redux/redusers/user";
import {resetFeed} from "../Redux/redusers/feed";

export function CollectionPresenter(props) {
    return (
        <Collection navigation={props.navigation}
                    collection={props.collection}
                    styles={props.styles}
                    user={props.user}
                    getCollection={props.getCollection}
                    editCaption={props.editCaption}
                    deletePost={props.deletePost}
                    editUser={props.editUser}
                    resetFeed={props.resetFeed}
                    resetUser={props.resetUser}

        />
    );
}

const mapStateToProps = state => {
    return {
        collection: state.collection,
        styles: state.theme.value.style,
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCollection: () => dispatch(getCollection()),
        editCaption: (updateCaption) => dispatch(editCaption(updateCaption)),
        deletePost: (post) => dispatch(deletePost(post)),
        editUser: (post) => dispatch(editUser(post)),
        resetFeed: () => dispatch(resetFeed()),
        resetUser: () => dispatch(resetUser()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CollectionPresenter)

