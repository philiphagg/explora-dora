import * as React from 'react';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import * as Location from 'expo-location';

function Progress() {
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    let points = [
        {latitude: 6.83646681, longitude: 79.77121907, weight: 10},
        {latitude: 6.82776681, longitude: 79.871319, weight: 10},
        {latitude: 6.82176681, longitude: 79.871319, weight: 10},
        {latitude: 6.83776681, longitude: 79.871319, weight: 10},
        {latitude: 6.83176681, longitude: 79.871319, weight: 10},
        {latitude: 6.83976681, longitude: 79.861319, weight: 10},
        {latitude: 6.83076681, longitude: 79.861319, weight: 10},
        {latitude: 6.82776681, longitude: 79.861319, weight: 10},
        {latitude: 6.82076681, longitude: 79.871319, weight: 10},
        {latitude: 6.82076681, longitude: 79.861319, weight: 10},
        {latitude: 6.81076681, longitude: 79.861319, weight: 10},
        {latitude: 6.83776681, longitude: 79.869319, weight: 10},
        {latitude: 6.83276681, longitude: 79.869319, weight: 10},
        {latitude: 6.81976681, longitude: 79.869319, weight: 10},
        {latitude: 6.83776681, longitude: 79.867319, weight: 10},
        {latitude: 6.83776681, longitude: 79.865319, weight: 10},
        {latitude: 6.83646681, longitude: 79.77121907, weight: 10},
        {latitude: 6.82776681, longitude: 79.871319, weight: 10},
        {latitude: 6.82176681, longitude: 79.871319, weight: 10},
        {latitude: 6.83776681, longitude: 79.871319, weight: 10},
        {latitude: 6.83176681, longitude: 79.871319, weight: 10},
        {latitude: 6.83976681, longitude: 79.861319, weight: 10},
        {latitude: 6.83076681, longitude: 79.861319, weight: 10},
        {latitude: 6.82776681, longitude: 79.861319, weight: 10},
        {latitude: 6.82076681, longitude: 79.871319, weight: 10},
        {latitude: 6.82076681, longitude: 79.861319, weight: 10},
        {latitude: 6.81076681, longitude: 79.861319, weight: 10},
        {latitude: 6.83776681, longitude: 79.869319, weight: 10},
        {latitude: 6.83276681, longitude: 79.869319, weight: 10},
        {latitude: 6.81976681, longitude: 79.869319, weight: 10},
        {latitude: 6.83776681, longitude: 79.867319, weight: 10},
        {latitude: 6.83776681, longitude: 79.865319, weight: 10},
        {latitude: 6.84076681, longitude: 79.871319, weight: 10},
        {latitude: 6.83646681, longitude: 79.77121907, weight: 10},
        {latitude: 6.82776681, longitude: 79.871319, weight: 10},
        {latitude: 6.82176681, longitude: 79.871319, weight: 10},
        {latitude: 6.83776681, longitude: 79.871319, weight: 10},
        {latitude: 6.83176681, longitude: 79.871319, weight: 10},
        {latitude: 6.83976681, longitude: 79.861319, weight: 10},
        {latitude: 6.83076681, longitude: 79.861319, weight: 10},
        {latitude: 6.82776681, longitude: 79.861319, weight: 10},
        {latitude: 6.82076681, longitude: 79.871319, weight: 10},
        {latitude: 6.82076681, longitude: 79.861319, weight: 10},
        {latitude: 6.81076681, longitude: 79.861319, weight: 10},
        {latitude: 6.83776681, longitude: 79.869319, weight: 10},
        {latitude: 6.83276681, longitude: 79.869319, weight: 10},
        {latitude: 6.81976681, longitude: 79.869319, weight: 10},
        {latitude: 6.83776681, longitude: 79.867319, weight: 10},
        {latitude: 6.83776681, longitude: 79.865319, weight: 10},
        {latitude: 6.84076681, longitude: 79.871319, weight: 10},
        {latitude: 6.841776681, longitude: 79.869319, weight: 10},
        {latitude: 6.83646681, longitude: 79.77121907, weight: 10},
        {latitude: 6.82776681, longitude: 79.871319, weight: 10},
        {latitude: 6.82176681, longitude: 79.871319, weight: 10},
        {latitude: 6.83776681, longitude: 79.871319, weight: 10},
        {latitude: 6.83176681, longitude: 79.871319, weight: 10},
        {latitude: 6.83976681, longitude: 79.861319, weight: 10},
        {latitude: 6.83076681, longitude: 79.861319, weight: 10},
        {latitude: 6.82776681, longitude: 79.861319, weight: 10},
        {latitude: 6.82076681, longitude: 79.871319, weight: 10},
        {latitude: 6.82076681, longitude: 79.861319, weight: 10},
        {latitude: 6.81076681, longitude: 79.861319, weight: 10},
        {latitude: 6.83776681, longitude: 79.869319, weight: 10},
        {latitude: 6.83276681, longitude: 79.869319, weight: 10},
        {latitude: 6.81976681, longitude: 79.869319, weight: 10},
        {latitude: 6.83776681, longitude: 79.867319, weight: 10},
        {latitude: 6.83776681, longitude: 79.865319, weight: 10},
        {latitude: 6.84076681, longitude: 79.871319, weight: 10},
        {latitude: 6.841776681, longitude: 79.869319, weight: 10},
        {latitude: 6.84076681, longitude: 79.871319, weight: 10},


    ];

        React.useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log(location);
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <MapView followsUserLocation={true} showsMyLocationButton={true} showsUserLocation={true}
                     provider={PROVIDER_GOOGLE} style={styles.map} customMapStyle={customMap}>
                <MapView.Heatmap points={points}
                                 opacity={1}
                                 radius={100}
                                 maxIntensity={100}
                                 gradientSmoothing={10}
                                 heatmapMode={"POINTS_DENSITY"}/>

            </MapView>
        </SafeAreaView>
    );
}
const customMap = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#191919"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#393939"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#989898"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#989898"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
]
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
});



export default Progress;
