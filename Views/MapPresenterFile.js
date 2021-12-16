import * as React from 'react';
import MapView, {Marker, Heatmap, PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet, Text, SafeAreaView, Dimensions, Alert} from 'react-native';
import * as Location from 'expo-location';
import {getDistance} from "geolib";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingSpinner from "./Components/LoadingAnimation";

const disablePathFetching = true; /* Disables the uploading of coordinates to firebase while developing */

function MapPresenterFile(
    {
        navigation,
        route,
        markers,
        theme,
        getMarkers,
        addPathNode,
        styles,
        user,
        getUser,
        addPost,
        getPaths,
        paths,
        collection,
        getCollection,
        resetCollection
    }) {

    const length = 0.0008;
    React.useEffect(() => {
        if (markers.status !== 'success')
            getMarkers()
        if (paths.status !== 'success')
            getPaths()
        if (collection.status !== 'success')
            getCollection()
        if (getUser.status !== 'success')
            getUser()
    }, []);

    const [location, setLocation] = React.useState({
        latitude: 59.33100,
        longitude: 18.0002,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [errorMsg, setErrorMsg] = React.useState(null);
    const [heatpoints, setHeatpoints] = React.useState(null)

    //creates a grid of points that follows user based on location state
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

    return (
        markers.status !== "success" && paths.status !== "success" ? <LoadingSpinner/> :
            <SafeAreaView style={mapStyles.container}>
                <MapView region={location}
                         moveOnMarkerPress={false}
                         toolbarEnabled={true}
                         showsUserLocation={true}
                         showsMyLocationButton={false}
                         loadingEnabled={false}
                         provider={PROVIDER_GOOGLE} style={mapStyles.map}
                         customMapStyle={theme.dark ? theme.darkMap : theme.lightMap} scrollEnabled={false}
                         zoomEnabled={false} rotateEnabled={false} pitchEnabled={false}>
                    <Heatmap points={
                        [
                            ...heatpoints,
                            ...paths.list.map(c => (
                                {latitude: c.latitude, longitude: c.longitude, weight: 100})),
                            ...paths.list.map(c => (
                                {latitude: c.latitude + length * 0.5, longitude: c.longitude - length, weight: 100})),
                            ...paths.list.map(c => (
                                {latitude: c.latitude + length * 0.5, longitude: c.longitude + length, weight: 100})),
                            ...paths.list.map(c => (
                                {latitude: c.latitude - length * 0.5, longitude: c.longitude + length, weight: 100})),
                            ...paths.list.map(c => (
                                {latitude: c.latitude - length * 0.5, longitude: c.longitude - length, weight: 100})),
                            {
                                latitude: location.latitude + length * 0.5 * 1.1,
                                longitude: location.longitude,
                                weight: 100
                            },
                            {
                                latitude: location.latitude - length * 0.5 * 1.1,
                                longitude: location.longitude,
                                weight: 100
                            },
                            {latitude: location.latitude, longitude: location.longitude + length * 1.1, weight: 100},
                            {latitude: location.latitude, longitude: location.longitude - length * 1.1, weight: 100},
                        ]
                    }
                             opacity={0.9}
                             radius={50}
                             maxIntensity={50}
                             gradientSmoothing={1}
                             heatmapMode={"POINTS_WEIGHT"}
                             gradient={{
                                 colors: theme.dark ? theme.colors.mapOverlayDark : theme.colors.mapOverlayLight,
                                 startPoints: [0, 0.3, 1],
                                 colorMapSize: 15,
                             }}
                    />
                    {markers.list.filter(({lat: id1}) => !collection.list.some(({lat: id2}) => id2 === id1)).map(marker => {
                        return (<Marker key={marker.lat} coordinate={{
                            latitude: parseFloat(marker.lat),
                            longitude: parseFloat(marker.lon)
                        }} onPress={() => {
                            if (getDistance(marker, location) > 15) {
                                Alert.alert("Marker is too far away!", "go closer to be able to claim it!")
                                console.log("Marker is too far away")
                            } else {
                                Alert.alert(
                                    "Do you want to claim this landmark?",
                                    "Take a picture of it to claim!",
                                    [
                                        {
                                            text: "Claim Landmark!",
                                            onPress: () => navigation.navigate("Take Picture", {
                                                title: marker.name,
                                                lat: marker.lat,
                                                lon: marker.lon,
                                                styles: styles,
                                                user: user,
                                                addPost: addPost,
                                                resetCollection: resetCollection,
                                            })
                                        },
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                    ]
                                )
                                console.log("Marker near you clicked")
                            }
                        }
                        }><Ionicons name="trophy" size={40} color={'green'}/></Marker>)
                    })}
                    {collection.list.map(marker => {
                        return (<Marker key={marker.id} coordinate={{
                            latitude: parseFloat(marker.lat),
                            longitude: parseFloat(marker.lon)
                        }} onPress={() => {
                            Alert.alert("You've already claimed this landmark!", "Go find another one!")
                            console.log("This is a claimed landmark!")
                        }
                        }><Ionicons name="star" size={40} color={'orange'}/></Marker>)
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
