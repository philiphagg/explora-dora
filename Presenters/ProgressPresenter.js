import React from 'react'
import {connect} from 'react-redux'
import {getCollection} from "../Redux/redusers/collection";
import Progress from "../Views/Progress";
import {getPaths} from "../Redux/redusers/paths";

export function ProgressPresenter(props) {
    return (
        <Progress
            navigation={props.navigation}
            styles={props.styles}
            theme={props.theme}
            paths={props.paths}
            getPaths={props.getPaths}
            collection={props.collection}
            getCollection={props.getCollection}
        />
    );
}

const mapStateToProps = state => {
    return {
        styles: state.theme.value.style,
        theme: state.theme.value.theme,
        paths: state.paths,
        collection: state.collection,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPaths: () => dispatch(getPaths()),
        getCollection: () => dispatch(getCollection()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgressPresenter)
