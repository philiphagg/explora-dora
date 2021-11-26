import React from 'react';
import {Alert, StyleSheet, Text, View, Button} from 'react-native';
import {useSelector} from "react-redux";

function Highscores(){
    const styles = useSelector((state) => state.theme.value.styles);

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
                <View>
                    <Text>Here is a list of high scores</Text>
                </View>
            }

        </View>
    )
}
export default Highscores;
