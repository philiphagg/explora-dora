import {createStackNavigator} from '@react-navigation/stack';
import MapPresenterFile from "./MapPresenterFile";
import AddPost from "./AddPost";
import Camera from "./Components/camera";
import * as React from 'react';
import {KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';


const Stack = createStackNavigator();

const MapViewComp = (props) => {
    const [claim, setClaim] = React.useState({status: null, title: null, lat: null, lon: null });

    return (
            claim.status != 'claiming' ?
            <MapPresenterFile
                markers={props.markers}
                theme={props.theme}
                collection={props.collection}

                getMarkers={props.getMarkers}
                getPaths={props.getPaths}
                getCollection={props.getCollection}
                addPathNode={props.addPathNode}
                setClaim={setClaim}
            />
            :
            <Camera
                title={claim.title}
                lat={claim.lat}
                lon={claim.lon}
                markers={props.markers}
                styles={props.styles}
                theme={props.theme}
                collection={props.collection}

                getMarkers={props.getMarkers}
                getPaths={props.getPaths}
                getCollection={props.getCollection}
                addPathNode={props.addPathNode}
                addPost={props.addPost}
                setClaim={props.setClaim}
            />
    );
}
export default MapViewComp;

/*<MapPresenterFile
markers = {props.markers}
theme = {props.theme}
collection = {props.collection}

getMarkers = {props.getMarkers}
getPaths = {props.getPaths}
getCollection = {props.getCollection}
addPathNode = {props.addPathNode}
/>
/*
//<MapPresenterFile props />

<Stack.Navigator screenOptions={{headerShown: false}}>
<Stack.Screen name="Map" component={MapPresenterFile} />
<Stack.Screen name="Claim Landmark" component={AddPost} />
<Stack.Screen name="Take Picture" component={Camera} />
</Stack.Navigator>
*/
