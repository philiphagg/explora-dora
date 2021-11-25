import {Platform, StatusBar, StyleSheet} from "react-native";

const MyTheme = {
    dark: true,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(25, 26, 25)',
        card: 'rgb(25, 26, 25)',
        text: 'rgb(78, 159, 61)',
        border: 'rgb(25, 26, 25)',
        notification: 'rgb(255, 69, 58)',
    },
};

export default {
    settings: MyTheme,
    style: StyleSheet.create({
        h3: {
            color: '#ffffff',
            fontSize: 16,
        },
        container: {
            flex: 1,
            backgroundColor: '#494949',
            //alignItems: 'center',
            //justifyContent: 'center',
        },
        view: {
            backgroundColor: '#494949',
        },
        post: {
            backgroundColor: "black",
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderStyle: "solid",
            borderColor: '#000000',
            marginTop: 10,
            marginBottom: 10,


            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        /* Feed And posts*/
        like: {
            fontWeight: "bold",
            fontSize: 20,

        },
        postImage: {
            width: "95%",
            height: 300,
        },
        padding10: {
            padding: 10,
        },
    })};
