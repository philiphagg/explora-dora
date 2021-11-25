import {Platform, StatusBar, StyleSheet} from "react-native";

const MyTheme = {
    dark: false,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(255,255,255)',
        card: 'rgb(253,255,253)',
        text: 'rgb(78, 159, 61)',
        border: 'rgb(60,141,60)',
        notification: 'rgb(255, 69, 58)',
    },
};
export default {
    settings: MyTheme,
    style: StyleSheet.create({
        h3: {
            color: '#444444',
            fontSize: 16,
        },
        container: {
            flex: 1,
            backgroundColor: '#fff',
            //alignItems: 'center',
            //justifyContent: 'center',
        },
        AndroidSafeArea: {
            flex: 1,
            backgroundColor: "white",
            paddingTop: Platform.OS === "android" ? 0 : 0
            //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        },
        post: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderStyle: "solid",
            borderColor: '#fff',
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
    })
};
