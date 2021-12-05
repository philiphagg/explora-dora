import * as React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet, Text, SafeAreaView, Dimensions, View, Image, TouchableHighlight} from 'react-native';
import * as Location from 'expo-location';
import {useEffect} from "react";
import LoadingSpinner from "./Components/LoadingAnimation";

//import {TouchableHighlight} from "react-native-gesture-handler";

function Progress({theme, paths, getPaths, collection, getCollection}) {
    const [errorMsg, setErrorMsg] = React.useState(null);

    useEffect(() => {
        if (paths.status !== "success")
            getPaths()
        if (collection.status !== "success")
            getCollection()
    }, []);

    React.useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        })();
    }, []);

    return (
        errorMsg ? <Text>{errorMsg}</Text> :
            <SafeAreaView style={styles.container}>
                <MapView followsUserLocation={true} showsMyLocationButton={true} showsUserLocation={true}
                         provider={PROVIDER_GOOGLE} style={styles.map}
                         customMapStyle={theme.dark ? theme.darkMap : theme.lightMap}>
                    {
                        paths.status !== "success" ?
                            null
                            :
                            <MapView.Heatmap points={paths.list.map(c => ({
                                latitude: c.latitude,
                                longitude: c.longitude,
                                weight: 100
                            }))}
                                             opacity={1}
                                             radius={20}
                                             maxIntensity={1000}
                                             gradientSmoothing={10}
                                             heatmapMode={"POINTS_WEIGHT"}/>
                    }
                    {
                        collection.status !== "success" ?
                            null
                            :
                            collection.list.map(post =>
                                <Marker
                                    key={post.id}
                                    coordinate={{
                                        latitude: parseFloat(post.lat),
                                        longitude: parseFloat(post.lon),
                                    }}
                                    description={post.title}
                                >
                                    <TouchableHighlight
                                        style={[styles.profileImgContainer, {
                                            borderColor: theme.colors.text,
                                            borderWidth: 2
                                        }]}
                                    >
                                        <Image
                                            source={{uri: post.image}}
                                            style={styles.profileImg}/>
                                    </TouchableHighlight>
                                </Marker>
                            )
                    }
                </MapView>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profileImgContainer: {
        // marginLeft: 1,
        height: 36,
        width: 36,
        borderRadius: 18,
    },
    profileImg: {
        height: 32,
        width: 32,
        borderRadius: 18,
    },
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default Progress;
