import {StyleSheet} from "react-native";
import styles from "./Styles";

const darkTheme = {
    dark: true,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(25, 26, 25)',
        card: 'rgb(25, 26, 25)',
        text: 'rgb(78, 159, 61)',
        border: 'rgb(25, 26, 25)',
        notification: 'rgb(255, 69, 58)',
        content: 'rgb(255,255,255)',
        smallDetails: 'rgb(66,66,66)',
    },
};

export default {
    theme: darkTheme,
    style: StyleSheet.create(styles(darkTheme))
};

