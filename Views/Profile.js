import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {View, Text, Button, Switch, TouchableOpacity, TextInput} from "react-native";
import {toggleTheme, setTheme} from "../Redux/redusers/theme";
import {editUser, getUsers, updateScores} from "../Redux/redusers/user";
import {getFeed} from "../Redux/redusers/feed";
import {getCollection} from "../Redux/redusers/collection";

function Profile() {
    const styles = useSelector((state) => state.theme.value.style);
    const theme = useSelector((state) => state.theme.value.theme);
    const user = useSelector((state) => state.user);
    const collection = useSelector((state) => state.collection.list);
    const [nick, setNick] = React.useState(user.name);
    const [changeN, setChangingNick] = React.useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(collection.status !== 'success')
            dispatch(getCollection())
        dispatch(getUsers())
    }, []);

    return (
        <View style={styles.view}>
            <View style={[styles.col, styles.divider]}>
                <Text style={styles.h1}> {user.userData.name} </Text>
                <Text style={styles.h2}> {collection.length} Posts</Text>
                <Text style={styles.h2}> {user.userData.score} points</Text>
                <Text style={styles.h2}> Email: {user.user.email}</Text>
            </View>
            <View style={[styles.col, styles.divider]}>
                {changeN ?
                    <>
                        <TextInput
                            placeholder="New nick"
                            value={nick}
                            onChangeText={text => setNick(text)}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            onPress={e => {
                                setChangingNick(false);
                                dispatch(editUser({name: nick}))
                            }}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Save nickname</Text>
                        </TouchableOpacity>
                    </> :
                    <TouchableOpacity
                        onPress={e => setChangingNick(true)}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Change your nick</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.row}>
                <Text style={styles.h1}> Change Theme to {theme.dark ? "Light" : "Dark"} </Text>
                <Switch
                    trackColor={{false: "#767577", true: "#81b0ff"}}
                    thumbColor={theme.dark ? "#248cff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {dispatch(toggleTheme()); dispatch(editUser({darkTheme: !theme.dark})) } }
                    value={theme.dark}
                />
            </View>
        </View>
    );
}

export default Profile;
