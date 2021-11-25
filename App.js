import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Alert, StyleSheet, Text, View, Button} from 'react-native';
import Collection from "./Views/Collection";
import Discover from "./Views/Discover";
import Feed from "./Views/Feed";
import Highscores from "./Views/Highscores";
import Menu from "./Views/Menu";
import Login from "./Views/Login";
import Tutorial from "./Views/Tutorial";
import Navigationbar from "./Views/Navigationbar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
        <NavigationContainer>
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
});


