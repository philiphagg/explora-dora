import React from 'react';
import {Alert, StyleSheet, Text, View, Button} from 'react-native';

function Collection(){
    return(
        <View>
            <Text> Collection </Text>
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
export default Collection;
