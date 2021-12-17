import React from 'react';
import { Text, Pressable } from 'react-native';
import {useSelector} from "react-redux";
const styles = useSelector((state) => state.theme.value.style);

export default function WideButton(props) {
    const { onPress, title = 'Save' } = props;
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}
