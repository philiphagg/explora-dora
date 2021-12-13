import * as React from 'react';
import {useEffect} from "react";
import MapView, {AnimatedRegion, Circle, Marker, Overlay, PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet, Text, View, SafeAreaView, Dimensions, Animated, Button} from 'react-native';
import * as Location from 'expo-location';
import MaskedView from "@react-native-masked-view/masked-view";
import {getDistance} from "geolib";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingSpinner from "./Components/LoadingAnimation";

const disablePathFetching = true; /* Disables the uploading of coordinates to firebase while developing */

function MapPresenterFile({navigation, route, markers, theme, getMarkers, addPathNode, styles, user, addPost}) {

    // console.log("1. Props MapPresenterFile ----------------------------------", styles)

    useEffect(() => {
        getMarkers()
    }, []);


    const [location, setLocation] = React.useState({
        latitude: 59.3322,
        longitude: 18.0642,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [errorMsg, setErrorMsg] = React.useState(null);


    //initial request for location tracking. Only happens once.
    React.useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        })();
    }, []);

    //continuously checks the location of user and updates location state to new value
    React.useEffect(() => {
        Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Highest,
                distanceInterval: 5,
                timeInterval: 10000,
            },
            (pos) => {
                pos.coords.latitudeDelta = 0.01;
                pos.coords.longitudeDelta = 0.01;
                setLocation(pos.coords);
                if (!disablePathFetching)
                    addPathNode(pos.coords);
                console.log("Continuous location: " + JSON.stringify(pos.coords))
            }
        )
            .then(() => {
            })
            .catch((err) => {
                console.log("position error: ", err.message);
                setErrorMsg(err.message);
            });
    }, []);

    return (
        markers.status !== "success" ? <LoadingSpinner/> :
            <SafeAreaView style={{alignItems: 'center'}}>

                <MaskedView maskElement={
                    <View
                        style={{
                            // Transparent background because mask is based off alpha channel.
                            backgroundColor: 'transparent',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        { /*here is the place to put the clipping object for mask*/}
                        <View style={mapStyles.circle}/>
                    </View>
                }
                >
                    {/* Shows behind the mask, you can put anything here, such as an image */}
                    <MapView region={location} showsUserLocation={true}
                             provider={PROVIDER_GOOGLE} style={mapStyles.map}
                             customMapStyle={theme.dark ? theme.darkMap : theme.lightMap}
                             scrollEnabled={false}
                             zoomEnabled={false} rotateEnabled={false} pitchEnabled={false}>

                        {markers.list.map(marker => {
                            return (
                                <Marker key={marker.lat}
                                        coordinate={{
                                            latitude: parseFloat(marker.lat),
                                            longitude: parseFloat(marker.lon)
                                        }}
                                        onPress={() => {
                                            if (getDistance(marker, location) > 15) {
                                                console.log("Marker is too far away")
                                            } else {
                                                //dispatch(handleRemoveItem({name: marker.name}))
                                                console.log("Marker near you clicked")
                                            }

                                            navigation.navigate("Take Picture", {
                                                title: marker.name,
                                                lat: marker.lat,
                                                lon: marker.lon,
                                                styles: styles,
                                                user: user,
                                                addPost: addPost,
                                            });
                                        }
                                        }><Ionicons name="trophy" size={40} color={'green'}/>
                                </Marker>)
                        })}
                    < /MapView>
                </MaskedView>
            </SafeAreaView>
    );
}

const mapStyles = StyleSheet.create({
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
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    circle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        borderRadius: Dimensions.get('window').width / 2,
        backgroundColor: 'red',
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 50,
        shadowOpacity: 1.0
    }
});

export default MapPresenterFile;
