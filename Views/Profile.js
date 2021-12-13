/*
    Main Contributor Fredrik
*/

import React, {useEffect} from "react";
import {View, Text, Switch, TouchableOpacity, TextInput, Button} from "react-native";
import {auth, signOut} from '../Firebase/firebaseconfig';
import {signOuts} from "../Firebase/FirebaseFunctions";

function Profile({editUser, toggleTheme,getCollection, getUsers,styles, theme, user, collection}) {

    useEffect(() => {
        if (user.status !== 'success')
            getUsers()
        if (collection.status !== 'success')
            getCollection()
    }, []);

    useEffect(() => {
        if(user.userData.posts !== collection.list.length)
            editUser({posts: collection.list.length, score: collection.list.length * 10})
    }, [collection, user]);


    const [nick, setNick] = React.useState(user.name);
    const [changeN, setChangingNick] = React.useState(false);

    return (
        <View style={styles.view}>
            <View style={[styles.col, styles.divider]}>
                <Text style={styles.h1}> {user.userData.name} </Text>
                <Text style={styles.h2}> {user.userData.posts} Posts</Text>
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
                                //editUser({name: nick, posts: collection.list.length})
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
                <TouchableOpacity
                    onPress={() =>
                        signOuts()

                    }
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Profile;
