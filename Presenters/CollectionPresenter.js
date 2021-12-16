import React from 'react'
import {connect} from 'react-redux'
import Collection from "../Views/Collection";
import {editCaption, getCollection, deletePost} from "../Redux/redusers/collection";
import {editUser} from "../Redux/redusers/user";

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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CollectionPresenter)

