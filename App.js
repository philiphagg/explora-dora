import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import {Platform, StatusBar} from 'react-native';
import store from './Redux/Store';

import Navigationbar from "./Views/Navigationbar";
import {NavigationContainer} from '@react-navigation/native';
import Login from "./Views/Login";
import {auth} from "./Firebase/firebaseconfig";

export default function App() {
    //console.log(store.getState())
    return (
        <Provider store={store}>
            <AppWrapper/>
        </Provider>
    );
}

//Needed to have theme saved with use selector
function AppWrapper() {
    const theme = useSelector((state) => state.theme.value.theme);
    const user = useSelector((state) => state.user);
//statusbar
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
                    <Login/>
            }
        </NavigationContainer>
    )
}

