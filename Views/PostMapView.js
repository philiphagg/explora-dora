import React, {useEffect} from "react";
import {SafeAreaView, StyleSheet, Dimensions, } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";

function PostMapView({route}) {
    const {theme, post} = route.params;

    return (
        <SafeAreaView style={mapStyles.container}>
            <MapView followsUserLocation={false} showsMyLocationButton={true} showsUserLocation={true}
                     region ={{
                         latitude: parseFloat(post.lat),
                         longitude: parseFloat(post.lon),
                         latitudeDelta: 0.01,
                         longitudeDelta: 0.01,
                     }}
                     provider={PROVIDER_GOOGLE} style={mapStyles.map}
                     customMapStyle={theme.dark ? theme.darkMap : theme.lightMap}
            >
                <Marker
                    key={post.id}
                    coordinate={{
                        latitude: parseFloat(post.lat),
                        longitude: parseFloat(post.lon),
                    }}
                    description={post.title}
                >
                </Marker>
            </MapView>
        </SafeAreaView>
    );

}

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

export default PostMapView;
