import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import {Platform, StatusBar} from 'react-native';
import store from './Redux/Store';

import Navigationbar from "./Navigators/Navigationbar";
import {NavigationContainer} from '@react-navigation/native';
import LoginView from "./Views/LoginView";
import {auth} from "./Firebase/firebaseconfig";


/**
 * function responsible to launch and run the application.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {

    return (
        <Provider store={store}>
            <AppWrapper/>
        </Provider>
    );
}

//Needed to have theme saved with use selector
/**
 * Launches the app through a Navigator container and changes the
 * color of the system icons (wifi, battery etc)
 *
 * @returns {JSX.Element}
 * @constructor
 */
function AppWrapper() {
    const theme = useSelector((state) => state.theme.value.theme);
    const user = useSelector((state) => state.user);

    return (
        <NavigationContainer theme={theme}>
            <StatusBar
                animated={false}
                backgroundColor={ Platform.OS !== 'ios'? theme.colors.card : ""}
                barStyle={
                    Platform.OS === 'ios' ?
                        (theme.dark ? "light-content": "dark-content" ) :
                        (theme.dark ? "light-content": "dark-content" )
                }
                showHideTransition={true}
                hidden={false} />
            {
                user.status === 'loggedIn' || user.status === 'signingOut' || auth.currentUser ?
                    <Navigationbar/>
                    :
                    <LoginView/>
            }
        </NavigationContainer>
    )
}

