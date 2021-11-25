import React from 'react';
import {Alert, StyleSheet, Text, View, Button, } from 'react-native';

function Login(){
const text ='Login with apple';
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text> Welcome please sign in to Explore </Text>
            {
                <View>
                    <Text>Här ska det vara en knapp för google</Text>
                    <Text>Här ska det vara en knapp för apple</Text>
                </View>
            }

        </View>
    )
}



export default Login;
