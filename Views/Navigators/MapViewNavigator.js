import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapPresenter from "../../Presenters/MapPresenter";
import AddPost from "../AddPost";
import Camera from "../Components/camera";

const Stack = createStackNavigator();

const MapViewNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Map" component={MapPresenter}/>
            <Stack.Screen name="Take Picture" component={Camera}/>
            <Stack.Screen name="Claim Landmark" component={AddPost}/>
        </Stack.Navigator>
    );
}
export default MapViewNavigator;
