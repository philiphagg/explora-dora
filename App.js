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

export default function App() {
   // const [styles, setStyle] = useState(StylesLight);
    console.log("state",store.getState())
    return (
            <Provider store={store}>
                <SafeAreaView style={styles.AndroidSafeArea}>

                    <Feed/>
                    <Profile/>

                    <AddPost/>





                    <StatusBar style="auto"/>
                </SafeAreaView>
            </Provider>
    );
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});
