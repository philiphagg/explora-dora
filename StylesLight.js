import {StyleSheet} from "react-native";
import styles from "./Styles";

const lightTheme = {
    dark: false,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(255,255,255)',
        card: 'rgb(253,255,253)',
        text: 'rgb(78, 159, 61)',
        border: 'rgb(60,141,60)',
        notification: 'rgb(255, 69, 58)',
        content: 'rgb(0,0,0)',
        smallDetails: 'rgb(236,236,236)',
    },
};

export default {
    theme: lightTheme,
    style: StyleSheet.create(styles(lightTheme))
};
