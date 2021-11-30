import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Text, View, Image, Alert, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {likePost} from "../Redux/redusers/collections";

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
    const collections = useSelector((state) => state.collections.value);
    const theme = useSelector((state) => state.theme.value.theme);
    const user = useSelector((state) => state.user.value);
    const numColumns = 3;

    return (
        <View>
            <FlatList
            data = {collections}
            numColumns= {numColumns}
            renderItem={({item}) =>(

                <View style={[styles.item, {backgroundColor: theme.colors.backgroundColor}]} key={item.id}>
                    <View>
                        <TouchableOpacity onPress={() => {
                            Alert.alert(item.title);}}>
                         <Image source={{uri: item.image}}
                               style={styles.postImageTest}/>
                        </TouchableOpacity>
                    </View>
                </View>
             )}
            />

        </View>
    );
}
export default Collection;
