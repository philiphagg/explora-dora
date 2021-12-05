import {createStackNavigator} from '@react-navigation/stack';
import MapPresenterFile from "../MapPresenterFile";
import AddPost from "../AddPost";
import Camera from "../Components/camera";
import * as React from 'react';
import {KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import MapPresenter from "../../Presenters/MapPresenter";


const Stack = createStackNavigator();

const MapViewNavigator = () => {
    //const [claim, setClaim] = React.useState({status: null, title: null, lat: null, lon: null});
    //console.log("1. Props MapViewNavigator ----------------------------------", props)

    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Map" component={MapPresenter}/>
            <Stack.Screen name="Take Picture" component={Camera}/>
            <Stack.Screen name="Claim Landmark" component={AddPost}/>
        </Stack.Navigator>
    );
}
export default MapViewNavigator;

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
