import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, View, Text} from "react-native";
import {toggleTheme} from "../Redux/redusers/theme";


function Profile() {
    const styles = useSelector((state) => state.theme.value);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    //const themeColor = useSelector((state) => state.theme.value);

    return (
        <View style={styles.view}>
            <Text> Profile Page</Text>
            <Text> Name: {user.name} </Text>
            <Text> Age: {user.age}</Text>
            <Text> Email: {user.email}</Text>
            <Button
                title="Theme"
                onPress={() => dispatch(toggleTheme())}
            />
        </View>
    );
}

export default Profile;
