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

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Start your exploring adventure or here</Text>
            <Button
                title="Sign in"
                onPress={() => Alert.alert('Här ska du minsann få logga in')}
            />

            <Collection />
            <Discover />
            <Feed />
            <Highscores />
            <Login />
            <Menu />
            <Tutorial />

            <StatusBar style="auto"/>
        </View>
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
