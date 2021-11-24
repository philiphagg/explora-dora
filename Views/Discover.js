import React from 'react';
import {Alert, StyleSheet, Text, View, Button} from 'react-native';

function Discover(){
    return(
        <View>
            <Text> Discover </Text>
                <View>
                    <Button
                        title="Sign in here"
                        onPress={() => Alert.alert('Här ska du minsann få logga in')}
                    />
                </View>
        </View>
    )
}
export default Discover;
