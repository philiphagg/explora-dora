import React from 'react';
import {Alert, StyleSheet, Text, View, Button} from 'react-native';
import {useSelector} from "react-redux";

function Discover(){
    const styles = useSelector((state) => state.theme.value.styles);

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
