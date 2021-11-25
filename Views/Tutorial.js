import React from 'react';
import {Alert, StyleSheet, Text, View, Button} from 'react-native';

function Collection(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
