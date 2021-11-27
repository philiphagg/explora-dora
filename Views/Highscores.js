import React from 'react';
import {Alert, FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(200,209,250,0.1)',
        paddingTop: 100,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        marginTop: 15,
        padding: 20,
        backgroundColor: 'rgba(161,222,155,0.18)',
        fontSize: 22,
        fontWeight: 'bold',
        justifyContent: 'space-between',
    },
    header:{
        backgroundColor: 'rgba(161,222,155,0.18)',
        fontWeight: 'bold',
        fontSize: 17,
    },
    row: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: "#cdcfd7"
    },
    left: {
        flexDirection: "row",
        alignItems: "center"
    },
    rank: {
        fontSize: 17,
        fontWeight: "bold",
        marginRight: 5
    },
    singleDidget: {
        paddingLeft: 16,
        paddingRight: 6
    },
    doubleDidget: {
        paddingLeft: 10,
        paddingRight: 2
    },
    label: {
        fontSize: 17,
        flex: 1,
        paddingRight: 80
    },
    score: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        right: 15,
        paddingLeft: 15
    },
    testHeader: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        marginBottom: 15, marginTop: 20
    }
});
function rowColor(index){
    let oddRowColor = "#6d6e72";
    const evenRowColor = "#424040";
    return( index % 2 === 0 ? evenRowColor : oddRowColor);
}
function onRowPress(item, index){
    return (item, index) => { Alert.alert(item.name + " clicked", item.score + " points, wow!")}
}
function ordinal_suffix (i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
const Highscores = () => {

    return (

        <View style={styles.container}>
            <FlatList

                data={[
                    {name: 'Devin', score: '154'},
                    {name: 'Gurra', score: '98'},
                    {name: 'Johanna', score: '65'},
                    {name: 'sara', score: '34'},
                    {name: 'bertil', score: '31'},
                    {name: 'ngt namn', score: '28'},
                    {name: 'the NOob1', score: '15'},
                    {name: 'the NOob2', score: '11'},
                    {name: 'the NOob3', score: '9'},

                ]}
                renderItem={({item, index}) =>(
                        <TouchableOpacity onPress={() => {
                            alert(item.name + " is currently ranked " + ordinal_suffix(index) + " with " + item.score + "points" );
                        }}>
                    <View style={[styles.row, , {backgroundColor: rowColor(index)}]}>
                            <View style={styles.left}>
                                 <Text
                                    style={[
                                        styles.rank,
                                         item.key < 9 ? styles.singleDidget : styles.doubleDidget]}
                                 >
                                     {ordinal_suffix(index += 1)}
                                 </Text>
                                    <Text style={styles.label} numberOfLines={1}>{item.name}
                                    </Text>
                            </View>
                        <Text style={styles.score}>{item.score}
                        </Text>
                    </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}

            />
        </View>
    )}

export default Highscores;