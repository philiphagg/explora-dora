import React from 'react';
import {Alert, StyleSheet, Text, View, Button} from 'react-native';
import {useSelector} from "react-redux";

function Collection() {
    const styles = useSelector((state) => state.theme.value.styles);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Collection </Text>
        </View>
    )
}

export default Collection;
