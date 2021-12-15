import * as React from 'react';
import {useEffect} from "react";
import MapView, {AnimatedRegion, Circle, Marker, Heatmap,Overlay, PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet, Text, View, SafeAreaView, Dimensions, Animated, Button} from 'react-native';
import * as Location from 'expo-location';
import {getDistance} from "geolib";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingSpinner from "./Components/LoadingAnimation";

const disablePathFetching = true; /* Disables the uploading of coordinates to firebase while developing */

function MapPresenterFile({navigation, route, markers, theme, getMarkers, addPathNode, styles, user, addPost,getPaths,paths, collection, getCollection}) {

    // console.log("1. Props MapPresenterFile ----------------------------------", styles)

    useEffect(() => {
        if (markers.status !== 'success')
            getMarkers()
        if (paths.status !== 'success')
          getPaths()
    }, []);

    const [location, setLocation] = React.useState({
        latitude: 59.33100,
        longitude: 18.0002,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [errorMsg, setErrorMsg] = React.useState(null);
    const [heatpoints, setHeatpoints] = React.useState(null)

    React.useEffect(() => {
        let lat = location.latitude;
        let lon = location.longitude;
        let pointArray = [];
        var x, y;
        for (x = 1; x <= 35; x += 1) {
            for (y = 1; y <= 35; y += 1) {
                pointArray.push({latitude: lat + (x / 3000) - 0.006, longitude: lon + (y / 3000) - 0.006, weight: 1});
            }
        }
        setHeatpoints(pointArray)
    }, [location])

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
                distanceInterval: 20,
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
///,...paths.list.map(c => ({latitude: c.latitude, longitude: c.longitude, weight: 100}))]
    return (
        markers.status !== "success" && paths.status !== "success" ? <LoadingSpinner/> :
            <SafeAreaView style={mapStyles.container}>
                <MapView region={location} showsUserLocation={true}
                         provider={PROVIDER_GOOGLE} style={mapStyles.map}
                         customMapStyle={theme.dark ? theme.darkMap : theme.lightMap} scrollEnabled={true}
                         zoomEnabled={true} rotateEnabled={true} pitchEnabled={true}>
                    <Heatmap points={[...heatpoints, ...paths.list.map(c => ({
                        latitude: c.latitude,
                        longitude: c.longitude,
                        weight: 100
                    }))]}
                             opacity={1}
                             radius={50}
                             maxIntensity={50}
                             gradientSmoothing={1}
                             heatmapMode={"POINTS_WEIGHT"}
                             gradient={{
                                 //colors: theme.dark ? theme.colors.mapOverlayDark : theme.colors.mapOverlayLight, //Light Mode
                                 colors: ["rgb(255,255,255)", "rgba(164,164,164,0.37)", "rgba(255,255,255,0)"], //Light Mode
                                 //colors: ["rgb(25, 26, 25)", "rgba(204,204,204,0.45)", "rgba(255,255,255,0)"], //Dark Mode
                                 startPoints: [0, 0.5, 1],
                                 colorMapSize: 256,
                             }}
                    />


                    {markers.list.filter(({ lat: id1 }) => !collection.list.some(({ lat: id2 }) => id2 === id1)).map(marker => {
                        return (<Marker key={marker.lat} coordinate={{
                            latitude: parseFloat(marker.lat),
                            longitude: parseFloat(marker.lon)
                        }} onPress={() => {
                            if (getDistance(marker, location) > 15) {
                                console.log("Marker is too far away")
                            } else {
                                console.log("Marker near you clicked")
                                navigation.navigate("Take Picture", {
                                    title: marker.name,
                                    lat: marker.lat,
                                    lon: marker.lon,
                                    styles: styles,
                                    user: user,
                                    addPost: addPost,
                                });
                            }
                        }
                        }><Ionicons name="trophy" size={40} color={'green'}/></Marker>)
                    })}
                < /MapView>
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
});

export default MapPresenterFile;
