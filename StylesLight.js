import {Platform, StatusBar, StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    postImage: {
        width: 200,
        height: 200,
    },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? 0 : 0
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});
