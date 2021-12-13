import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {editCaption, getCollection,} from "../Redux/redusers/collection";
import Collection from "../Views/Collection";

export function CollectionPresenter(props) {
    return (
        <Collection collection={props.collection}
                    styles={props.styles}
                    user={props.user}
                    getCollection={props.getCollection}
                    editCaption={props.editCaption}
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CollectionPresenter)

