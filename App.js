import React, {useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import store from './Redux/Store';

import Navigationbar from "./Views/Navigationbar";
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
    console.log(store.getState())
    return (
        <Provider store={store}>
            <AppWrapper/>
        </Provider>
    );
}

//Needed to have theme saved with use selector
function AppWrapper(){
    const theme = useSelector((state) => state.theme.value.theme);
    return (
        <NavigationContainer theme={theme}>
            <Navigationbar/>
        </NavigationContainer>
    )
}
