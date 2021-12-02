import React from 'react'
import {connect} from 'react-redux'
import {getCollection} from "../Redux/redusers/collection";
import Progress from "../Views/Progress";

export function ProgressPresenter(props) {
    return (
        <Progress
            styles={props.styles}
            theme={props.theme}
            collection={props.collection}
            getCollection={props.getCollection}
        />
    );
}

const mapStateToProps = state => {
    return {
        styles: state.theme.value.style,
        theme: state.theme.value.theme,
        collection: state.collection,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCollection: () => dispatch(getCollection()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgressPresenter)
