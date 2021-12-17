import React from 'react'
import {connect} from 'react-redux'
import {editUser, getUsers, logout} from "../Redux/Redusers/user";
import ProfileView from "../Views/ProfileView";
import {toggleTheme} from "../Redux/Redusers/theme";
import {getCollection} from "../Redux/Redusers/collection";

export function ProfilePresenter(props) {
    return (
        <ProfileView
            navigation={props.navigation}
            styles={props.styles}
            user={props.user}
            theme={props.theme}
            collection={props.collection}

            editUser={props.editUser}
            toggleTheme={props.toggleTheme}
            getCollection={props.getCollection}
            getUsers={props.getUsers}
            logout={props.logout}
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
        logout: () => dispatch(logout()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePresenter)
