import React from 'react'
import {connect} from 'react-redux'
import {editUser, getUsers, logout, resetUser} from "../Redux/Redusers/user";
import ProfileView from "../Views/ProfileView";
import {toggleTheme} from "../Redux/Redusers/theme";
import {getCollection} from "../Redux/Redusers/collection";

/**
 * Presenter for the profile that comunicates with redux
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
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
            resetUser={props.resetUser}
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
 * @returns {{toggleTheme: (function(): *), getCollection: (function(): *), logout: (function(): *), getUsers: (function(): *), editUser: (function(*=): *), resetUser: (function(): *)}}
 */
const mapDispatchToProps = dispatch => {
    return {
        editUser: (updatedUser) => dispatch(editUser(updatedUser)),
        toggleTheme: () => dispatch(toggleTheme()),
        getCollection: () => dispatch(getCollection()),
        getUsers: () => dispatch(getUsers()),
        logout: () => dispatch(logout()),
        resetUser: () => dispatch(resetUser()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePresenter)
