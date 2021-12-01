import * as React from 'react';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import * as Location from 'expo-location';
import {useSelector} from "react-redux";

function Progress() {
    const [errorMsg, setErrorMsg] = React.useState(null);
    const theme = useSelector((state) => state.theme.value.theme);

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
                         customMapStyle={theme.dark ? theme.darkMap : theme.lightMap}/>
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
});

export default Progress;
