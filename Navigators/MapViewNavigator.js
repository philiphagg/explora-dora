import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapPresenter from "../Presenters/MapPresenter";
import AddPost from "../Views/AddPost";
import Camera from "../Views/CameraView";

const Stack = createStackNavigator();

const MapViewNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Start exploring" component={MapPresenter}/>
            <Stack.Screen name="Take Picture" component={Camera}/>
            <Stack.Screen name="Claim Landmark" component={AddPost}/>
        </Stack.Navigator>
    );
}
export default MapViewNavigator;
