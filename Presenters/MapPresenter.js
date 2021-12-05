import React from 'react'
import {connect} from 'react-redux'
import {getMarkers} from "../Redux/redusers/markers";
import {getCollection} from "../Redux/redusers/collection";
import {addPost} from "../Redux/redusers/feed";
import {addNodeToPath, getPaths} from "../Redux/redusers/paths";
import MapPresenterFile from "../Views/MapPresenterFile";

export function MapPresenter(props) {
    console.log("Map presenter",props)
    //{title, lat, lon, styles, user, addPost} Camera

    return (
        <MapPresenterFile
            markers = {props.markers}
            theme = {props.theme}
            collection = {props.collection}
            styles = {props.styles}

            getMarkers = {props.getMarkers}
            getPaths = {props.getPaths}
            getCollection = {props.getCollection}
            addPathNode = {props.addPathNode}
            addPost = {props.addPost}
            navigation ={props.navigation}
            route ={props.route}
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
        getCollection: () => dispatch(getCollection()),
        getPaths: () => dispatch(getPaths()),
        addPathNode: (node) => dispatch(addNodeToPath(node)),
        addPost: (post) => dispatch(addPost(post)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPresenter)
