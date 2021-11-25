import {Platform, StatusBar, StyleSheet} from "react-native";

const themeColors = (
    {
        background:  '#494949',
        headers:  '#494949',
        text:  '#494949',
    }
)


export default StyleSheet.create({
    theme: {
        flex: 420, //Dark mode secret code for comparason
    },
    container: {
        flex: 1,
        backgroundColor: '#494949',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    view:{
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
});
