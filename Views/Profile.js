import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, View, Text} from "react-native";
import {toggleTheme} from "../Redux/redusers/theme";


function Profile() {
    const styles = useSelector((state) => state.theme.value.style);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    //const themeColor = useSelector((state) => state.theme.value);

    return (
        <View style={styles.view}>
            <Text style={styles.h3}> Name: {user.name} </Text>
            <Text style={styles.h3}> Age: {user.age}</Text>
            <Text style={styles.h3}> Email: {user.email}</Text>
            <Button
                title="Theme"
                onPress={() => dispatch(toggleTheme())}
            />
        </View>
    );
}

export default Profile;
