import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './Redux/Store';
import {StyleSheet, Text, View, Button, Alert, Image, SafeAreaView, Platform, StatusBar,} from 'react-native';

import Collection from "./Views/Collection";
import Discover from "./Views/Discover";
import Feed from "./Views/Feed";
import Highscores from "./Views/Highscores";
import Menu from "./Views/Menu";
import Login from "./Views/Login";
import Tutorial from "./Views/Tutorial";
import Profile from "./Views/Profile";
import AddPost from "./Views/AddPost"
import Navigationbar from "./Views/Navigationbar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Navigationbar />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});


const MyTheme = {
    dark: false,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(25, 26, 25)',
        card: 'rgb(25, 26, 25)',
        text: 'rgb(78, 159, 61)',
        border: 'rgb(25, 26, 25)',
        notification: 'rgb(255, 69, 58)',
    },
};
