import * as React from 'react';
import MapView, {AnimatedRegion, Circle, Heatmap, Marker, Overlay, PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet, Text, View, SafeAreaView, Dimensions, Animated} from 'react-native';
import * as Location from 'expo-location';
import MaskedView from "@react-native-masked-view/masked-view";
import {getDistance} from "geolib";
import {getMarkers} from "../Redux/redusers/markers";
import {useDispatch, useSelector} from "react-redux";
import {handleRemoveItem} from "../Redux/redusers/markers";
import Ionicons from 'react-native-vector-icons/Ionicons';

function MapPresenterFile() {
    const [location, setLocation] = React.useState({
        latitude: 59.33100,
        longitude: 18.0002,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [errorMsg, setErrorMsg] = React.useState(null);
    const markers = useSelector((state) => state.markers);

    const [heatpoints, setHeatpoints] = React.useState([
        {
            latitude: location.latitude,
            longitude: location.longitude,
            weight: 1,
        },
        {
            latitude: location.latitude - 0.004,
            longitude: location.longitude,
            weight: 1,
        },
        {
            latitude: location.latitude - 0.008,
            longitude: location.longitude,
            weight: 1,
        },
        {
            latitude: location.latitude,
            longitude: location.longitude,
            weight: 1,
        },
        {
            latitude: location.latitude - 0.004,
            longitude: location.longitude + 0.004,
            weight: 1,
        },
        {
            latitude: location.latitude - 0.008,
            longitude: location.longitude + 0.004,
            weight: 1,
        },
        {
            latitude: location.latitude,
            longitude: location.longitude,
            weight: 1,
        },
        {
            latitude: location.latitude - 0.004,
            longitude: location.longitude + 0.008,
            weight: 1,
        },
        {
            latitude: location.latitude - 0.008,
            longitude: location.longitude + 0.008,
            weight: 1,
        },
    ]);
    React.useEffect(() => {

    }, [location]);

    React.useEffect(() => {
        dispatch(getMarkers())
    }, []);
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.value.theme);

    React.useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        })();
    }, []);

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
        markers.status !== "success" ? <Text>Loading {JSON.stringify(markers)}</Text> :
            <SafeAreaView style={styles.container}>
                <MapView region={location} showsUserLocation={true}
                         provider={PROVIDER_GOOGLE} style={styles.map}
                         customMapStyle={theme.dark ? theme.darkMap : theme.lightMap}
                         scrollEnabled={false}
                         zoomEnabled={false} rotateEnabled={false} pitchEnabled={false}>
                    <Heatmap points={heatpoints}
                             opacity={1}
                             radius={50}
                             maxIntensity={100}
                             gradientSmoothing={1}
                             heatmapMode={"POINTS_WEIGHT"}
                             gradient={{
                                 colors: ["#8d8d8d", "#8d8d8d", "#8d8d8d", "#8d8d8d", "rgba(0,0,0,0.37)", "rgba(0,0,0,0)"],
                                 startPoints: [0, 0.000001, 0.000002, 0.000003, 0.5, 1],
                             }}

                        {markers.list.map(marker => {
                            return (<Marker key={marker.lat} coordinate={{
                                latitude: parseFloat(marker.lat),
                                longitude: parseFloat(marker.lon)
                            }} onPress={() => {
                                if (getDistance(marker, location) > 15) {
                                    console.log("Marker is too far away")
                                } else {
                                    dispatch(handleRemoveItem({name: marker.name}))
                                    console.log("Marker near you clicked")
                                }
                            }
                            }><Ionicons name="trophy" size={40} color={'green'}/></Marker>)
                        })}
                < /MapView>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
