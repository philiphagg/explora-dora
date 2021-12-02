import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Text, View, Image, Alert, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import LoadingSpinner from "./Components/LoadingAnimation";
import {getCollection} from "../Redux/redusers/collection";

/*const formatData = (data, numColumns) =>{
    const collections = useSelector((state) => state.collections.value);
    const numberOfFullRows = Math.floor(collections.length / numColumns);

    let numberOfElementsLastRow = collections.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsRow !== 0){
        data.push({key: `blank -${numberOfElementsLastRow}`, empty: true});
        numberOfElementsLastRow = numberOfElementsLastRow +1;
    }

    return data;
}*/

function Collection() {
    const styles = useSelector((state) => state.theme.value.style);
    const collection = useSelector((state) => state.collection);
    const theme = useSelector((state) => state.theme.value.theme);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const numColumns = 3;

    useEffect(() => {
        dispatch(getCollection())
    }, []);

    return (
        <View>
            {
                console.log(collection)
            }
            {
                collection.status !== "success" ?
                    <View>
                        <LoadingSpinner/>
                    </View>
                    :

                    <FlatList
                        data={collection.list}
                        numColumns={numColumns}
                        renderItem={({item}) => (

                            <View style={[styles.item, {backgroundColor: theme.colors.backgroundColor}]} key={item.id}>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        Alert.alert(item.title);
                                    }}>
                                        <Image source={{uri: item.image}}
                                               style={styles.postImage}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
            }
        </View>
    )
}

export default Collection;
