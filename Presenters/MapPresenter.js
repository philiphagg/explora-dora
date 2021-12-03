import React from 'react'
import {connect} from 'react-redux'
import {getCollection} from "../Redux/redusers/collection";
import {getMarkers} from "../Redux/redusers/markers";
import MapPresenterFile from "../Views/MapPresenterFile";
import {addNodeToPath, getPaths} from "../Redux/redusers/paths";

export function MapPresenter(props) {
    return (
        <MapPresenterFile
            markers={props.markers}
            theme={props.theme}
            collection={props.collection}
            paths={props.paths}

            getMarkers={props.getMarkers}
            getPaths={props.getPaths}
            getCollection={props.getCollection}
            addPathNode={props.addPathNode}

        />
    );
}

const mapStateToProps = state => {
    return {
        markers: state.markers,
        theme: state.theme.value.theme,
        styles: state.theme.value.style,
        collection: state.collection,
        paths: state.paths,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMarkers: () => dispatch(getMarkers()),
        getCollection: ()  => dispatch(getCollection()),
        getPaths: ()  => dispatch(getPaths()),
        addPathNode: (node)  => dispatch(addNodeToPath(node)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPresenter)
