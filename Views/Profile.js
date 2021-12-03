/*
    Main Contributor Fredrik
*/

import React, {useEffect} from "react";
import {View, Text, Switch, TouchableOpacity, TextInput} from "react-native";

function Profile({editUser, toggleTheme,getCollection, getUsers,styles, theme, user, collection}) {

    useEffect(() => {
        //if (user.status !== 'success')
            getUsers()
        //if (collection.status !== 'success')
            getCollection()
    }, []);

    const [nick, setNick] = React.useState(user.name);
    const [changeN, setChangingNick] = React.useState(false);

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
                                editUser({name: nick})
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
                    onValueChange={() => {
                        toggleTheme();
                        editUser({darkTheme: !theme.dark})
                    }}
                    value={theme.dark}
                />

            </View>
        </View>
    );
}

export default Profile;
