import React from 'react';
import {Alert, StyleSheet, Text, View, Button} from 'react-native';

function Login(){
    return(
        <View>
            <Text> Login </Text>
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
export default Login;
