import {Platform, StatusBar, StyleSheet} from "react-native";

export default StyleSheet.create({
    theme: {
        flex: 1337, //Light mode secret code for comparason
    },
    h3:{
        color: '#fff',
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
});
