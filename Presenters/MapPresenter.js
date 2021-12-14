import React from 'react'
import {connect} from 'react-redux'
import {getMarkers} from "../Redux/redusers/markers";
import {getCollection} from "../Redux/redusers/collection";
import {addPost} from "../Redux/redusers/feed";
import {addNodeToPath, getPaths} from "../Redux/redusers/paths";
import MapPresenterFile from "../Views/MapPresenterFile";
import {editUser} from "../Redux/redusers/user";

export function MapPresenter(props) {
    console.log("Map presenter",props)
    //{title, lat, lon, styles, user, addPost} Camera
    //navigation, route, markers, theme, getMarkers, addPathNode, styles, user, addPost,getPaths,paths
    return (
        <MapPresenterFile
/*
            markers={props.markers}
            theme={props.theme}
            collection={props.collection}
            paths={props.paths}

            getMarkers={props.getMarkers}
            getPaths={props.getPaths}
            getCollection={props.getCollection}
            addPathNode={props.addPathNode}
*/
            navigation ={props.navigation}
            route ={props.route}

            markers = {props.markers}
            collection = {props.collection}
            paths={props.paths}
            theme = {props.theme}
            styles = {props.styles}

            getMarkers = {props.getMarkers}
            getPaths = {props.getPaths}
            getCollection = {props.getCollection}

            addPathNode = {props.addPathNode}
            addPost = {props.addPost}
            editUser = {props.editUser}
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
        paths: state.paths,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMarkers: () => dispatch(getMarkers()),
        getCollection: () => dispatch(getCollection()),
        getPaths: () => dispatch(getPaths()),
        addPathNode: (node) => dispatch(addNodeToPath(node)),
        addPost: (post) => dispatch(addPost(post)),
        editUser: (user) => dispatch(editUser(user)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPresenter)
