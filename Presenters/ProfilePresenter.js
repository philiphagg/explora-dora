import React from 'react'
import {connect} from 'react-redux'
import {editUser, getUsers} from "../Redux/redusers/user";
import Profile from "../Views/Profile";
import {toggleTheme} from "../Redux/redusers/theme";
import {getCollection} from "../Redux/redusers/collection";

export function ProfilePresenter(props) {
    return (
        <Profile
            styles={props.styles}
            theme={props.theme}
            user={props.user}
            collection={props.collection}

            editUser={props.editUser}
            toggleTheme={props.toggleTheme}
            getCollection={props.getCollection}
            getUsers={props.getUsers}
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
        editUser: (updatedUser) => dispatch(editUser(updatedUser)),
        toggleTheme: () => dispatch(toggleTheme()),
        getCollection: () => dispatch(getCollection()),
        getUsers: () => dispatch(getUsers()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePresenter)
