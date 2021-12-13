import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const LoadingSpinner = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="black"/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center'
    },
});

export default LoadingSpinner;
