import React, {useState, useEffect} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet, Text, SafeAreaView, Dimensions, Image, TouchableHighlight} from 'react-native';
import * as Location from 'expo-location';
import LoadingSpinner from "../Components/LoadingAnimation";


/**
 * view that displays the progress to the user
 * @param navigation
 * @param styles
 * @param theme
 * @param paths
 * @param getPaths
 * @param collection
 * @param getCollection
 * @returns {JSX.Element}
 * @constructor
 */
function ProgressView({navigation, styles, theme, paths, getPaths, collection, getCollection}) {
    const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
        if (paths.status !== "success")
            getPaths()
        if (collection.status !== "success")
            getCollection()
    }, []);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        })();
    }, []);

    return (
        errorMsg || paths.status !== "success" || collection.status !== "success" ?
            <LoadingSpinner/>
            :
            <SafeAreaView style={mapStyles.container}>
                <MapView region={{
                    latitude: 59.328962051618056,
                    longitude: 18.068436284363813,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }} followsUserLocation={true} showsMyLocationButton={true}
                         showsUserLocation={true}
                         provider={PROVIDER_GOOGLE} style={mapStyles.map}
                         customMapStyle={theme.dark ? theme.darkMap : theme.lightMap}
                         >
                    {
                        paths.list.length === 0 ?
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
                        collection.list.length === 0 ?
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
                                    onPress={() => navigation.navigate("Collectible", {likeable: false, post, styles,})}
                                >
                                    <TouchableHighlight
                                        style={[mapStyles.profileImgContainer, {
                                            borderColor: theme.colors.text,
                                            borderWidth: 2
                                        }]}
                                    >
                                        <Image
                                            source={{uri: post.image}}
                                            style={mapStyles.profileImg}/>
                                    </TouchableHighlight>
                                </Marker>
                            )
                    }
                </MapView>
            </SafeAreaView>
    );
}

/**
 * Styling for the progress view
 *
 * @type {{container: {backgroundColor: string, alignItems: string, flex: number, justifyContent: string}, profileImgContainer: {borderRadius: number, width: number, height: number}, profileImg: {borderRadius: number, width: number, height: number}, map: {flex: number, width: number, height: number}}}
 */
const mapStyles = StyleSheet.create({
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

export default ProgressView;
