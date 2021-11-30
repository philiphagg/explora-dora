import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, View, Button} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getCollection} from "../Redux/redusers/collection";
import {getFeed} from "../Redux/redusers/feed";

function Collection() {
    const posts = useSelector((state) => state.collection);
    const styles = useSelector((state) => state.theme.value.styles);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFeed())
        //dispatch(getCollection())
    }, []);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Collection </Text>
        </View>
    )
}

export default Collection;
