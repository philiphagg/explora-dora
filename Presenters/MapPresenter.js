import React from 'react'
import {connect} from 'react-redux'
import {getMarkers} from "../Redux/Redusers/markers";
import {getCollection, resetCollection} from "../Redux/Redusers/collection";
import {addPost} from "../Redux/Redusers/feed";
import {addNodeToPath, getPaths} from "../Redux/Redusers/paths";
import MapView1 from "../Views/MapView1";
import {editUser, getUsers} from "../Redux/Redusers/user";

export function MapPresenter(props) {
    console.log("Map presenter",props)
    //{title, lat, lon, styles, user, addPost} Camera
    //navigation, route, markers, theme, getMarkers, addPathNode, styles, user, addPost,getPaths,paths
    return (
        <MapView1
            navigation ={props.navigation}
            route ={props.route}

            markers = {props.markers}
            getMarkers = {props.getMarkers}

            collection = {props.collection}
            getCollection = {props.getCollection}
            resetCollection = {props.resetCollection}

            paths={props.paths}
            getPaths = {props.getPaths}

            user={props.user.userData}
            getUser = {props.getUser}
            editUser = {props.editUser}

            theme = {props.theme}
            styles = {props.styles}

            addPathNode = {props.addPathNode}
            addPost = {props.addPost}

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
        getUser: () => dispatch(getUsers()),
        addPathNode: (node) => dispatch(addNodeToPath(node)),
        addPost: (post) => dispatch(addPost(post)),
        editUser: (user) => dispatch(editUser(user)),
        resetCollection: () => dispatch(resetCollection()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPresenter)
