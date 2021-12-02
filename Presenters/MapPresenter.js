import React from 'react'
import {connect} from 'react-redux'
import {getCollection} from "../Redux/redusers/collection";
import {getMarkers} from "../Redux/redusers/markers";
import MapPresenterFile from "../Views/MapPresenterFile";

export function MapPresenter(props) {
    return (
        <MapPresenterFile
            markers={props.markers}
            theme={props.theme}
            collection={props.collection}

            getMarkers={props.getMarkers}
            getCollection={props.getCollection}
        />
    );
}

const mapStateToProps = state => {
    return {
        markers: state.markers,
        theme: state.theme.value.theme,
        styles: state.theme.value.style,
        collection: state.collection,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMarkers: () => dispatch(getMarkers()),
        getCollection: ()  => dispatch(getCollection()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPresenter)
