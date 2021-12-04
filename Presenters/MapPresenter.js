import React from 'react'
import {connect} from 'react-redux'
import {getCollection} from "../Redux/redusers/collection";
import {getMarkers} from "../Redux/redusers/markers";
import {addPost} from "../Redux/redusers/feed";
import {addNodeToPath, getPaths} from "../Redux/redusers/paths";
import MapViewComp from "../Views/MapViewComp";

export function MapPresenter(props) {
    return (
        <MapViewComp
            styles={props.styles}
            user={props.user}
            markers={props.markers}
            theme={props.theme}
            collection={props.collection}

            getMarkers={props.getMarkers}
            getPaths={props.getPaths}
            getCollection={props.getCollection}
            addPathNode={props.addPathNode}
            addPost={props.addPost}
        />
    );
}

const mapStateToProps = state => {
    return {
        styles: state.theme.value.style,
        user: state.user,
        markers: state.markers,
        theme: state.theme.value.theme,
        collection: state.collection,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMarkers: () => dispatch(getMarkers()),
        getCollection: ()  => dispatch(getCollection()),
        getPaths: ()  => dispatch(getPaths()),
        addPathNode: (node)  => dispatch(addNodeToPath(node)),
        addPost: (post)  => dispatch(addPost(post)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPresenter)
