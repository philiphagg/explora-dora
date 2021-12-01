import React, {useEffect} from 'react';
import {Alert, FlatList, Text, StyleSheet, View, TouchableOpacity, Button} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import LoadingSpinner from "./Components/LoadingAnimation";
import {getFeed} from "../Redux/redusers/feed";
import {getScores} from "../Redux/redusers/highscores";
import {getUsers} from "../Redux/redusers/user";


function ordinal_suffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

const Highscores = ({navigation}) => {
    const styles = useSelector((state) => state.theme.value.style);
    const theme = useSelector((state) => state.theme.value.theme);
    const highscores = useSelector((state) => state.user.users);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    }, []);

    return (

        highscores.status !== "success" ?
            <View>
                <LoadingSpinner/>
            </View>
            :

            <View>
                {
                    console.log(highscores)
                }
                <FlatList
                    data={highscores.list}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => {
                            Alert.alert("Rank", item.name + " is currently ranked " + ordinal_suffix(index) + " with " + item.score + "points");
                        }}>
                            <View
                                style={[styles.row, {backgroundColor: index % 2 === 0 ? theme.colors.backgroundColor : theme.colors.smallDetails}]}>
                                <Text style={styles.h2}>
                                    {ordinal_suffix(index += 1)}
                                </Text>
                                <Text style={styles.h3} numberOfLines={1}>{item.name}
                                </Text>
                                <Text style={styles.h3}>{item.score}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index}

                />

            </View>
    )
}

export default Highscores;
