import React from 'react'
import {connect} from 'react-redux'
import {getUsers} from "../Redux/redusers/user";
import Highscores from "../Views/Highscores";

export function HighScorePresenter(props) {
    return (
        <Highscores styles={props.styles}
                    theme={props.theme}
                    highscores={props.highscores}
                    getUsers={props.getUsers}
        />
    );
}

const mapStateToProps = state => {
    return {
        styles: state.theme.value.style,
        theme: state.theme.value.theme,
        highscores: state.user.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(getUsers()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HighScorePresenter)
