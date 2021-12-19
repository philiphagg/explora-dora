import React from 'react'
import {connect} from 'react-redux'
import HighscoreView from "../Views/HighscoreView";
import {editUser, getUsers} from "../Redux/Redusers/user";
import {getCollection} from "../Redux/Redusers/collection";


/**
 * responsible for the highscore presenter and redux comunication
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function HighScorePresenter(props) {
    return (
        <HighscoreView styles={props.styles}
                       theme={props.theme}
                       user={props.user}
                       collection={props.collection}
                       getUsers={props.getUsers}
                       getCollection={props.getCollection}
                       editUser={props.editUser}
        />
    );
}

/**
 * collects dispatch to props
 * @param state
 * @returns {{styles, theme, collection, user}}
 */
const mapStateToProps = state => {
    return {
        styles: state.theme.value.style,
        theme: state.theme.value.theme,
        user: state.user,
        collection: state.collection,
    }
}
/**
 * collects dispatch to props
 * @param dispatch
 * @returns {{getCollection: (function(): *), getUsers: (function(): *), editUser: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(getUsers()),
        getCollection: () => dispatch(getCollection()),
        editUser: (user) => dispatch(editUser(user)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HighScorePresenter)
