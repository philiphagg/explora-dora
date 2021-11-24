import React, {useState} from 'react';

import store from './Redux/Store';
import {StyleSheet, Text, View, Button, Alert, Image, SafeAreaView, Platform, StatusBar, } from 'react-native';

import Collection from "./Views/Collection";
import Discover from "./Views/Discover";
import Feed from "./Views/Feed";
import Highscores from "./Views/Highscores";
import Menu from "./Views/Menu";
import Login from "./Views/Login";
import Tutorial from "./Views/Tutorial";

import StylesLight from './StylesLight';
import StyleDark from './StylesDark';


store.subscribe(() => { console.log(store.getState())})

export default function App() {
    const [styles, setStyle] = useState(StylesLight);
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <Button
                title="Menu"
                onPress={() => styles === StylesLight ? setStyle(StyleDark) : setStyle(StylesLight)}
            />
            <Feed/>
            <StatusBar style="auto"/>
        </SafeAreaView>
    );
}
/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    postImage: {
        width: 200,
        height: 200,
    },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});*/
