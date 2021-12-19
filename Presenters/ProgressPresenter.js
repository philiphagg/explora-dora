import React from 'react'
import {connect} from 'react-redux'
import {getCollection} from "../Redux/Redusers/collection";
import ProgressView from "../Views/ProgressView";
import {getPaths} from "../Redux/Redusers/paths";


/**
 * Presenter for the progress map, comunicates with redux
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function ProgressPresenter(props) {
    return (
        <ProgressView
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

/**
 * collects dispatch to props
 * @param state
 * @returns {{paths: *, styles, theme, collection}}
 */
const mapStateToProps = state => {
    return {
        styles: state.theme.value.style,
        theme: state.theme.value.theme,
        paths: state.paths,
        collection: state.collection,
    }
}
/**
 * collects dispatch to props
 * @param dispatch
 * @returns {{getCollection: (function(): *), getPaths: (function(): *)}}
 */
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
