import React from 'react'
import {connect} from 'react-redux'
import Highscores from "../Views/Highscores";
import {editUser, getUsers} from "../Redux/redusers/user";
import {getCollection} from "../Redux/redusers/collection";

export function HighScorePresenter(props) {
    return (
        <Highscores styles={props.styles}
                    theme={props.theme}
                    user={props.user}
                    collection={props.collection}
                    getUsers={props.getUsers}
                    getCollection={props.getCollection}
                    editUser={props.editUser}
        />
    );
}

const mapStateToProps = state => {
    return {
        styles: state.theme.value.style,
        theme: state.theme.value.theme,
        user: state.user,
        collection: state.collection,
    }
}

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
