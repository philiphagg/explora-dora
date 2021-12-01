import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const LoadingSpinner = () => (
    <View style={[styles.container, styles.horizontal]}>
        {
        //<ActivityIndicator />
        //<ActivityIndicator size="large" />
        //<ActivityIndicator size="small" color="#0000ff" />
        }
        <ActivityIndicator size="large" color="black" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default LoadingSpinner;
