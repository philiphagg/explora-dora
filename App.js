import React, {useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import {View} from 'react-native';
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
    const user = useSelector((state) => state.user.value);

    return (
        <NavigationContainer theme={theme}>
            {
                console.log("User ??? ", user.type)
            }
            {
                //Object.keys(user.apiKey).length === 0 ?
                user.id === undefined ?
                    <Login/>
                    :
                    <Navigationbar/>
            }
        </NavigationContainer>
    )
}

