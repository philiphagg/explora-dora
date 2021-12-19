import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';


/**
 * Spinner icon that is used to show user when app is loading
 *
 * @returns {JSX.Element}
 * @constructor
 */
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
