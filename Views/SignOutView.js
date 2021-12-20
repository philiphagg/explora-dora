import React from "react";
import {View, Text, NativeModules} from "react-native";
import LoadingSpinner from "../Components/LoadingAnimation";


/**
 * View that displays while signing out
 * @param navigation
 * @param route
 * @returns {JSX.Element}
 * @constructor
 */
function SignOutView({navigation, route}) {

    const {styles} = route.params;

    return (
        <View style={styles.view}>
            <View style={[styles.col, styles.divider]}>
                <Text style={styles.h1}> Please wait while you are being signed out </Text>
                <LoadingSpinner/>
            </View>

        </View>
    );
}

export default SignOutView;
