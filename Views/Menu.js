import React from 'react';
import {Alert, StyleSheet, Text, View, Button} from 'react-native';

function Menu(){
    return(
        <View>
            <Text> Menu </Text>
            {
                <View>
                    <Button
                        title="Sign in here"
                        onPress={() => Alert.alert('Här ska du minsann få logga in')}
                    />
                </View>
            }

        </View>
    )
}
export default Menu;
